import { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';

const OrderManager = forwardRef((props, ref) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formScrollRef = useRef(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterTimeline, setFilterTimeline] = useState('current');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditingOrderDetails, setIsEditingOrderDetails] = useState(false);
  const [editedOrderData, setEditedOrderData] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchasingOrder, setPurchasingOrder] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvingOrder, setApprovingOrder] = useState(null);
  const [approvalComments, setApprovalComments] = useState('');
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

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    handleSubmitOrder: () => {
      setShowOrderForm(true);
    }
  }));

  // Helper function to get semester information
  const getSemesterInfo = (date = new Date()) => {
    const month = date.getMonth(); // 0-11
    const year = date.getFullYear();
    
    // Fall: August (7) to December (11)
    // Spring: January (0) to May (4)
    if (month >= 7 && month <= 11) {
      return { semester: 'fall', year };
    } else if (month >= 0 && month <= 4) {
      return { semester: 'spring', year };
    } else {
      // June (5) and July (6) - consider as part of summer/upcoming fall
      return { semester: 'fall', year };
    }
  };

  // Helper function to get date range for a semester
  const getSemesterDateRange = (semester, year) => {
    let startDate, endDate;
    
    if (semester === 'fall') {
      startDate = new Date(year, 7, 1); // August 1
      endDate = new Date(year, 11, 31, 23, 59, 59); // December 31
    } else { // spring
      startDate = new Date(year, 0, 1); // January 1
      endDate = new Date(year, 4, 31, 23, 59, 59); // May 31
    }
    
    return { startDate, endDate };
  };

  // Generate semester filter options
  const getSemesterOptions = () => {
    const currentSemester = getSemesterInfo();
    const options = [{ value: 'current', label: `${currentSemester.semester.charAt(0).toUpperCase() + currentSemester.semester.slice(1)} ${currentSemester.year}` }];
    
    // Get previous semester
    let prevSemester, prevYear;
    if (currentSemester.semester === 'fall') {
      prevSemester = 'spring';
      prevYear = currentSemester.year;
    } else {
      prevSemester = 'fall';
      prevYear = currentSemester.year - 1;
    }
    
    options.push({ value: `${prevSemester}_${prevYear}`, label: `${prevSemester.charAt(0).toUpperCase() + prevSemester.slice(1)} ${prevYear}` });
    
    // Add past year option (rolling 12 months)
    options.push({ value: 'past_year', label: 'Year' });
    
    return options;
  };

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

  // Migrate old order structure to new two-stage approval structure
  const migrateOrderStructure = (order) => {
    // Safety check: ensure order has required structure
    if (!order || !order.approvalWorkflow) {
      console.warn('Order missing approvalWorkflow, skipping:', order);
      return null;
    }

    let migratedOrder = { ...order };

    // Ensure technicalDirectorApproval exists
    if (!migratedOrder.approvalWorkflow.technicalDirectorApproval) {
      migratedOrder.approvalWorkflow.technicalDirectorApproval = {
        status: 'pending',
        approvedBy: null,
        approvalDate: null,
        comments: '',
        denialReason: ''
      };
    }

    // Handle old property names -> projectDirectorPurchaseApproval migration
    if (migratedOrder.approvalWorkflow.purchaseApproval && !migratedOrder.approvalWorkflow.projectDirectorPurchaseApproval) {
      // Migrate old purchaseApproval to projectDirectorPurchaseApproval
      migratedOrder.approvalWorkflow.projectDirectorPurchaseApproval = {
        ...migratedOrder.approvalWorkflow.purchaseApproval
      };
      delete migratedOrder.approvalWorkflow.purchaseApproval;
    } else if (migratedOrder.approvalWorkflow.directorApproval && !migratedOrder.approvalWorkflow.technicalDirectorApproval) {
      // Migrate single directorApproval to technicalDirectorApproval
      migratedOrder.approvalWorkflow.technicalDirectorApproval = {
        ...migratedOrder.approvalWorkflow.directorApproval
      };
      delete migratedOrder.approvalWorkflow.directorApproval;
    }

    // Ensure projectDirectorPurchaseApproval exists
    if (!migratedOrder.approvalWorkflow.projectDirectorPurchaseApproval) {
      // Default to pending unless sponsorship was successful
      const sponsorshipSuccessful = migratedOrder.sponsorshipInfo?.sponsorshipSearchStatus === 'successful' || 
                                      migratedOrder.sponsorshipInfo?.sponsorshipSuccessful === true;
      
      migratedOrder.approvalWorkflow.projectDirectorPurchaseApproval = {
        status: sponsorshipSuccessful ? 'not_required' : 'pending',
        approvedBy: null,
        approvalDate: null,
        comments: sponsorshipSuccessful ? 'Obtained through sponsorship - no purchase needed' : '',
        denialReason: ''
      };
    }

    // Migrate status to new scheme
    let migratedStatus = migratedOrder.status;
    if (migratedOrder.status === 'pending_approval') {
      migratedStatus = 'pending_technical_approval';
    } else if (migratedOrder.status === 'approved_for_purchase') {
      // Migrate old approved_for_purchase to approved
      migratedStatus = 'approved';
    } else if (migratedOrder.status === 'pending_purchase_approval') {
      // Migrate old pending_purchase_approval to pending_project_approval
      migratedStatus = 'pending_project_approval';
    } else if (migratedOrder.status === 'awaiting_sponsorship') {
      // Migrate old awaiting_sponsorship to pending_project_approval with comments
      migratedStatus = 'pending_project_approval';
    } else if (migratedOrder.status === 'in_transit') {
      // Migrate old in_transit to shipped
      migratedStatus = 'shipped';
    }

    // Ensure sponsorshipSearchStatus exists
    if (migratedOrder.sponsorshipInfo && !migratedOrder.sponsorshipInfo.sponsorshipSearchStatus) {
      migratedOrder.sponsorshipInfo.sponsorshipSearchStatus = 
        migratedOrder.sponsorshipInfo.canBeSponsored ? 'in_progress' : 'not_applicable';
    }

    migratedOrder.status = migratedStatus;
    return migratedOrder;
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
      
      // Migrate old order structures to new format, filter out any null results
      const migratedOrders = data.orders.map(migrateOrderStructure).filter(order => order !== null);
      
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

      // Ensure proper structure exists
      if (!updatedOrder.approvalWorkflow.technicalDirectorApproval) {
        updatedOrder.approvalWorkflow.technicalDirectorApproval = {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        };
      }
      if (!updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval) {
        updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval = {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        };
      }

      // Handle different types of status updates
      // New workflow: Technical Director handles sponsorship during approval
      // 1. Technical Director approval with sponsorship status (always required)
      // 2. Purchase approval (only if sponsorship fails or not applicable)
      // Status flow: pending_technical_approval -> (if successful) approved OR (if failed/N/A) pending_project_approval -> approved -> shipped -> delivered
      if (statusUpdate.type === 'technical_director_approval') {
        updatedOrder.approvalWorkflow.technicalDirectorApproval = {
          ...updatedOrder.approvalWorkflow.technicalDirectorApproval,
          status: statusUpdate.approved ? 'approved' : 'denied',
          approvedBy: statusUpdate.approvedBy,
          approvalDate: now,
          comments: statusUpdate.comments || '',
          denialReason: statusUpdate.denialReason || ''
        };
        
        // Update sponsorship info with Tech Director's determination
        const sponsorshipStatus = statusUpdate.sponsorshipStatus || 'not_applicable';
        updatedOrder.sponsorshipInfo = {
          ...updatedOrder.sponsorshipInfo,
          sponsorshipSearchStatus: sponsorshipStatus,
          sponsorshipResponse: statusUpdate.sponsorshipNotes || updatedOrder.sponsorshipInfo.sponsorshipResponse || '',
          sponsorshipSuccessful: sponsorshipStatus === 'successful',
          canBeSponsored: sponsorshipStatus !== 'not_applicable'
        };
        
        if (statusUpdate.approved) {
          // Route based on sponsorship status
          if (sponsorshipStatus === 'successful') {
            // Obtained for free - skip purchase approval entirely
            updatedOrder.status = 'approved';
            updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.status = 'not_required';
            updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.comments = 'Material obtained through sponsorship - no purchase needed';
          } else if (sponsorshipStatus === 'failed' || sponsorshipStatus === 'not_applicable') {
            // Need to purchase - require purchase approval
            updatedOrder.status = 'pending_project_approval';
            updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.status = 'pending';
          } else {
            // in_progress or not_started - still awaiting sponsorship
            updatedOrder.status = 'pending_project_approval';
            updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.comments = 'Awaiting sponsorship search completion';
          }
        } else {
          updatedOrder.status = 'denied';
        }
      } else if (statusUpdate.type === 'purchase_approval') {
        updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval = {
          ...updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval,
          status: statusUpdate.approved ? 'approved' : 'denied',
          approvedBy: statusUpdate.approvedBy,
          approvalDate: now,
          comments: statusUpdate.comments || '',
          denialReason: statusUpdate.denialReason || ''
        };
        updatedOrder.status = statusUpdate.approved ? 'approved' : 'denied';
      } else if (statusUpdate.type === 'sponsorship_status') {
        updatedOrder.sponsorshipInfo = {
          ...updatedOrder.sponsorshipInfo,
          sponsorshipSearchStatus: statusUpdate.searchStatus
        };
        
        // Update purchase approval status based on sponsorship search status
        if (statusUpdate.searchStatus === 'successful') {
          // Sponsorship successful - obtained for free, no purchase approval needed
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.status = 'not_required';
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.comments = 'Obtained through sponsorship - no purchase needed';
          // Don't auto-change the order status - let tech director approve normally
          // The status will be set when they click approve/deny
        } else if (statusUpdate.searchStatus === 'failed' || statusUpdate.searchStatus === 'not_applicable') {
          // Sponsorship failed or not applicable - will need purchase approval after tech director approves
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.status = 'pending';
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.comments = '';
          // Keep status as is - tech director still needs to approve
        } else if (statusUpdate.searchStatus === 'in_progress' || statusUpdate.searchStatus === 'not_started') {
          // Sponsorship search is ongoing or hasn't started - will need purchase approval if it fails
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.status = 'pending';
          updatedOrder.approvalWorkflow.projectDirectorPurchaseApproval.comments = 'Awaiting sponsorship search completion';
          // Keep current status - use pending_project_approval if search is in progress
          if (statusUpdate.searchStatus === 'in_progress' && updatedOrder.status === 'pending_technical_approval') {
            updatedOrder.status = 'pending_project_approval';
          }
        }
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
        updatedOrder.status = 'shipped';
      } else if (statusUpdate.type === 'delivery') {
        updatedOrder.deliveryInfo = {
          ...updatedOrder.deliveryInfo,
          actualArrivalDate: now,
          deliveredToSubteam: true,
          deliveryConfirmedBy: statusUpdate.confirmedBy || '',
          deliveryNotes: statusUpdate.notes || updatedOrder.deliveryInfo.deliveryNotes || '',
          trackingNumber: statusUpdate.trackingNumber || updatedOrder.deliveryInfo.trackingNumber || ''
        };
        updatedOrder.status = 'delivered';
      } else if (statusUpdate.type === 'sponsorship_response') {
        updatedOrder.sponsorshipInfo = {
          ...updatedOrder.sponsorshipInfo,
          sponsorshipSuccessful: statusUpdate.successful,
          sponsorshipResponse: statusUpdate.response || '',
          sponsorshipResponseDate: now
        };
        
        // Update sponsorship search status based on response
        if (statusUpdate.successful) {
          updatedOrder.sponsorshipInfo.sponsorshipSearchStatus = 'successful';
        } else {
          updatedOrder.sponsorshipInfo.sponsorshipSearchStatus = 'failed';
        }
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

  const saveOrderEdits = async () => {
    if (!editedOrderData) return;
    
    startSaving();
    
    try {
      const now = new Date().toISOString();
      const updatedOrder = {
        ...editedOrderData,
        lastUpdated: now
      };

      // Save to Supabase
      await supabaseService.updateOrder(editedOrderData.id, updatedOrder);
      
      // Update local state
      const updatedOrders = orders.map(o => o.id === editedOrderData.id ? updatedOrder : o);
      setOrders(updatedOrders);
      
      // Update selected order to show new data
      setSelectedOrder(updatedOrder);
      
      // Update the displayed data hash to match the new state
      setDisplayedData({ orders: updatedOrders });
      
      // Exit edit mode
      setIsEditingOrderDetails(false);
      setEditedOrderData(null);
      
      finishSaving();
      await showSuccess('Order details saved successfully');
    } catch (error) {
      console.error('Error saving order edits:', error);
      finishSaving();
      await showError(`Failed to save changes: ${error.message}`, 'Save Error');
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
        totalCost: parseFloat(orderFormData.costBreakdown.totalCost),
        taxes: 0,
        fees: 0
      },
      projectDetails: {
        ...orderFormData.projectDetails,
        neededByDate: orderFormData.projectDetails.neededByDate 
          ? new Date(orderFormData.projectDetails.neededByDate).toISOString() 
          : null
      },
      approvalWorkflow: {
        technicalDirectorApproval: {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        },
        purchaseApproval: {
          status: 'pending',
          approvedBy: null,
          approvalDate: null,
          comments: '',
          denialReason: ''
        }
      },
      sponsorshipInfo: {
        canBeSponsored: false,
        sponsorContactName: '',
        sponsorContactEmail: '',
        sponsorCompany: '',
        sponsorshipSearchStatus: 'in_progress',
        sponsorshipRequested: false,
        sponsorshipRequestDate: null,
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
    
    // Timeline filter - semester-based or past year
    if (filterTimeline !== 'all') {
      const orderDate = new Date(order.submissionTimestamp);
      
      if (filterTimeline === 'current') {
        // Use current semester
        const currentSemester = getSemesterInfo();
        const { startDate, endDate } = getSemesterDateRange(currentSemester.semester, currentSemester.year);
        if (orderDate < startDate || orderDate > endDate) {
          return false;
        }
      } else if (filterTimeline === 'past_year') {
        // Past 12 months from today
        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        if (orderDate < oneYearAgo) {
          return false;
        }
      } else {
        // Parse semester_year format (e.g., 'fall_2024' or 'spring_2025')
        const parts = filterTimeline.split('_');
        const semesterToFilter = parts[0];
        const yearToFilter = parseInt(parts[1]);
        
        // Get date range for the selected semester
        const { startDate, endDate } = getSemesterDateRange(semesterToFilter, yearToFilter);
        
        // Filter orders within this semester
        if (orderDate < startDate || orderDate > endDate) {
          return false;
        }
      }
    }
    
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_technical_approval': return '#f59e0b'; // Warm amber for pending
      case 'pending_project_approval': return '#f59e0b'; // Same amber for consistency
      case 'approved': return '#10b981'; // Emerald green for approved
      case 'shipped': return '#3b82f6'; // Clean blue for shipped
      case 'purchased': return '#3b82f6'; // Same as shipped
      case 'delivered': return '#059669'; // Darker green for completion
      case 'completed': return '#059669'; // Darker green for completion
      case 'denied': return '#ef4444'; // Clean red for denied
      case 'cancelled': return '#6b7280'; // Gray for cancelled
      case 'returned': return '#6b7280'; // Gray for returned
      // Legacy statuses (kept for backward compatibility during migration)
      case 'pending_approval': return '#f59e0b';
      case 'awaiting_sponsorship': return '#8b5cf6';
      case 'pending_purchase_approval': return '#f59e0b';
      case 'approved_for_purchase': return '#10b981';
      case 'in_transit': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_technical_approval': return 'Pending Tech Director Approval';
      case 'pending_project_approval': return 'Pending Purchase Approval';
      case 'approved': return 'Approved - Ready to Purchase';
      case 'shipped': return 'Shipped';
      case 'purchased': return 'Purchased';
      case 'delivered': return 'Delivered';
      case 'completed': return 'Completed';
      case 'denied': return 'Denied';
      case 'cancelled': return 'Cancelled';
      case 'returned': return 'Returned';
      // Legacy statuses (kept for backward compatibility during migration)
      case 'pending_approval': return 'Pending Approval';
      case 'awaiting_sponsorship': return 'Awaiting Sponsorship Search';
      case 'pending_purchase_approval': return 'Pending Purchase Approval';
      case 'approved_for_purchase': return 'Approved - Ready to Purchase';
      case 'in_transit': return 'In Transit';
      default: return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
            <div className="modal-header-actions">
              {isDirector && !isEditingOrderDetails && (
                <button 
                  className="btn-edit-order" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingOrderDetails(true);
                    setEditedOrderData(JSON.parse(JSON.stringify(order))); // Deep copy
                  }}
                  title="Edit Order Details"
                >
                  ✎
                </button>
              )}
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
          </div>
          
          <div className="modal-body">
            <div className="detail-section">
              <h4>Submission Details</h4>
              <div className="detail-grid">
                <div>
                  <strong>Subteam:</strong> 
                  {isEditingOrderDetails ? (
                    <select 
                      value={editedOrderData.submissionDetails.subteam}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        submissionDetails: {
                          ...editedOrderData.submissionDetails,
                          subteam: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    >
                      <option value="Business">Business</option>
                      <option value="Aerodynamics">Aerodynamics</option>
                      <option value="Low Voltage">Low Voltage</option>
                      <option value="Systems Architecture">Systems Architecture</option>
                      <option value="High Voltage">High Voltage</option>
                      <option value="Structures">Structures</option>
                      <option value="Vehicle Dynamics">Vehicle Dynamics</option>
                    </select>
                  ) : (
                    ` ${order.submissionDetails.subteam}`
                  )}
                </div>
                <div>
                  <strong>Submitted by:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="text"
                      value={editedOrderData.submissionDetails.submitterName}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        submissionDetails: {
                          ...editedOrderData.submissionDetails,
                          submitterName: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    />
                  ) : (
                    ` ${order.submissionDetails.submitterName}`
                  )}
                </div>
                <div>
                  <strong>Email:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="email"
                      value={editedOrderData.submissionDetails.submitterEmail}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        submissionDetails: {
                          ...editedOrderData.submissionDetails,
                          submitterEmail: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    />
                  ) : (
                    ` ${order.submissionDetails.submitterEmail}`
                  )}
                </div>
                <div><strong>Submitted:</strong> {new Date(order.submissionTimestamp).toLocaleString()}</div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Material Specifications</h4>
              <div className="detail-grid">
                <div>
                  <strong>Material:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="text"
                      value={editedOrderData.materialDetails.materialName}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        materialDetails: {
                          ...editedOrderData.materialDetails,
                          materialName: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    />
                  ) : (
                    ` ${order.materialDetails.materialName}`
                  )}
                </div>
                <div>
                  <strong>Supplier:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="text"
                      value={editedOrderData.materialDetails?.supplier || ''}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        materialDetails: {
                          ...editedOrderData.materialDetails,
                          supplier: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    />
                  ) : (
                    ` ${order.materialDetails?.supplier || 'N/A'}`
                  )}
                </div>
                <div>
                  <strong>Supplier Contact:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="text"
                      value={editedOrderData.materialDetails?.supplierContact || ''}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        materialDetails: {
                          ...editedOrderData.materialDetails,
                          supplierContact: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    />
                  ) : (
                    ` ${order.materialDetails?.supplierContact || 'N/A'}`
                  )}
                </div>
                <div>
                  <strong>Link:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="url"
                      value={editedOrderData.materialDetails.materialLink || ''}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        materialDetails: {
                          ...editedOrderData.materialDetails,
                          materialLink: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                      placeholder="https://..."
                    />
                  ) : order.materialDetails.materialLink ? (
                    <a href={order.materialDetails.materialLink} target="_blank" rel="noopener noreferrer">
                      View Material
                    </a>
                  ) : (
                    ' N/A'
                  )}
                </div>
              </div>
              <div className="specifications">
                <strong>Specifications:</strong>
                {isEditingOrderDetails ? (
                  <textarea 
                    value={editedOrderData.materialDetails?.specifications || ''}
                    onChange={(e) => setEditedOrderData({
                      ...editedOrderData,
                      materialDetails: {
                        ...editedOrderData.materialDetails,
                        specifications: e.target.value
                      }
                    })}
                    className="inline-edit-textarea"
                    rows="4"
                  />
                ) : (
                  <p>{order.materialDetails?.specifications || 'N/A'}</p>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h4>Cost Breakdown</h4>
              <div className="cost-table">
                <div className="cost-row">
                  <span>Unit Price:</span>
                  {isEditingOrderDetails ? (
                    <input 
                      type="number"
                      step="0.01"
                      value={editedOrderData.costBreakdown.unitPrice}
                      onChange={(e) => {
                        const unitPrice = parseFloat(e.target.value) || 0;
                        const quantity = editedOrderData.costBreakdown.quantity;
                        const shipping = editedOrderData.costBreakdown.shippingCost;
                        const taxes = editedOrderData.costBreakdown.taxes;
                        const fees = editedOrderData.costBreakdown.fees;
                        const totalCost = (unitPrice * quantity) + shipping + taxes + fees;
                        setEditedOrderData({
                          ...editedOrderData,
                          costBreakdown: {
                            ...editedOrderData.costBreakdown,
                            unitPrice,
                            totalCost
                          }
                        });
                      }}
                      className="inline-edit-input-small"
                    />
                  ) : (
                    <span>${order.costBreakdown.unitPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="cost-row">
                  <span>Quantity:</span>
                  {isEditingOrderDetails ? (
                    <input 
                      type="number"
                      value={editedOrderData.costBreakdown.quantity}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value) || 0;
                        const unitPrice = editedOrderData.costBreakdown.unitPrice;
                        const shipping = editedOrderData.costBreakdown.shippingCost;
                        const taxes = editedOrderData.costBreakdown.taxes;
                        const fees = editedOrderData.costBreakdown.fees;
                        const totalCost = (unitPrice * quantity) + shipping + taxes + fees;
                        setEditedOrderData({
                          ...editedOrderData,
                          costBreakdown: {
                            ...editedOrderData.costBreakdown,
                            quantity,
                            totalCost
                          }
                        });
                      }}
                      className="inline-edit-input-small"
                    />
                  ) : (
                    <span>{order.costBreakdown.quantity}</span>
                  )}
                </div>
                <div className="cost-row">
                  <span>Shipping:</span>
                  {isEditingOrderDetails ? (
                    <input 
                      type="number"
                      step="0.01"
                      value={editedOrderData.costBreakdown.shippingCost}
                      onChange={(e) => {
                        const shipping = parseFloat(e.target.value) || 0;
                        const unitPrice = editedOrderData.costBreakdown.unitPrice;
                        const quantity = editedOrderData.costBreakdown.quantity;
                        const taxes = editedOrderData.costBreakdown.taxes;
                        const fees = editedOrderData.costBreakdown.fees;
                        const totalCost = (unitPrice * quantity) + shipping + taxes + fees;
                        setEditedOrderData({
                          ...editedOrderData,
                          costBreakdown: {
                            ...editedOrderData.costBreakdown,
                            shippingCost: shipping,
                            totalCost
                          }
                        });
                      }}
                      className="inline-edit-input-small"
                    />
                  ) : (
                    <span>${order.costBreakdown.shippingCost.toFixed(2)}</span>
                  )}
                </div>
                <div className="cost-row">
                  <span>Taxes:</span>
                  {isEditingOrderDetails ? (
                    <input 
                      type="number"
                      step="0.01"
                      value={editedOrderData.costBreakdown.taxes}
                      onChange={(e) => {
                        const taxes = parseFloat(e.target.value) || 0;
                        const unitPrice = editedOrderData.costBreakdown.unitPrice;
                        const quantity = editedOrderData.costBreakdown.quantity;
                        const shipping = editedOrderData.costBreakdown.shippingCost;
                        const fees = editedOrderData.costBreakdown.fees;
                        const totalCost = (unitPrice * quantity) + shipping + taxes + fees;
                        setEditedOrderData({
                          ...editedOrderData,
                          costBreakdown: {
                            ...editedOrderData.costBreakdown,
                            taxes,
                            totalCost
                          }
                        });
                      }}
                      className="inline-edit-input-small"
                    />
                  ) : (
                    <span>${order.costBreakdown.taxes.toFixed(2)}</span>
                  )}
                </div>
                <div className="cost-row">
                  <span>Fees:</span>
                  {isEditingOrderDetails ? (
                    <input 
                      type="number"
                      step="0.01"
                      value={editedOrderData.costBreakdown.fees}
                      onChange={(e) => {
                        const fees = parseFloat(e.target.value) || 0;
                        const unitPrice = editedOrderData.costBreakdown.unitPrice;
                        const quantity = editedOrderData.costBreakdown.quantity;
                        const shipping = editedOrderData.costBreakdown.shippingCost;
                        const taxes = editedOrderData.costBreakdown.taxes;
                        const totalCost = (unitPrice * quantity) + shipping + taxes + fees;
                        setEditedOrderData({
                          ...editedOrderData,
                          costBreakdown: {
                            ...editedOrderData.costBreakdown,
                            fees,
                            totalCost
                          }
                        });
                      }}
                      className="inline-edit-input-small"
                    />
                  ) : (
                    <span>${order.costBreakdown.fees.toFixed(2)}</span>
                  )}
                </div>
                <div className="cost-row total">
                  <span><strong>Total:</strong></span>
                  <span><strong>${isEditingOrderDetails ? editedOrderData.costBreakdown.totalCost.toFixed(2) : order.costBreakdown.totalCost.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Project Details</h4>
              <div className="detail-grid">
                <div>
                  <strong>Urgency:</strong>
                  {isEditingOrderDetails ? (
                    <select 
                      value={editedOrderData.projectDetails.urgency}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        projectDetails: {
                          ...editedOrderData.projectDetails,
                          urgency: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    >
                      <option value="flexible">Flexible</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  ) : (
                    ` ${order.projectDetails.urgency}`
                  )}
                </div>
                <div>
                  <strong>Needed by:</strong>
                  {isEditingOrderDetails ? (
                    <input 
                      type="date"
                      value={editedOrderData.projectDetails.neededByDate?.split('T')[0] || ''}
                      onChange={(e) => setEditedOrderData({
                        ...editedOrderData,
                        projectDetails: {
                          ...editedOrderData.projectDetails,
                          neededByDate: e.target.value
                        }
                      })}
                      className="inline-edit-input"
                    />
                  ) : (
                    ` ${new Date(order.projectDetails.neededByDate).toLocaleDateString()}`
                  )}
                </div>
              </div>
              <div className="purpose">
                <strong>Purpose:</strong>
                {isEditingOrderDetails ? (
                  <textarea 
                    value={editedOrderData.projectDetails?.purpose || ''}
                    onChange={(e) => setEditedOrderData({
                      ...editedOrderData,
                      projectDetails: {
                        ...editedOrderData.projectDetails,
                        purpose: e.target.value
                      }
                    })}
                    className="inline-edit-textarea"
                    rows="4"
                  />
                ) : (
                  <p>{order.projectDetails?.purpose || 'N/A'}</p>
                )}
              </div>
            </div>

            {(order.sponsorshipInfo.canBeSponsored || order.sponsorshipInfo.sponsorshipSearchStatus !== 'not_applicable') && (
              <div className="detail-section">
                <h4>Sponsorship Information</h4>
                <p style={{color: 'var(--subtxt)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1rem'}}>
                  Determined by Technical Director during approval
                </p>
                <div className="detail-grid">
                  <div><strong>Search Status:</strong> 
                    <span className={`sponsorship-status ${order.sponsorshipInfo.sponsorshipSearchStatus || 'not_started'}`}>
                      {(order.sponsorshipInfo.sponsorshipSearchStatus || 'not_started').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  {order.sponsorshipInfo.sponsorshipSuccessful && (
                    <div><strong>Result:</strong> <span style={{color: '#28a745', fontWeight: 'bold'}}>✓ Obtained for Free!</span></div>
                  )}
                  {order.sponsorshipInfo.sponsorContactName && (
                    <>
                      <div><strong>Sponsor Contact:</strong> {order.sponsorshipInfo.sponsorContactName}</div>
                      <div><strong>Company:</strong> {order.sponsorshipInfo.sponsorCompany}</div>
                      <div><strong>Email:</strong> {order.sponsorshipInfo.sponsorContactEmail}</div>
                    </>
                  )}
                </div>
                {order.sponsorshipInfo.sponsorshipResponse && (
                  <div className="response">
                    <strong>Notes:</strong>
                    <p>{order.sponsorshipInfo.sponsorshipResponse}</p>
                  </div>
                )}
              </div>
            )}

            <div className="detail-section">
              <h4>Approval Workflow</h4>
              <div className="approval-grid">
                <div className="approval-item">
                  <strong>1. Technical Director Approval:</strong>
                  <span className={`approval-status ${
                    order.approvalWorkflow?.technicalDirectorApproval?.status || 'pending'
                  }`}>
                    {(order.approvalWorkflow?.technicalDirectorApproval?.status || 'pending').replace(/_/g, ' ').toUpperCase()}
                  </span>
                  {order.approvalWorkflow?.technicalDirectorApproval?.approvedBy && (
                    <p className="approval-meta">By: {order.approvalWorkflow.technicalDirectorApproval.approvedBy}</p>
                  )}
                  {order.approvalWorkflow?.technicalDirectorApproval?.approvalDate && (
                    <p className="approval-meta">Date: {new Date(order.approvalWorkflow.technicalDirectorApproval.approvalDate).toLocaleString()}</p>
                  )}
                  {order.approvalWorkflow?.technicalDirectorApproval?.comments && (
                    <p className="approval-comment">💬 {order.approvalWorkflow.technicalDirectorApproval.comments}</p>
                  )}
                  {order.approvalWorkflow?.technicalDirectorApproval?.denialReason && (
                    <p className="denial-reason">❌ {order.approvalWorkflow.technicalDirectorApproval.denialReason}</p>
                  )}
                </div>
                
                <div className="approval-item">
                  <strong>2. Purchase Approval:</strong>
                  <span className={`approval-status ${
                    order.approvalWorkflow?.projectDirectorPurchaseApproval?.status || 'pending'
                  }`}>
                    {(order.approvalWorkflow?.projectDirectorPurchaseApproval?.status || 'pending').replace(/_/g, ' ').toUpperCase()}
                  </span>
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.status === 'not_required' && (
                    <p className="approval-meta">✨ {order.approvalWorkflow.projectDirectorPurchaseApproval.comments || 'Purchase approval not needed'}</p>
                  )}
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.approvedBy && (
                    <p className="approval-meta">By: {order.approvalWorkflow.projectDirectorPurchaseApproval.approvedBy}</p>
                  )}
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.approvalDate && (
                    <p className="approval-meta">Date: {new Date(order.approvalWorkflow.projectDirectorPurchaseApproval.approvalDate).toLocaleString()}</p>
                  )}
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.comments && order.approvalWorkflow.projectDirectorPurchaseApproval.status !== 'not_required' && (
                    <p className="approval-comment">💬 {order.approvalWorkflow.projectDirectorPurchaseApproval.comments}</p>
                  )}
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.denialReason && (
                    <p className="denial-reason">❌ {order.approvalWorkflow.projectDirectorPurchaseApproval.denialReason}</p>
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
            {order.status === 'pending_project_approval' && (
              <div className="detail-section next-steps">
                <h4>💰 Pending Purchase Approval</h4>
                <div className="next-steps-content">
                  <p><strong>Current Search Status:</strong> {(order.sponsorshipInfo?.sponsorshipSearchStatus || 'not_started').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.comments ? (
                    <p>{order.approvalWorkflow.projectDirectorPurchaseApproval.comments}</p>
                  ) : (
                    <p>The Technical Director has determined this material needs to be purchased. Awaiting Project Director approval for budget allocation.</p>
                  )}
                </div>
              </div>
            )}

            {order.status === 'approved' && (
              <div className="detail-section next-steps">
                <h4>✓ Order Approved - Ready to Purchase</h4>
                <div className="next-steps-content">
                  <p><strong>Expected Delivery Date:</strong> {order.deliveryInfo.expectedArrivalDate ? new Date(order.deliveryInfo.expectedArrivalDate).toLocaleDateString() : 'TBD'}</p>
                  {order.approvalWorkflow?.projectDirectorPurchaseApproval?.status === 'not_required' ? (
                    <p>✨ This order was obtained through sponsorship at no cost! A director will arrange delivery soon.</p>
                  ) : (
                    <p>This order has been approved for purchase. A director will process the purchase order soon.</p>
                  )}
                </div>
              </div>
            )}

            {(order.status === 'purchased' || order.status === 'shipped') && (
              <div className="detail-section next-steps">
                <h4>📦 Order In Transit</h4>
                <div className="next-steps-content">
                  <p><strong>Expected Delivery:</strong> {order.deliveryInfo.expectedArrivalDate ? new Date(order.deliveryInfo.expectedArrivalDate).toLocaleDateString() : 'TBD'}</p>
                  <p>Your order is on its way. You'll be notified when it arrives.</p>
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

            {/* Step 1: Technical Director - Sponsorship Search Status Update */}
            {isDirector && (order.status === 'pending_approval' || order.status === 'pending_technical_approval' || order.status === 'pending_project_approval') && (
              <div className="detail-section approval-actions">
                <h4>Step 1: Sponsorship Search Status</h4>
                {(order.sponsorshipInfo?.sponsorshipSearchStatus === 'not_applicable' || 
                  order.sponsorshipInfo?.sponsorshipSearchStatus === 'failed' ||
                  order.sponsorshipInfo?.sponsorshipSearchStatus === 'successful') ? (
                  // Collapsed/Read-only view after status is finalized
                  <div className="sponsorship-finalized">
                    <p className="approval-help-text" style={{marginBottom: '1rem'}}>
                      ✓ Sponsorship status has been set and locked. Proceed to Step 2 below to approve or deny the order.
                    </p>
                    <div className="sponsorship-summary">
                      <div className="summary-item">
                        <strong>Status:</strong>
                        <span className={`sponsorship-status ${order.sponsorshipInfo?.sponsorshipSearchStatus || 'not_started'}`}>
                          {(order.sponsorshipInfo?.sponsorshipSearchStatus || 'not_started').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      {order.sponsorshipInfo?.sponsorshipResponse && (
                        <div className="summary-item">
                          <strong>Notes:</strong>
                          <p style={{margin: '0.25rem 0 0 0', color: 'var(--subtxt)'}}>{order.sponsorshipInfo.sponsorshipResponse}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Editable view for initial sponsorship status setting
                  <>
                    <p className="approval-help-text">
                      First, update the sponsorship search status. Once set to "Not Applicable", "Failed", or "Successful", you can then approve or deny the order in Step 2 below.
                    </p>
                    <div className="approval-form">
                      <div className="form-group">
                        <label>Sponsorship Search Status *</label>
                        <select 
                          id={`sponsorship-status-${order.id}`}
                          defaultValue={order.sponsorshipInfo?.sponsorshipSearchStatus || 'in_progress'}
                        >
                          <option value="in_progress">In Progress (Currently searching)</option>
                          <option value="not_applicable">Not Applicable (Doesn't require sponsorship)</option>
                          <option value="successful">Successful (Obtained for free!)</option>
                          <option value="failed">Failed (Need to purchase)</option>
                        </select>
                        <small style={{color: 'var(--subtxt)', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block'}}>
                          • If successful, purchase approval will be skipped<br/>
                          • If failed/not applicable, order will require purchase approval<br/>
                          • Status will be locked after saving to prevent changes
                        </small>
                      </div>
                      <div className="form-group">
                        <label>Sponsorship Notes</label>
                        <textarea 
                          id={`sponsorship-notes-${order.id}`}
                          placeholder="Add notes about sponsorship search, sponsor contact info, or why it cannot be sponsored..."
                          rows="2"
                          defaultValue={order.sponsorshipInfo?.sponsorshipResponse || ''}
                        />
                      </div>
                      <div className="approval-buttons">
                        <button 
                          className="btn-primary"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const sponsorshipStatus = document.getElementById(`sponsorship-status-${order.id}`).value;
                            const sponsorshipNotes = document.getElementById(`sponsorship-notes-${order.id}`).value;
                            
                            // Confirm before locking the sponsorship status
                            const confirmed = await showConfirm(
                              'Are you sure you want to lock this sponsorship status? Once saved, it cannot be changed.',
                              'Confirm Lock Sponsorship Status'
                            );
                            if (!confirmed) return;
                            
                            await updateOrderStatus(order.id, {
                              type: 'sponsorship_status',
                              searchStatus: sponsorshipStatus
                            });
                            
                            if (sponsorshipNotes.trim()) {
                              await updateOrderStatus(order.id, {
                                type: 'sponsorship_response',
                                successful: sponsorshipStatus === 'successful',
                                response: sponsorshipNotes
                              });
                            }
                            
                            // Reload the order details to show updated status
                            const updatedOrders = orders.map(o => {
                              if (o.id === order.id) {
                                return {
                                  ...o,
                                  sponsorshipInfo: {
                                    ...o.sponsorshipInfo,
                                    sponsorshipSearchStatus: sponsorshipStatus,
                                    sponsorshipResponse: sponsorshipNotes
                                  }
                                };
                              }
                              return o;
                            });
                            const updatedOrder = updatedOrders.find(o => o.id === order.id);
                            setSelectedOrder(updatedOrder);
                          }}
                        >
                          Save & Lock Sponsorship Status
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Technical Director - Approval/Denial (only after sponsorship status is set) */}
            {isDirector && 
             (order.status === 'pending_approval' || order.status === 'pending_technical_approval') && 
             (order.sponsorshipInfo?.sponsorshipSearchStatus === 'not_applicable' || 
              order.sponsorshipInfo?.sponsorshipSearchStatus === 'failed' ||
              order.sponsorshipInfo?.sponsorshipSearchStatus === 'successful') && (
              <div className="detail-section approval-actions">
                <h4>Step 2: Technical Director Approval</h4>
                <p className="approval-help-text">
                  Sponsorship status has been set. Now you can approve or deny this order request.
                </p>
                <div className="approval-form">
                  <div className="form-group">
                    <label>Technical Director Comments / Denial Reason</label>
                    <textarea 
                      id={`tech-approval-comments-${order.id}`}
                      placeholder="Add comments for approval or reason for denial..."
                      rows="3"
                    />
                  </div>
                  <div className="approval-buttons">
                    <button 
                      className="btn-approve"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const comments = document.getElementById(`tech-approval-comments-${order.id}`).value;
                        const sponsorshipStatus = order.sponsorshipInfo?.sponsorshipSearchStatus || 'in_progress';
                        
                        await updateOrderStatus(order.id, {
                          type: 'technical_director_approval',
                          approved: true,
                          approvedBy: authService.currentUser?.email || 'tech.director@solarpack.com',
                          comments: comments || 'Approved - material needed for project',
                          sponsorshipStatus: sponsorshipStatus,
                          sponsorshipNotes: order.sponsorshipInfo?.sponsorshipResponse || ''
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
                        const comments = document.getElementById(`tech-approval-comments-${order.id}`).value;
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
                          type: 'technical_director_approval',
                          approved: false,
                          approvedBy: authService.currentUser?.email || 'tech.director@solarpack.com',
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

            {/* Purchase Approval Actions */}
            {isDirector && order.status === 'pending_project_approval' && (
              <div className="detail-section approval-actions">
                <h4>Purchase Approval (Project Director)</h4>
                <p className="approval-help-text">Sponsorship was unsuccessful. Approve purchase to spend money on this material.</p>
                <div className="approval-form">
                  <div className="form-group">
                    <label>Comments / Denial Reason</label>
                    <textarea 
                      id={`purchase-approval-comments-${order.id}`}
                      placeholder="Add budget approval comments or reason for denial..."
                      rows="3"
                    />
                  </div>
                  <div className="approval-buttons">
                    <button 
                      className="btn-approve"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const comments = document.getElementById(`purchase-approval-comments-${order.id}`).value;
                        await updateOrderStatus(order.id, {
                          type: 'purchase_approval',
                          approved: true,
                          approvedBy: authService.currentUser?.email || 'project.director@solarpack.com',
                          comments: comments || 'Budget approved - proceed with purchase'
                        });
                        setSelectedOrder(null);
                      }}
                    >
                      ✓ Approve Purchase
                    </button>
                    <button 
                      className="btn-deny"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const comments = document.getElementById(`purchase-approval-comments-${order.id}`).value;
                        if (!comments.trim()) {
                          await showError('Please provide a reason for denial', 'Denial Reason Required');
                          return;
                        }
                        const confirmed = await showConfirm(
                          'Are you sure you want to deny purchase approval? This will deny the order.',
                          'Confirm Denial'
                        );
                        if (!confirmed) return;
                        
                        await updateOrderStatus(order.id, {
                          type: 'purchase_approval',
                          approved: false,
                          approvedBy: authService.currentUser?.email || 'project.director@solarpack.com',
                          denialReason: comments
                        });
                        setSelectedOrder(null);
                      }}
                    >
                      ✗ Deny Purchase
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Mode Action Buttons */}
            {isEditingOrderDetails && (
              <div className="detail-section edit-actions">
                <div className="edit-buttons">
                  <button 
                    className="btn-save-edit"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await saveOrderEdits();
                    }}
                  >
                    ✓ Save Changes
                  </button>
                  <button 
                    className="btn-cancel-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingOrderDetails(false);
                      setEditedOrderData(null);
                    }}
                  >
                    ✗ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      );
    };
  }, [isDirector, isEditingOrderDetails, editedOrderData, updateOrderStatus, showError, showConfirm, saveOrderEdits]);

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
                      type="text"
                      value={orderFormData.materialDetails.materialLink}
                      onChange={(e) => setOrderFormData({
                        ...orderFormData,
                        materialDetails: {
                          ...orderFormData.materialDetails,
                          materialLink: e.target.value
                        }
                      })}
                      pattern=".*\..+.*"
                      title="Please enter a valid link (must contain a domain like .com, .org, etc.)"
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
                    <label>Needed By Date {orderFormData.projectDetails.urgency !== 'flexible' ? '*' : ''}</label>
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
                      required={orderFormData.projectDetails.urgency !== 'flexible'}
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
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
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
          gap: 1rem;
        }

        .order-title-section {
          flex: 1;
          min-width: 0;
        }

        .order-part-name {
          color: var(--accent);
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          letter-spacing: 0.3px;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .action-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .btn-icon {
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .btn-text {
          line-height: 1;
        }

        .approve-btn {
          background: #10b981;
          color: white;
        }

        .approve-btn:hover {
          background: #059669;
        }

        .reject-btn {
          background: #ef4444;
          color: white;
        }

        .reject-btn:hover {
          background: #dc2626;
        }

        .mark-ordered-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }

        .mark-ordered-btn:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        }

        .mark-delivered-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .mark-delivered-btn:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .approve-deny-btn {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        .approve-deny-btn:hover {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        }

        .sponsorship-btn {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
        }

        .sponsorship-btn:hover {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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

        .modal-header-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn-edit-order {
          background: #3b82f6;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .btn-edit-order:hover {
          background: #2563eb;
          transform: scale(1.05);
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

        /* Edit mode styles */
        .inline-edit-input, .inline-edit-textarea {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid #555;
          border-radius: 4px;
          color: var(--text);
          padding: 0.4rem 0.6rem;
          font-size: 0.9rem;
          width: 100%;
          margin-top: 0.25rem;
        }

        .inline-edit-input:focus, .inline-edit-textarea:focus {
          outline: none;
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.15);
        }

        .inline-edit-input-small {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid #555;
          border-radius: 4px;
          color: var(--text);
          padding: 0.3rem 0.5rem;
          font-size: 0.9rem;
          width: 120px;
        }

        .inline-edit-input-small:focus {
          outline: none;
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.15);
        }

        .inline-edit-textarea {
          min-height: 80px;
          resize: vertical;
          font-family: inherit;
        }

        .edit-actions {
          background: rgba(59, 130, 246, 0.08);
          border: 2px solid #3b82f6;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .edit-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-save-edit {
          background: #10b981;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .btn-save-edit:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
        }

        .btn-cancel-edit {
          background: #6b7280;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .btn-cancel-edit:hover {
          background: #4b5563;
          transform: translateY(-2px);
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
          background: #f59e0b;
          color: white;
        }

        .approval-status.approved {
          background: #10b981;
          color: white;
        }

        .approval-status.denied {
          background: #ef4444;
          color: white;
        }

        .approval-status.not_required {
          background: #6b7280;
          color: white;
        }

        .sponsorship-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          margin-left: 0.5rem;
        }

        .sponsorship-status.not_started {
          background: #6b7280;
          color: white;
        }

        .sponsorship-status.in_progress {
          background: #8b5cf6;
          color: white;
        }

        .sponsorship-status.successful {
          background: #10b981;
          color: white;
        }

        .sponsorship-status.failed {
          background: #ef4444;
          color: white;
        }

        .sponsorship-status.not_applicable {
          background: #4b5563;
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
          background: rgba(239, 68, 68, 0.08);
          border: 2px solid #ef4444;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .approval-help-text {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          font-style: italic;
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
          background: #10b981;
          color: white;
        }

        .btn-approve:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
        }

        .btn-deny {
          background: #ef4444;
          color: white;
        }

        .btn-deny:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
        }

        /* Purchase Modal Styles */
        .purchase-order-summary {
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
        }

        .purchase-order-summary h4 {
          color: #3b82f6;
          margin: 0 0 0.5rem 0;
        }

        .purchase-order-summary p {
          margin: 0.25rem 0;
          color: var(--text);
        }

        /* Approval Modal Styles */
        .approval-order-summary {
          background: rgba(245, 158, 11, 0.08);
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .approval-order-summary h4 {
          color: #f59e0b;
          margin: 0 0 0.5rem 0;
        }

        .approval-order-summary p {
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
          background: #6b7280;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-cancel:hover {
          background: #4b5563;
        }

        .btn-submit {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-submit:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        /* Next Steps Section */
        .next-steps {
          background: rgba(16, 185, 129, 0.08);
          border-left: 4px solid #10b981;
          padding: 1.5rem;
          border-radius: 6px;
        }

        .next-steps.denied {
          background: rgba(239, 68, 68, 0.08);
          border-left-color: #ef4444;
        }

        .next-steps h4 {
          margin: 0 0 1rem 0;
          color: #10b981;
        }

        .next-steps.denied h4 {
          color: #ef4444;
        }

        .next-steps-content p {
          margin: 0.5rem 0;
          color: var(--text);
          line-height: 1.6;
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
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
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
          <div className="stat-number">{filteredOrders.filter(o => o.status === 'pending_technical_approval' || o.status === 'pending_approval').length}</div>
          <div className="stat-label">Pending Tech Approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredOrders.filter(o => o.status === 'pending_project_approval').length}</div>
          <div className="stat-label">Pending Purchase Approval</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredOrders.filter(o => o.status === 'approved').length}</div>
          <div className="stat-label">Ready to Purchase</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredOrders.filter(o => o.status === 'shipped' || o.status === 'purchased').length}</div>
          <div className="stat-label">In Transit</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${filteredOrders.reduce((total, order) => total + (order.costBreakdown?.totalCost || 0), 0).toFixed(2)}
          </div>
          <div className="stat-label">Total Value</div>
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
            <option value="pending_technical_approval">Pending Tech Director Approval</option>
            <option value="pending_project_approval">Pending Purchase Approval</option>
            <option value="approved">Approved - Ready to Purchase</option>
            <option value="shipped">Shipped</option>
            <option value="purchased">Purchased</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="denied">Denied</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
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
        
        <div className="filter-group">
          <label className="filter-label">Orders Placed</label>
          <select 
            className="filter-select"
            value={filterTimeline}
            onChange={(e) => setFilterTimeline(e.target.value)}
          >
            {getSemesterOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value="all">All Time</option>
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
                  <span className="detail-value">{order.materialDetails?.supplier || 'N/A'}</span>
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
                <strong>Purpose:</strong> {order.projectDetails?.purpose ? order.projectDetails.purpose.substring(0, 150) : 'N/A'}
                {order.projectDetails?.purpose && order.projectDetails.purpose.length > 150 && '...'}
              </div>

              {isDirector && (
                <div className="order-actions" onClick={(e) => e.stopPropagation()}>
                  {(order.status === 'pending_approval' || order.status === 'pending_technical_approval') && (
                    <button 
                      className="action-btn approve-deny-btn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <span className="btn-text">Tech Approve/Deny</span>
                    </button>
                  )}

                  {order.status === 'pending_project_approval' && (
                    <button 
                      className="action-btn approve-deny-btn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <span className="btn-text">Purchase Approve/Deny</span>
                    </button>
                  )}

                  {order.status === 'approved' && (
                    <button 
                      className="action-btn mark-ordered-btn"
                      onClick={() => {
                        setPurchasingOrder(order);
                        setShowPurchaseModal(true);
                      }}
                    >
                      <span className="btn-text">Mark as Purchased</span>
                    </button>
                  )}
                  
                  {(order.status === 'purchased' || order.status === 'shipped') && (
                    <button 
                      className="action-btn mark-delivered-btn"
                      onClick={() => updateOrderStatus(order.id, {
                        type: 'delivery',
                        confirmedBy: authService.currentUser?.level || 'director',
                        notes: 'Delivered to subteam'
                      })}
                    >
                      <span className="btn-icon">✓</span>
                      <span className="btn-text">Mark as Delivered</span>
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
                    Confirm Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && approvingOrder && (
        <div className="modal-overlay" onClick={() => setShowApprovalModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Approve or Deny Order</h3>
              <button className="modal-close" onClick={() => setShowApprovalModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="approval-order-summary">
                <h4>{approvingOrder.materialDetails.materialName}</h4>
                <p><strong>Subteam:</strong> {approvingOrder.submissionDetails.subteam}</p>
                <p><strong>Submitter:</strong> {approvingOrder.submissionDetails.submitterName}</p>
                <p><strong>Total Cost:</strong> ${approvingOrder.costBreakdown.totalCost.toFixed(2)}</p>
                <p><strong>Purpose:</strong> {approvingOrder.projectDetails?.purpose || 'N/A'}</p>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label>Comments / Reason</label>
                  <textarea 
                    value={approvalComments}
                    onChange={(e) => setApprovalComments(e.target.value)}
                    placeholder="Add comments for approval or reason for denial..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setShowApprovalModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="btn-deny"
                  onClick={async () => {
                    if (!approvalComments.trim()) {
                      await showError('Please provide a reason for denial', 'Denial Reason Required');
                      return;
                    }
                    const confirmed = await showConfirm(
                      'Are you sure you want to deny this order? This action will notify the submitter.',
                      'Confirm Denial'
                    );
                    if (!confirmed) return;
                    
                    await updateOrderStatus(approvingOrder.id, {
                      type: 'director_approval',
                      approved: false,
                      approvedBy: authService.currentUser?.level || 'director',
                      denialReason: approvalComments
                    });
                    setShowApprovalModal(false);
                    setApprovingOrder(null);
                    setApprovalComments('');
                  }}
                >
                  ✗ Deny Order
                </button>
                <button 
                  type="button"
                  className="btn-approve"
                  onClick={async () => {
                    await updateOrderStatus(approvingOrder.id, {
                      type: 'director_approval',
                      approved: true,
                      approvedBy: authService.currentUser?.level || 'director',
                      comments: approvalComments || 'Approved by director'
                    });
                    setShowApprovalModal(false);
                    setApprovingOrder(null);
                    setApprovalComments('');
                  }}
                >
                  ✓ Approve Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

OrderManager.displayName = 'OrderManager';

export default OrderManager;
