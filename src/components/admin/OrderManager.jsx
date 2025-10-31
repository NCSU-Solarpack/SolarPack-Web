import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      taxes: '',
      fees: ''
    },
    projectDetails: {
      purpose: '',
      priority: 'medium',
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

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('/data/orders.json');
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, statusUpdate) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const now = new Date().toISOString();
        let updatedOrder = { ...order, lastUpdated: now };

        // Handle different types of status updates
        if (statusUpdate.type === 'technical_approval') {
          updatedOrder.approvalWorkflow.technicalDirectorApproval = {
            ...updatedOrder.approvalWorkflow.technicalDirectorApproval,
            status: statusUpdate.approved ? 'approved' : 'denied',
            approvedBy: statusUpdate.approvedBy,
            approvalDate: now,
            comments: statusUpdate.comments || '',
            denialReason: statusUpdate.denialReason || ''
          };
          updatedOrder.status = statusUpdate.approved ? 'pending_project_approval' : 'denied';
        } else if (statusUpdate.type === 'project_approval') {
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval = {
            ...updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval,
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

        return updatedOrder;
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Save to GitHub (placeholder)
    console.log('Updating order:', orderId, statusUpdate);
    // TODO: Implement GitHub API save
  };

  const submitNewOrder = async () => {
    const now = new Date().toISOString();
    const newOrder = {
      id: `order-${Date.now()}`,
      submissionTimestamp: now,
      submissionDetails: orderFormData.submissionDetails,
      materialDetails: orderFormData.materialDetails,
      costBreakdown: {
        ...orderFormData.costBreakdown,
        unitPrice: parseFloat(orderFormData.costBreakdown.unitPrice),
        quantity: parseInt(orderFormData.costBreakdown.quantity),
        shippingCost: parseFloat(orderFormData.costBreakdown.shippingCost || 0),
        taxes: parseFloat(orderFormData.costBreakdown.taxes || 0),
        fees: parseFloat(orderFormData.costBreakdown.fees || 0),
        subtotal: parseFloat(orderFormData.costBreakdown.unitPrice) * parseInt(orderFormData.costBreakdown.quantity),
        totalCost: (parseFloat(orderFormData.costBreakdown.unitPrice) * parseInt(orderFormData.costBreakdown.quantity)) +
                   parseFloat(orderFormData.costBreakdown.shippingCost || 0) +
                   parseFloat(orderFormData.costBreakdown.taxes || 0) +
                   parseFloat(orderFormData.costBreakdown.fees || 0)
      },
      projectDetails: {
        ...orderFormData.projectDetails,
        neededByDate: orderFormData.projectDetails.neededByDate ? 
          new Date(orderFormData.projectDetails.neededByDate).toISOString() : null
      },
      approvalWorkflow: {
        technicalDirectorApproval: {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        },
        projectDirectorPurchaseApproval: {
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
      status: 'pending_technical_approval',
      lastUpdated: now,
      createdBy: orderFormData.submissionDetails.submitterEmail
    };

    setOrders([...orders, newOrder]);
    setShowOrderForm(false);
    resetOrderForm();
    
    // Save to GitHub (placeholder)
    console.log('New order submitted:', newOrder);
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
        taxes: '',
        fees: ''
      },
      projectDetails: {
        purpose: '',
        priority: 'medium',
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

  const canApprove = authService.hasPermission('approve_orders');
  const canView = authService.hasPermission('submit_orders') || authService.hasPermission('view_schedules');
  const canSubmit = authService.hasPermission('submit_orders');
  const isTechnicalDirector = authService.hasPermission('technical_director');
  const isProjectDirector = authService.hasPermission('project_director');

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (filterTeam !== 'all' && order.submissionDetails.subteam !== filterTeam) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_technical_approval': return '#fd7e14';
      case 'pending_project_approval': return '#17a2b8';
      case 'approved_for_purchase': return '#007bff';
      case 'purchased': return '#6f42c1';
      case 'delivered': return '#28a745';
      case 'denied': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_technical_approval': return 'Pending Tech Approval';
      case 'pending_project_approval': return 'Pending Project Approval';
      case 'approved_for_purchase': return 'Approved for Purchase';
      case 'purchased': return 'Purchased';
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

  const OrderDetailModal = ({ order, onClose }) => {
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
                  <div><strong>Link:</strong> 
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
                <div><strong>Priority:</strong> {order.projectDetails.priority}</div>
                <div><strong>Urgency:</strong> {order.projectDetails.urgency}</div>
                {order.projectDetails.neededByDate && (
                  <div><strong>Needed by:</strong> {new Date(order.projectDetails.neededByDate).toLocaleDateString()}</div>
                )}
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
                  <strong>Technical Director:</strong>
                  <span className={`approval-status ${order.approvalWorkflow.technicalDirectorApproval.status}`}>
                    {order.approvalWorkflow.technicalDirectorApproval.status}
                  </span>
                  {order.approvalWorkflow.technicalDirectorApproval.comments && (
                    <p className="approval-comment">{order.approvalWorkflow.technicalDirectorApproval.comments}</p>
                  )}
                  {order.approvalWorkflow.technicalDirectorApproval.denialReason && (
                    <p className="denial-reason">{order.approvalWorkflow.technicalDirectorApproval.denialReason}</p>
                  )}
                </div>
                <div className="approval-item">
                  <strong>Project Director:</strong>
                  <span className={`approval-status ${order.approvalWorkflow.projectDirectorPurchaseApproval.status}`}>
                    {order.approvalWorkflow.projectDirectorPurchaseApproval.status}
                  </span>
                  {order.approvalWorkflow.projectDirectorPurchaseApproval.comments && (
                    <p className="approval-comment">{order.approvalWorkflow.projectDirectorPurchaseApproval.comments}</p>
                  )}
                  {order.approvalWorkflow.projectDirectorPurchaseApproval.denialReason && (
                    <p className="denial-reason">{order.approvalWorkflow.projectDirectorPurchaseApproval.denialReason}</p>
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
          </div>
        </div>
      </div>
    );
  };

  const OrderForm = () => {
    return (
      <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
        <div className="modal-content large" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Submit New Order Request</h3>
            <button className="modal-close" onClick={() => setShowOrderForm(false)}>×</button>
          </div>
          
          <div className="modal-body">
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
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Software">Software</option>
                      <option value="Business">Business</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text"
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
                    <label>Supplier *</label>
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
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Supplier Contact</label>
                    <input 
                      type="text"
                      value={orderFormData.materialDetails.supplierContact}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        materialDetails: {
                          ...orderFormData.materialDetails,
                          supplierContact: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Material Link</label>
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
                    <label>Unit Price ($) *</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={orderFormData.costBreakdown.unitPrice}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          unitPrice: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity *</label>
                    <input 
                      type="number"
                      value={orderFormData.costBreakdown.quantity}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          quantity: e.target.value
                        }
                      })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Shipping Cost ($)</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={orderFormData.costBreakdown.shippingCost}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          shippingCost: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Estimated Taxes ($)</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={orderFormData.costBreakdown.taxes}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          taxes: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Additional Fees ($)</label>
                    <input 
                      type="number"
                      step="0.01"
                      value={orderFormData.costBreakdown.fees}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        costBreakdown: {
                          ...orderFormData.costBreakdown,
                          fees: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
                {orderFormData.costBreakdown.unitPrice && orderFormData.costBreakdown.quantity && (
                  <div className="cost-preview">
                    <strong>Estimated Total: $
                      {(
                        (parseFloat(orderFormData.costBreakdown.unitPrice) || 0) * 
                        (parseInt(orderFormData.costBreakdown.quantity) || 0) +
                        (parseFloat(orderFormData.costBreakdown.shippingCost) || 0) +
                        (parseFloat(orderFormData.costBreakdown.taxes) || 0) +
                        (parseFloat(orderFormData.costBreakdown.fees) || 0)
                      ).toFixed(2)}
                    </strong>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4>Project Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Priority *</label>
                    <select 
                      value={orderFormData.projectDetails.priority}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        projectDetails: {
                          ...orderFormData.projectDetails,
                          priority: e.target.value
                        }
                      })}
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
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
                    <label>Needed By Date</label>
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
  };

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
          border-top: 1px solid #333;
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
        {canSubmit && (
          <button className="btn-primary" onClick={() => setShowOrderForm(true)}>
            + Submit New Order
          </button>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'pending_technical_approval').length}</div>
          <div className="stat-label">Pending Tech Approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'pending_project_approval').length}</div>
          <div className="stat-label">Pending Project Approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{orders.filter(o => o.status === 'purchased').length}</div>
          <div className="stat-label">Purchased</div>
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
            <option value="pending_technical_approval">Pending Tech Approval</option>
            <option value="pending_project_approval">Pending Project Approval</option>
            <option value="approved_for_purchase">Approved for Purchase</option>
            <option value="purchased">Purchased</option>
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
                  <span 
                    className="priority-badge" 
                    style={{ backgroundColor: getPriorityColor(order.projectDetails.priority) }}
                  >
                    {order.projectDetails.priority} priority
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

              {(canApprove || isTechnicalDirector || isProjectDirector) && (
                <div className="order-actions" onClick={(e) => e.stopPropagation()}>
                  {isTechnicalDirector && order.status === 'pending_technical_approval' && (
                    <>
                      <button 
                        className="action-btn approve-btn"
                        onClick={() => updateOrderStatus(order.id, {
                          type: 'technical_approval',
                          approved: true,
                          approvedBy: 'tech.director@solarpack.com',
                          comments: 'Approved by technical director'
                        })}
                      >
                        ✓ Tech Approve
                      </button>
                      <button 
                        className="action-btn reject-btn"
                        onClick={() => updateOrderStatus(order.id, {
                          type: 'technical_approval',
                          approved: false,
                          approvedBy: 'tech.director@solarpack.com',
                          denialReason: 'Denied by technical director'
                        })}
                      >
                        ✗ Tech Deny
                      </button>
                    </>
                  )}

                  {isProjectDirector && order.status === 'pending_project_approval' && (
                    <>
                      <button 
                        className="action-btn approve-btn"
                        onClick={() => updateOrderStatus(order.id, {
                          type: 'project_approval',
                          approved: true,
                          approvedBy: 'project.director@solarpack.com',
                          comments: 'Purchase approved'
                        })}
                      >
                        ✓ Purchase Approve
                      </button>
                      <button 
                        className="action-btn reject-btn"
                        onClick={() => updateOrderStatus(order.id, {
                          type: 'project_approval',
                          approved: false,
                          approvedBy: 'project.director@solarpack.com',
                          denialReason: 'Purchase denied'
                        })}
                      >
                        ✗ Purchase Deny
                      </button>
                    </>
                  )}

                  {canApprove && order.status === 'approved_for_purchase' && (
                    <button 
                      className="action-btn mark-ordered-btn"
                      onClick={() => updateOrderStatus(order.id, {
                        type: 'purchase',
                        purchaseOrderNumber: `PO-${Date.now()}`,
                        actualCost: order.costBreakdown.totalCost,
                        purchasedBy: 'purchasing@solarpack.com'
                      })}
                    >
                      📦 Mark as Purchased
                    </button>
                  )}
                  
                  {canApprove && order.status === 'purchased' && (
                    <button 
                      className="action-btn mark-delivered-btn"
                      onClick={() => updateOrderStatus(order.id, {
                        type: 'delivery',
                        confirmedBy: 'warehouse@solarpack.com',
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
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Order Form Modal */}
      {showOrderForm && <OrderForm />}
    </div>
  );
};

export default OrderManager;