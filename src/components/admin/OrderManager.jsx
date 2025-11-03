import { useState, useEffect, useRef, useMemo } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formScrollRef = useRef(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasingOrder, setPurchasingOrder] = useState(null);
  const [purchaseFormData, setPurchaseFormData] = useState({
    expectedDeliveryDate: '',
    deliveryNotes: '',
    purchaseOrderNumber: '',
    trackingNumber: ''
  });
  const [orderFormData, setOrderFormData] = useState({
    submissionDetails: {
      subteam: '',
      submitterName: '',
      submitterEmail: ''
    },
    materialDetails: {
      materialName: '',
      specifications: '',
      materialLink: '',
      supplier: '',
      supplierContact: ''
    },
    costBreakdown: {
      unitPrice: '',
      quantity: '',
      shippingCost: '',
      totalCost: ''
    },
    projectDetails: {
      purpose: '',
      urgency: 'flexible',
      neededByDate: ''
    },
    sponsorshipInfo: {
      canBeSponsored: false,
      sponsorContactName: '',
      sponsorContactEmail: '',
      sponsorCompany: ''
    }
  });

  // Custom alert hook from context
  const { showError, showConfirm, showSuccess } = useAlert();

  // Real-time sync status - increase interval when form is open to prevent scroll jumping
  const { status, lastSync, startSaving, finishSaving, acknowledgeNewData, setDisplayedData } = useSupabaseSyncStatus(
    () => supabaseService.getOrders(),
    showOrderForm ? 10000 : 2000 // 10 seconds when form is open, 2 seconds otherwise
  );

  useEffect(() => {
    loadOrders();
  }, []);

  // Preserve scroll position in form when component re-renders
  const scrollPositionRef = useRef(0);
  
  useEffect(() => {
    const modalBody = formScrollRef.current;
    if (!modalBody || !showOrderForm) return;

    // Save scroll position before any update
    const handleScroll = () => {
      scrollPositionRef.current = modalBody.scrollTop;
    };

    modalBody.addEventListener('scroll', handleScroll);

    // Restore scroll position after render
    if (scrollPositionRef.current > 0) {
      modalBody.scrollTop = scrollPositionRef.current;
    }

    return () => {
      modalBody.removeEventListener('scroll', handleScroll);
    };
  }, [showOrderForm, status]); // Re-run when status changes (sync updates)

  // Migrate old order structure to new single-director-approval structure
  const migrateOrderStructure = (order) => {
    // Check if order needs migration (has old structure)
    if (!order.approvalWorkflow.directorApproval && 
        (order.approvalWorkflow.technicalDirectorApproval || order.approvalWorkflow.projectDirectorPurchaseApproval)) {
      
      const techApproval = order.approvalWorkflow.technicalDirectorApproval;
      const projApproval = order.approvalWorkflow.projectDirectorPurchaseApproval;
      
      // Migrate to new structure - use the more recent approval if both exist
      let directorApproval = {
        status: 'pending',
        approvedBy: null,
        approvalDate: null,
        comments: '',
        denialReason: ''
      };

      // If either approval is approved, use that one
      if (projApproval?.status === 'approved' || projApproval?.status === 'denied') {
        directorApproval = {
          status: projApproval.status,
          approvedBy: projApproval.approvedBy,
          approvalDate: projApproval.approvalDate,
          comments: projApproval.comments,
          denialReason: projApproval.denialReason
        };
      } else if (techApproval?.status === 'approved' || techApproval?.status === 'denied') {
        directorApproval = {
          status: techApproval.status,
          approvedBy: techApproval.approvedBy,
          approvalDate: techApproval.approvalDate,
          comments: techApproval.comments,
          denialReason: techApproval.denialReason
        };
      }

      // Migrate status as well
      let migratedStatus = order.status;
      if (order.status === 'pending_technical_approval' || order.status === 'pending_project_approval') {
        migratedStatus = 'pending_approval';
      }

      return {
        ...order,
        status: migratedStatus,
        approvalWorkflow: {
          directorApproval
        }
      };
    }

    // Ensure directorApproval exists even if order is already in new format
    if (!order.approvalWorkflow.directorApproval) {
      return {
        ...order,
        approvalWorkflow: {
          ...order.approvalWorkflow,
          directorApproval: {
            status: 'pending',
            approvedBy: null,
            approvalDate: null,
            comments: '',
            denialReason: ''
          }
        }
      };
    }

    return order;
  };

  const loadOrders = async () => {
    console.log('Loading orders from Supabase...');
    setIsLoading(true);
    try {
      const data = await supabaseService.getOrders();
      console.log('Loaded orders:', data);
      
      if (!data || !data.orders) {
        console.error('Invalid data structure received:', data);
        throw new Error('Invalid orders data structure');
      }
      
      // Migrate old order structures to new format
      const migratedOrders = data.orders.map(migrateOrderStructure);
      
      console.log(`✓ Successfully loaded ${migratedOrders.length} orders from Supabase`);
      setOrders(migratedOrders);
      // Tell the sync hook what data we're displaying
      setDisplayedData({ ...data, orders: migratedOrders });
      // Acknowledge that we've loaded fresh data to prevent false "new-data" status
      acknowledgeNewData();
    } catch (error) {
      console.error('Error loading orders:', error);
      await showError(`Failed to load orders: ${error.message}`, 'Load Error');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle refresh when new data is detected
  const handleRefreshData = async () => {
    await loadOrders();
    acknowledgeNewData(); // Reset status to 'synced'
  };

  const updateOrderStatus = async (orderId, statusUpdate) => {
    startSaving();
    
    try {
      // Find the order to update
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      const now = new Date().toISOString();
      let updatedOrder = { ...order, lastUpdated: now };

      // Migrate old order structure to new structure if needed
      if (!updatedOrder.approvalWorkflow.directorApproval) {
        updatedOrder.approvalWorkflow.directorApproval = {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        };
      }

      // Handle different types of status updates
      // New workflow: Single director approval
      // Status flow: pending_approval -> approved_for_purchase -> purchased -> delivered
      if (statusUpdate.type === 'director_approval') {
        updatedOrder.approvalWorkflow.directorApproval = {
          ...updatedOrder.approvalWorkflow.directorApproval,
          status: statusUpdate.approved ? 'approved' : 'denied',
          approvedBy: statusUpdate.approvedBy,
          approvalDate: now,
          comments: statusUpdate.comments || '',
          denialReason: statusUpdate.denialReason || ''
        };
        updatedOrder.status = statusUpdate.approved ? 'approved_for_purchase' : 'denied';
      } else if (statusUpdate.type === 'purchase') {
        updatedOrder.purchaseStatus = {
          ...updatedOrder.purchaseStatus,
          purchased: true,
          purchaseDate: now,
          purchaseOrderNumber: statusUpdate.purchaseOrderNumber || '',
          actualCost: statusUpdate.actualCost || updatedOrder.costBreakdown.totalCost,
          purchasedBy: statusUpdate.purchasedBy || ''
        };
        // Set delivery information from the purchase form
        if (statusUpdate.expectedDeliveryDate) {
          updatedOrder.deliveryInfo.expectedArrivalDate = new Date(statusUpdate.expectedDeliveryDate).toISOString();
        }
        if (statusUpdate.deliveryNotes) {
          updatedOrder.deliveryInfo.deliveryNotes = statusUpdate.deliveryNotes;
        }
        if (statusUpdate.trackingNumber) {
          updatedOrder.deliveryInfo.trackingNumber = statusUpdate.trackingNumber;
        }
        updatedOrder.status = 'purchased';
      } else if (statusUpdate.type === 'delivery') {
        updatedOrder.deliveryInfo = {
          ...updatedOrder.deliveryInfo,
          actualArrivalDate: now,
          deliveredToSubteam: true,
          deliveryConfirmedBy: statusUpdate.confirmedBy || '',
          deliveryNotes: statusUpdate.notes || '',
          trackingNumber: statusUpdate.trackingNumber || ''
        };
        updatedOrder.status = 'delivered';
      } else if (statusUpdate.type === 'sponsorship_response') {
        updatedOrder.sponsorshipInfo = {
          ...updatedOrder.sponsorshipInfo,
          sponsorshipSuccessful: statusUpdate.successful,
          sponsorshipResponse: statusUpdate.response || '',
          sponsorshipResponseDate: now
        };
      }

      // Save to Supabase
      await supabaseService.updateOrder(orderId, updatedOrder);
      
      // Update local state
      const updatedOrders = orders.map(o => o.id === orderId ? updatedOrder : o);
      setOrders(updatedOrders);
      
      // Update the displayed data hash to match the new state
      setDisplayedData({ orders: updatedOrders });
      
      finishSaving();
      await showSuccess('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      finishSaving();
      await showError(`Failed to update order: ${error.message}`, 'Update Error');
    }
  };

  const submitNewOrder = async () => {
    const now = new Date().toISOString();
    const newOrder = {
      submissionTimestamp: now,
      submissionDetails: orderFormData.submissionDetails,
      materialDetails: orderFormData.materialDetails,
      costBreakdown: {
        unitPrice: parseFloat(orderFormData.costBreakdown.unitPrice),
        quantity: parseInt(orderFormData.costBreakdown.quantity),
        shippingCost: parseFloat(orderFormData.costBreakdown.shippingCost),
        subtotal: parseFloat(orderFormData.costBreakdown.unitPrice) * parseInt(orderFormData.costBreakdown.quantity),
        totalCost: parseFloat(orderFormData.costBreakdown.totalCost),
        taxes: 0,
        fees: 0
      },
      projectDetails: {
        ...orderFormData.projectDetails,
        neededByDate: new Date(orderFormData.projectDetails.neededByDate).toISOString()
      },
      approvalWorkflow: {
        directorApproval: {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        }
      },
      sponsorshipInfo: {
        ...orderFormData.sponsorshipInfo,
        sponsorshipRequested: orderFormData.sponsorshipInfo.canBeSponsored && 
                             orderFormData.sponsorshipInfo.sponsorContactName,
        sponsorshipRequestDate: orderFormData.sponsorshipInfo.canBeSponsored ? now : null,
        sponsorshipSuccessful: false,
        sponsorshipResponse: '',
        sponsorshipResponseDate: null
      },
      purchaseStatus: {
        purchased: false,
        purchaseDate: null,
        purchaseOrderNumber: '',
        actualCost: null,
        purchasedBy: ''
      },
      deliveryInfo: {
        expectedArrivalDate: null,
        actualArrivalDate: null,
        deliveredToSubteam: false,
        deliveryConfirmedBy: '',
        deliveryNotes: '',
        trackingNumber: ''
      },
      documentation: {
        receiptInvoice: {
          uploaded: false,
          fileName: '',
          uploadDate: null,
          uploadedBy: ''
        },
        additionalDocuments: []
      },
      returnInfo: {
        returned: false,
        returnDate: null,
        returnReason: '',
        returnAuthorizedBy: '',
        refundAmount: null,
        refundProcessed: false
      },
      status: 'pending_approval',
      lastUpdated: now,
      createdBy: orderFormData.submissionDetails.submitterEmail
    };

    startSaving();
    
    try {
      const savedOrder = await supabaseService.createOrder(newOrder);
      const updatedOrders = [savedOrder, ...orders];
      setOrders(updatedOrders);
      setShowOrderForm(false);
      resetOrderForm();
      
      // Update the displayed data hash to match the new state
      setDisplayedData({ orders: updatedOrders });
      
      finishSaving();
      await showSuccess('Order submitted successfully');
    } catch (error) {
      console.error('Error creating order:', error);
      finishSaving();
      await showError(`Failed to submit order: ${error.message}`, 'Submit Error');
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmed = await showConfirm(
      'Are you sure you want to delete this order? This action cannot be undone.',
      'Delete Order'
    );
    
    if (!confirmed) return;

    startSaving();
    
    try {
      await supabaseService.deleteOrder(orderId);
      const updatedOrders = orders.filter(o => o.id !== orderId);
      setOrders(updatedOrders);
      
      // Update the displayed data hash to match the new state
      setDisplayedData({ orders: updatedOrders });
      
      finishSaving();
      await showSuccess('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      finishSaving();
      await showError(`Failed to delete order: ${error.message}`, 'Delete Error');
    }
  };

  const resetOrderForm = () => {
    setOrderFormData({
      submissionDetails: {
        subteam: '',
        submitterName: '',
        submitterEmail: ''
      },
      materialDetails: {
        materialName: '',
        specifications: '',
        materialLink: '',
        supplier: '',
        supplierContact: ''
      },
      costBreakdown: {
        unitPrice: '',
        quantity: '',
        shippingCost: '',
        totalCost: ''
      },
      projectDetails: {
        purpose: '',
        urgency: 'flexible',
        neededByDate: ''
      },
      sponsorshipInfo: {
        canBeSponsored: false,
        sponsorContactName: '',
        sponsorContactEmail: '',
        sponsorCompany: ''
      }
    });
  };

  const handlePurchaseSubmit = async () => {
    if (!purchaseFormData.expectedDeliveryDate) {
      await showError('Please enter an expected delivery date', 'Required Field');
      return;
    }

    await updateOrderStatus(purchasingOrder.id, {
      type: 'purchase',
      purchaseOrderNumber: purchaseFormData.purchaseOrderNumber || `PO-${Date.now()}`,
      actualCost: purchasingOrder.costBreakdown.totalCost,
      purchasedBy: authService.currentUser?.level || 'director',
      expectedDeliveryDate: purchaseFormData.expectedDeliveryDate,
      deliveryNotes: purchaseFormData.deliveryNotes,
      trackingNumber: purchaseFormData.trackingNumber
    });

    // Reset and close modal
    setShowPurchaseModal(false);
    setPurchasingOrder(null);
    setPurchaseFormData({
      expectedDeliveryDate: '',
      deliveryNotes: '',
      purchaseOrderNumber: '',
      trackingNumber: ''
    });
  };

  const canApprove = authService.hasPermission('approve_orders');
  const canView = authService.hasPermission('view_orders');
  const canSubmit = authService.hasPermission('submit_orders');
  const isDirector = authService.hasPermission('approve_orders');
  const isMember = authService.getLevel() === 'member';
  const isLead = authService.getLevel() === 'leader';

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (filterTeam !== 'all' && order.submissionDetails.subteam !== filterTeam) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_approval': return '#fd7e14';
      case 'approved_for_purchase': return '#007bff';
      case 'purchased': return '#6f42c1';
      case 'delivered': return '#28a745';
      case 'denied': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_approval': return 'Pending Director Approval';
      case 'approved_for_purchase': return 'Approved - Ready to Purchase';
      case 'purchased': return 'Purchased - In Transit';
      case 'delivered': return 'Delivered';
      case 'denied': return 'Denied';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const teams = [...new Set(orders.map(order => order.submissionDetails?.subteam).filter(Boolean))];

  const OrderDetailModal = useMemo(() => {
    return ({ order, onClose }) => {
      if (!order) return null;

      return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{order.materialDetails.materialName}</h3>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-body">
            <div className="detail-section">
              <h4>Submission Details</h4>
              <div className="detail-grid">
                <div><strong>Subteam:</strong> {order.submissionDetails.subteam}</div>
                <div><strong>Submitted by:</strong> {order.submissionDetails.submitterName}</div>
                <div><strong>Email:</strong> {order.submissionDetails.submitterEmail}</div>
                <div><strong>Submitted:</strong> {new Date(order.submissionTimestamp).toLocaleString()}</div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Material Specifications</h4>
              <div className="detail-grid">
                <div><strong>Material:</strong> {order.materialDetails.materialName}</div>
                <div><strong>Supplier:</strong> {order.materialDetails.supplier}</div>
                <div><strong>Supplier Contact:</strong> {order.materialDetails.supplierContact}</div>
                {order.materialDetails.materialLink && (
                  <div><strong>Link: </strong> 
                    <a href={order.materialDetails.materialLink} target="_blank" rel="noopener noreferrer">
                      View Material
                    </a>
                  </div>
                )}
              </div>
              <div className="specifications">
                <strong>Specifications:</strong>
                <p>{order.materialDetails.specifications}</p>
              </div>
            </div>

            <div className="detail-section">
              <h4>Cost Breakdown</h4>
              <div className="cost-table">
                <div className="cost-row">
                  <span>Unit Price:</span>
                  <span>${order.costBreakdown.unitPrice.toFixed(2)}</span>
                </div>
                <div className="cost-row">
                  <span>Quantity:</span>
                  <span>{order.costBreakdown.quantity}</span>
                </div>
                <div className="cost-row">
                  <span>Subtotal:</span>
                  <span>${order.costBreakdown.subtotal.toFixed(2)}</span>
                </div>
                <div className="cost-row">
                  <span>Shipping:</span>
                  <span>${order.costBreakdown.shippingCost.toFixed(2)}</span>
                </div>
                <div className="cost-row">
                  <span>Taxes:</span>
                  <span>${order.costBreakdown.taxes.toFixed(2)}</span>
                </div>
                <div className="cost-row">
                  <span>Fees:</span>
                  <span>${order.costBreakdown.fees.toFixed(2)}</span>
                </div>
                <div className="cost-row total">
                  <span><strong>Total:</strong></span>
                  <span><strong>${order.costBreakdown.totalCost.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Project Details</h4>
              <div className="detail-grid">
                <div><strong>Urgency:</strong> {order.projectDetails.urgency}</div>
                <div><strong>Needed by:</strong> {new Date(order.projectDetails.neededByDate).toLocaleDateString()}</div>
              </div>
              <div className="purpose">
                <strong>Purpose:</strong>
                <p>{order.projectDetails.purpose}</p>
              </div>
            </div>

            {order.sponsorshipInfo.canBeSponsored && (
              <div className="detail-section">
                <h4>Sponsorship Information</h4>
                <div className="detail-grid">
                  <div><strong>Can be sponsored:</strong> Yes</div>
                  {order.sponsorshipInfo.sponsorContactName && (
                    <>
                      <div><strong>Sponsor Contact:</strong> {order.sponsorshipInfo.sponsorContactName}</div>
                      <div><strong>Company:</strong> {order.sponsorshipInfo.sponsorCompany}</div>
                      <div><strong>Email:</strong> {order.sponsorshipInfo.sponsorContactEmail}</div>
                      <div><strong>Requested:</strong> {order.sponsorshipInfo.sponsorshipRequested ? 'Yes' : 'No'}</div>
                      <div><strong>Successful:</strong> {order.sponsorshipInfo.sponsorshipSuccessful ? 'Yes' : 'No'}</div>
                    </>
                  )}
                </div>
                {order.sponsorshipInfo.sponsorshipResponse && (
                  <div className="response">
                    <strong>Sponsor Response:</strong>
                    <p>{order.sponsorshipInfo.sponsorshipResponse}</p>
                  </div>
                )}
              </div>
            )}

            <div className="detail-section">
              <h4>Approval Status</h4>
              <div className="approval-grid">
                <div className="approval-item">
                  <strong>Director Approval:</strong>
                  <span className={`approval-status ${order.approvalWorkflow?.directorApproval?.status || 'pending'}`}>
                    {order.approvalWorkflow?.directorApproval?.status || 'pending'}
                  </span>
                  {order.approvalWorkflow?.directorApproval?.approvedBy && (
                    <p className="approval-meta">By: {order.approvalWorkflow.directorApproval.approvedBy}</p>
                  )}
                  {order.approvalWorkflow?.directorApproval?.approvalDate && (
                    <p className="approval-meta">Date: {new Date(order.approvalWorkflow.directorApproval.approvalDate).toLocaleString()}</p>
                  )}
                  {order.approvalWorkflow?.directorApproval?.comments && (
                    <p className="approval-comment">{order.approvalWorkflow.directorApproval.comments}</p>
                  )}
                  {order.approvalWorkflow?.directorApproval?.denialReason && (
                    <p className="denial-reason">{order.approvalWorkflow.directorApproval.denialReason}</p>
                  )}
                </div>
              </div>
            </div>

            {order.purchaseStatus.purchased && (
              <div className="detail-section">
                <h4>Purchase Information</h4>
                <div className="detail-grid">
                  <div><strong>Purchase Date:</strong> {new Date(order.purchaseStatus.purchaseDate).toLocaleDateString()}</div>
                  <div><strong>PO Number:</strong> {order.purchaseStatus.purchaseOrderNumber}</div>
                  <div><strong>Actual Cost:</strong> ${order.purchaseStatus.actualCost?.toFixed(2)}</div>
                  <div><strong>Purchased by:</strong> {order.purchaseStatus.purchasedBy}</div>
                </div>
              </div>
            )}

            {order.deliveryInfo.deliveredToSubteam && (
              <div className="detail-section">
                <h4>Delivery Information</h4>
                <div className="detail-grid">
                  <div><strong>Delivered:</strong> {new Date(order.deliveryInfo.actualArrivalDate).toLocaleDateString()}</div>
                  <div><strong>Confirmed by:</strong> {order.deliveryInfo.deliveryConfirmedBy}</div>
                  {order.deliveryInfo.trackingNumber && (
                    <div><strong>Tracking:</strong> {order.deliveryInfo.trackingNumber}</div>
                  )}
                </div>
                {order.deliveryInfo.deliveryNotes && (
                  <div className="delivery-notes">
                    <strong>Notes:</strong>
                    <p>{order.deliveryInfo.deliveryNotes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Next Steps Section */}
            {order.status === 'approved_for_purchase' && (
              <div className="detail-section next-steps">
                <h4>✓ Order Approved - Next Steps</h4>
                <div className="next-steps-content">
                  <p><strong>Expected Delivery Date:</strong> {order.deliveryInfo.expectedArrivalDate ? new Date(order.deliveryInfo.expectedArrivalDate).toLocaleDateString() : 'TBD'}</p>
                  <p>This order has been approved and is ready for purchase. A director will process the purchase order soon.</p>
                </div>
              </div>
            )}

            {order.status === 'purchased' && (
              <div className="detail-section next-steps">
                <h4>📦 Order Purchased - In Transit</h4>
                <div className="next-steps-content">
                  <p><strong>Expected Delivery:</strong> {order.deliveryInfo.expectedArrivalDate ? new Date(order.deliveryInfo.expectedArrivalDate).toLocaleDateString() : 'TBD'}</p>
                  <p>Your order has been purchased and is on its way. You'll be notified when it arrives.</p>
                  {order.deliveryInfo.trackingNumber && (
                    <p><strong>Tracking Number:</strong> {order.deliveryInfo.trackingNumber}</p>
                  )}
                </div>
              </div>
            )}

            {order.status === 'denied' && (
              <div className="detail-section next-steps denied">
                <h4>✗ Order Denied</h4>
                <div className="next-steps-content">
                  <p>This order request has been denied. Please review the denial reason above and contact a director if you have questions.</p>
                </div>
              </div>
            )}

            {/* Director Approval Actions - Show for directors on pending orders (old and new statuses) */}
            {isDirector && (order.status === 'pending_approval' || order.status === 'pending_technical_approval' || order.status === 'pending_project_approval') && (
              <div className="detail-section approval-actions">
                <h4>Director Actions</h4>
                <div className="approval-form">
                  <div className="form-group">
                    <label>Comments / Denial Reason</label>
                    <textarea 
                      id={`approval-comments-${order.id}`}
                      placeholder="Add comments for approval or reason for denial..."
                      rows="3"
                    />
                  </div>
                  <div className="approval-buttons">
                    <button 
                      className="btn-approve"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const comments = document.getElementById(`approval-comments-${order.id}`).value;
                        await updateOrderStatus(order.id, {
                          type: 'director_approval',
                          approved: true,
                          approvedBy: authService.currentUser?.level || 'director',
                          comments: comments || 'Approved by director'
                        });
                        setSelectedOrder(null);
                      }}
                    >
                      ✓ Approve Order
                    </button>
                    <button 
                      className="btn-deny"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const comments = document.getElementById(`approval-comments-${order.id}`).value;
                        if (!comments.trim()) {
                          await showError('Please provide a reason for denial', 'Denial Reason Required');
                          return;
                        }
                        const confirmed = await showConfirm(
                          'Are you sure you want to deny this order? This action will notify the submitter.',
                          'Confirm Denial'
                        );
                        if (!confirmed) return;
                        
                        await updateOrderStatus(order.id, {
                          type: 'director_approval',
                          approved: false,
                          approvedBy: authService.currentUser?.level || 'director',
                          denialReason: comments
                        });
                        setSelectedOrder(null);
                      }}
                    >
                      ✗ Deny Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      );
    };
  }, [isDirector, updateOrderStatus, showError, showConfirm]);

  const OrderForm = useMemo(() => {
    return () => (
      <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
        <div className="modal-content large" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Submit New Order Request</h3>
            <button className="modal-close" onClick={() => setShowOrderForm(false)}>×</button>
          </div>
          
          <div className="modal-body" ref={formScrollRef}>
            <form onSubmit={(e) => { e.preventDefault(); submitNewOrder(); }}>
              <div className="form-section">
                <h4>Submission Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Subteam *</label>
                    <select 
                      value={orderFormData.submissionDetails.subteam}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        submissionDetails: {
                          ...orderFormData.submissionDetails,
                          subteam: e.target.value
                        }
                      })}
                      required
                    >
                      <option value="">Select Subteam</option>
                      <option value="Business">Business</option>
                      <option value="Aerodynamics">Aerodynamics</option>
                      <option value="Low Voltage">Low Voltage</option>
                      <option value="Systems Architecture">Systems Architecture</option>
                      <option value="High Voltage">High Voltage</option>
                      <option value="Structures">Structures</option>
                      <option value="Vehicle Dynamics">Vehicle Dynamics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="name"
                      value={orderFormData.submissionDetails.submitterName}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        submissionDetails: {
                          ...orderFormData.submissionDetails,
                          submitterName: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Email *</label>
                    <input 
                      type="email"
                      value={orderFormData.submissionDetails.submitterEmail}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        submissionDetails: {
                          ...orderFormData.submissionDetails,
                          submitterEmail: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Material Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Material Name *</label>
                    <input 
                      type="text"
                      value={orderFormData.materialDetails.materialName}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        materialDetails: {
                          ...orderFormData.materialDetails,
                          materialName: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Material Link *</label>
                    <input 
                      type="url"
                      value={orderFormData.materialDetails.materialLink}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        materialDetails: {
                          ...orderFormData.materialDetails,
                          materialLink: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Supplier</label>
                    <input 
                      type="text"
                      value={orderFormData.materialDetails.supplier}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        materialDetails: {
                          ...orderFormData.materialDetails,
                          supplier: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Detailed Specifications *</label>
                  <textarea 
                    value={orderFormData.materialDetails.specifications}
                    onChange={(e) => setOrderFormData({
                      ...orderFormData,
                      materialDetails: {
                        ...orderFormData.materialDetails,
                        specifications: e.target.value
                      }
                    })}
                    rows="4"
                    placeholder="Provide thorough specifications including dimensions, materials, performance characteristics, etc."
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Cost Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Price of 1 item *</label>
                    <input 
                      type="number"
                      step="0.01"
                      min="0"
                      value={orderFormData.costBreakdown.unitPrice}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          unitPrice: e.target.value
                        }
                      })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity of items requested *</label>
                    <input 
                      type="number"
                      min="1"
                      value={orderFormData.costBreakdown.quantity}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          quantity: e.target.value
                        }
                      })}
                      placeholder="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Shipping cost *</label>
                    <input 
                      type="number"
                      step="0.01"
                      min="0"
                      value={orderFormData.costBreakdown.shippingCost}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          shippingCost: e.target.value
                        }
                      })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Total cost of order after taxes or fees *</label>
                    <input 
                      type="number"
                      step="0.01"
                      min="0"
                      value={orderFormData.costBreakdown.totalCost}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          totalCost: e.target.value
                        }
                      })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                {orderFormData.costBreakdown.unitPrice && orderFormData.costBreakdown.quantity && orderFormData.costBreakdown.shippingCost && (
                  <div className="cost-preview">
                    <strong>Calculated Subtotal (Price × Quantity + Shipping): $
                      {(
                        (parseFloat(orderFormData.costBreakdown.unitPrice) || 0) * 
                        (parseInt(orderFormData.costBreakdown.quantity) || 0) +
                        (parseFloat(orderFormData.costBreakdown.shippingCost) || 0)
                      ).toFixed(2)}
                    </strong>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4>Project Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Urgency *</label>
                    <select 
                      value={orderFormData.projectDetails.urgency}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        projectDetails: {
                          ...orderFormData.projectDetails,
                          urgency: e.target.value
                        }
                      })}
                      required
                    >
                      <option value="flexible">Flexible</option>
                      <option value="needed_by_date">Needed by specific date</option>
                      <option value="asap">ASAP</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Needed By Date *</label>
                    <input 
                      type="date"
                      value={orderFormData.projectDetails.neededByDate}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        projectDetails: {
                          ...orderFormData.projectDetails,
                          neededByDate: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Purpose for Project *</label>
                  <textarea 
                    value={orderFormData.projectDetails.purpose}
                    onChange={(e) => setOrderFormData({
                      ...orderFormData,
                      projectDetails: {
                        ...orderFormData.projectDetails,
                        purpose: e.target.value
                      }
                    })}
                    rows="3"
                    placeholder="Explain how this material will be used in the project and why it's needed"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h4>Sponsorship Information</h4>
                <div className="form-group">
                  <label>
                    <input 
                      type="checkbox"
                      checked={orderFormData.sponsorshipInfo.canBeSponsored}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        sponsorshipInfo: {
                          ...orderFormData.sponsorshipInfo,
                          canBeSponsored: e.target.checked
                        }
                      })}
                    />
                    This material can be used for sponsorship opportunities
                  </label>
                </div>
                {orderFormData.sponsorshipInfo.canBeSponsored && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Sponsor Contact Name</label>
                      <input 
                        type="text"
                        value={orderFormData.sponsorshipInfo.sponsorContactName}
                        onChange={(e) => setOrderFormData({
                          ...orderFormData,
                          sponsorshipInfo: {
                            ...orderFormData.sponsorshipInfo,
                            sponsorContactName: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Sponsor Company</label>
                      <input 
                        type="text"
                        value={orderFormData.sponsorshipInfo.sponsorCompany}
                        onChange={(e) => setOrderFormData({
                          ...orderFormData,
                          sponsorshipInfo: {
                            ...orderFormData.sponsorshipInfo,
                            sponsorCompany: e.target.value
                          }
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Sponsor Contact Email</label>
                      <input 
                        type="email"
                        value={orderFormData.sponsorshipInfo.sponsorContactEmail}
                        onChange={(e) => setOrderFormData({
                          ...orderFormData,
                          sponsorshipInfo: {
                            ...orderFormData.sponsorshipInfo,
                            sponsorContactEmail: e.target.value
                          }
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowOrderForm(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Order Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }, [orderFormData, showOrderForm]);

  if (isLoading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (!canView) {
    return (
      <div className="no-permission">
        You don't have permission to view orders. Contact a team leader for access.
      </div>
    );
  }

  return (
    <div className="order-manager">
      <style>{`
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .order-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn-primary {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-right: 1rem;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          color: var(--text);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .filter-select {
          padding: 0.5rem 1rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: var(--surface);
          color: var(--text);
          font-size: 0.9rem;
          min-width: 150px;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .orders-grid {
          display: grid;
          gap: 1.5rem;
        }

        .order-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .order-card:hover {
          transform: translateY(-2px);
        }

        .order-header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .order-title-section {
          flex: 1;
        }

        .order-part-name {
          color: var(--accent);
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .order-meta {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .order-badges {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }

        .priority-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }

        .order-details {
          background: rgba(0, 123, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
          margin: 1rem 0;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          color: var(--subtxt);
        }

        .detail-value {
          color: var(--text);
          font-weight: 500;
        }

        .order-notes {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
          margin: 1rem 0;
          font-style: italic;
          color: var(--subtxt);
        }

        .order-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .approve-btn {
          background: #28a745;
          color: white;
        }

        .approve-btn:hover {
          background: #218838;
        }

        .reject-btn {
          background: #dc3545;
          color: white;
        }

        .reject-btn:hover {
          background: #c82333;
        }

        .mark-ordered-btn {
          background: #17a2b8;
          color: white;
        }

        .mark-ordered-btn:hover {
          background: #138496;
        }

        .mark-delivered-btn {
          background: var(--accent);
          color: white;
        }

        .mark-delivered-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--surface);
          padding: 1rem;
          border-radius: var(--radius);
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: var(--subtxt);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .loading, .no-permission {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }

        .no-orders {
          text-align: center;
          color: var(--subtxt);
          padding: 3rem;
          background: var(--surface);
          border-radius: var(--radius);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--surface);
          border-radius: var(--radius);
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .modal-content.large {
          max-width: 1000px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #333;
        }

        .modal-header h3 {
          color: var(--text);
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          color: var(--subtxt);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
        }

        .modal-close:hover {
          color: var(--text);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .detail-section {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #333;
        }

        .detail-section:last-child {
          border-bottom: none;
        }

        .detail-section h4 {
          color: var(--accent);
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .detail-grid > div {
          color: var(--text);
          font-size: 0.9rem;
        }

        .specifications, .purpose, .response, .delivery-notes {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
        }

        .specifications p, .purpose p, .response p, .delivery-notes p {
          margin: 0.5rem 0 0 0;
          color: var(--text);
          line-height: 1.5;
        }

        .cost-table {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
        }

        .cost-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .cost-row.total {
          border-top: 1px solid #333;
          padding-top: 0.5rem;
          margin-top: 0.5rem;
        }

        .approval-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .approval-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 6px;
        }

        .approval-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-left: 0.5rem;
        }

        .approval-status.pending {
          background: #fd7e14;
          color: white;
        }

        .approval-status.approved {
          background: #28a745;
          color: white;
        }

        .approval-status.denied {
          background: #dc3545;
          color: white;
        }

        .approval-comment, .denial-reason {
          margin: 0.5rem 0 0 0;
          font-size: 0.85rem;
          color: var(--subtxt);
          font-style: italic;
        }

        .approval-meta {
          margin: 0.25rem 0;
          font-size: 0.8rem;
          color: var(--subtxt);
        }

        /* Approval Actions */
        .approval-actions {
          background: rgba(220, 53, 69, 0.1);
          border: 2px solid var(--accent);
          padding: 1.5rem;
          border-radius: 8px;
        }

        .approval-form {
          margin-top: 1rem;
        }

        .approval-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .btn-approve, .btn-deny {
          flex: 1;
          padding: 1rem 2rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-approve {
          background: #28a745;
          color: white;
        }

        .btn-approve:hover {
          background: #218838;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
        }

        .btn-deny {
          background: #dc3545;
          color: white;
        }

        .btn-deny:hover {
          background: #c82333;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
        }

        /* Purchase Modal Styles */
        .purchase-order-summary {
          background: rgba(0, 123, 255, 0.1);
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
        }

        .purchase-order-summary h4 {
          color: var(--accent);
          margin: 0 0 0.5rem 0;
        }

        .purchase-order-summary p {
          margin: 0.25rem 0;
          color: var(--text);
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: flex-end;
        }

        .btn-cancel {
          background: #6c757d;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-cancel:hover {
          background: #545b62;
        }

        .btn-submit {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-submit:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        /* Next Steps Section */
        .next-steps {
          background: rgba(40, 167, 69, 0.1);
          border-left: 4px solid #28a745;
          padding: 1.5rem;
          border-radius: 6px;
        }

        .next-steps.denied {
          background: rgba(220, 53, 69, 0.1);
          border-left-color: #dc3545;
        }

        .next-steps h4 {
          margin: 0 0 1rem 0;
          color: #28a745;
        }

        .next-steps.denied h4 {
          color: #dc3545;
        }

        .next-steps-content p {
          margin: 0.5rem 0;
          color: var(--text);
          line-height: 1.6;
        }

        .action-message {
          background: rgba(253, 126, 20, 0.2);
          padding: 0.75rem;
          border-radius: 6px;
          text-align: center;
          color: var(--text);
          font-weight: 500;
        }

        /* Form Styles */
        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #333;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        .form-section h4 {
          color: var(--accent);
          margin: 0 0 1rem 0;
          font-size: 1.1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: var(--text);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: var(--surface);
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--accent);
        }

        .form-group input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }

        .cost-preview {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(0, 123, 255, 0.1);
          border-radius: 6px;
          text-align: center;
          color: var(--text);
          font-size: 1.1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1rem;
        }

        @media (max-width: 768px) {
          .order-header {
            flex-direction: column;
            gap: 1rem;
          }

          .order-header-section {
            flex-direction: column;
            gap: 1rem;
          }

          .order-badges {
            align-items: flex-start;
            flex-direction: row;
          }

          .filters {
            flex-direction: column;
          }

          .filter-group {
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }

          .detail-grid, .form-grid {
            grid-template-columns: 1fr;
          }

          .approval-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="order-header">
        <h2 className="order-title">Order Management</h2>
        <div className="header-actions">
          <SyncStatusBadge status={status} lastSync={lastSync} onRefresh={handleRefreshData} />
          {(isLead || isDirector) && (
            <button className="btn-primary" onClick={() => setShowOrderForm(true)}>
              + Submit New Order
            </button>
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'pending_approval').length}</div>
          <div className="stat-label">Pending Approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'approved_for_purchase').length}</div>
          <div className="stat-label">Ready to Purchase</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'purchased').length}</div>
          <div className="stat-label">In Transit</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${orders.reduce((total, order) => total + (order.costBreakdown?.totalCost || 0), 0).toFixed(2)}
          </div>
          <div className="stat-label">Total Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'delivered').length}</div>
          <div className="stat-label">Delivered</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending_approval">Pending Director Approval</option>
            <option value="approved_for_purchase">Approved - Ready to Purchase</option>
            <option value="purchased">Purchased - In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="denied">Denied</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Team</label>
          <select 
            className="filter-select"
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
          >
            <option value="all">All Teams</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <h3>No orders found</h3>
          <p>No orders match your current filters.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map(order => (
            <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
              <div className="order-header-section">
                <div className="order-title-section">
                  <h3 className="order-part-name">{order.materialDetails.materialName}</h3>
                  <div className="order-meta">
                    <strong>{order.submissionDetails.subteam}</strong> • Requested by {order.submissionDetails.submitterName}
                  </div>
                  <div className="order-meta">
                    Submitted: {new Date(order.submissionTimestamp).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="order-badges">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Supplier:</span>
                  <span className="detail-value">{order.materialDetails.supplier}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Quantity:</span>
                  <span className="detail-value">{order.costBreakdown.quantity}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Unit Price:</span>
                  <span className="detail-value">${order.costBreakdown.unitPrice.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total:</span>
                  <span className="detail-value">${order.costBreakdown.totalCost.toFixed(2)}</span>
                </div>
                {order.deliveryInfo.expectedArrivalDate && (
                  <div className="detail-row">
                    <span className="detail-label">Expected Delivery:</span>
                    <span className="detail-value">{new Date(order.deliveryInfo.expectedArrivalDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="order-notes">
                <strong>Purpose:</strong> {order.projectDetails.purpose.substring(0, 150)}
                {order.projectDetails.purpose.length > 150 && '...'}
              </div>

              {isDirector && (
                <div className="order-actions" onClick={(e) => e.stopPropagation()}>
                  {order.status === 'pending_approval' && (
                    <div className="action-message">
                      Click to view and approve/deny this order
                    </div>
                  )}

                  {order.status === 'approved_for_purchase' && (
                    <button 
                      className="action-btn mark-ordered-btn"
                      onClick={() => {
                        setPurchasingOrder(order);
                        setShowPurchaseModal(true);
                      }}
                    >
                      📦 Mark as Purchased
                    </button>
                  )}
                  
                  {order.status === 'purchased' && (
                    <button 
                      className="action-btn mark-delivered-btn"
                      onClick={() => updateOrderStatus(order.id, {
                        type: 'delivery',
                        confirmedBy: authService.currentUser?.level || 'director',
                        notes: 'Delivered to subteam'
                      })}
                    >
                      ✅ Mark as Delivered
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && OrderDetailModal({
        order: selectedOrder,
        onClose: () => setSelectedOrder(null)
      })}

      {/* Order Form Modal */}
      {showOrderForm && OrderForm()}

      {/* Purchase Modal */}
      {showPurchaseModal && purchasingOrder && (
        <div className="modal-overlay" onClick={() => setShowPurchaseModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Mark Order as Purchased</h3>
              <button className="modal-close" onClick={() => setShowPurchaseModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="purchase-order-summary">
                <h4>{purchasingOrder.materialDetails.materialName}</h4>
                <p><strong>Subteam:</strong> {purchasingOrder.submissionDetails.subteam}</p>
                <p><strong>Total Cost:</strong> ${purchasingOrder.costBreakdown.totalCost.toFixed(2)}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handlePurchaseSubmit(); }}>
                <div className="form-section">
                  <h4>Delivery Information</h4>
                  
                  <div className="form-group">
                    <label>Expected Delivery Date *</label>
                    <input 
                      type="date"
                      value={purchaseFormData.expectedDeliveryDate}
                      onChange={(e) => setPurchaseFormData({
                        ...purchaseFormData,
                        expectedDeliveryDate: e.target.value
                      })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Delivery Notes</label>
                    <textarea 
                      value={purchaseFormData.deliveryNotes}
                      onChange={(e) => setPurchaseFormData({
                        ...purchaseFormData,
                        deliveryNotes: e.target.value
                      })}
                      placeholder="Add any custom notes about the delivery (e.g., special handling, expected carrier, etc.)"
                      rows="4"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tracking Number (Optional)</label>
                    <input 
                      type="text"
                      value={purchaseFormData.trackingNumber}
                      onChange={(e) => setPurchaseFormData({
                        ...purchaseFormData,
                        trackingNumber: e.target.value
                      })}
                      placeholder="Enter tracking number if available"
                    />
                  </div>

                  <div className="form-group">
                    <label>Purchase Order Number (Optional)</label>
                    <input 
                      type="text"
                      value={purchaseFormData.purchaseOrderNumber}
                      onChange={(e) => setPurchaseFormData({
                        ...purchaseFormData,
                        purchaseOrderNumber: e.target.value
                      })}
                      placeholder="Auto-generated if left blank"
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowPurchaseModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    📦 Confirm Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;