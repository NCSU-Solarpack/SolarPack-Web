import { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrderManager.css';

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
  // Download receipts modal (director-only UI)
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadStartDate, setDownloadStartDate] = useState('');
  const [downloadEndDate, setDownloadEndDate] = useState('');
  const [downloadOption, setDownloadOption] = useState('all'); // 'all' | 'receipts'
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvingOrder, setApprovingOrder] = useState(null);
  const [approvalComments, setApprovalComments] = useState('');
  const [purchaseFormData, setPurchaseFormData] = useState({
    expectedDeliveryDate: '',
    deliveryNotes: '',
    purchaseOrderNumber: '',
    trackingNumber: ''
  });
  // Toggle for Purchase Order info tooltip
  const [showPoInfo, setShowPoInfo] = useState(false);
  // Receipt drag & drop state (PDF only)
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptFileName, setReceiptFileName] = useState(null);
  const [isReceiptDragOver, setIsReceiptDragOver] = useState(false);
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

  // Track sponsorship select values per-order while editing so we can disable the save button
  const [sponsorshipSelections, setSponsorshipSelections] = useState({});

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

  // Handle confirm of download modal (download receipts or complete order packages as a zip)
  const handleDownloadSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();

    // Basic validation
    if (!downloadStartDate || !downloadEndDate) {
      await showError('Please select a start and end date for the download range.', 'Missing Dates');
      return;
    }

    const start = new Date(downloadStartDate);
    const end = new Date(downloadEndDate);
    end.setHours(23, 59, 59, 999); // Include the entire end day
    
    if (start > end) {
      await showError('Start date must be before the end date.', 'Invalid Range');
      return;
    }

    try {
      // Show loading state
      startSaving();
      
      // Fetch orders in the date range
      const data = await supabaseService.getOrders();
      const ordersInRange = data.orders.filter(order => {
        const orderDate = new Date(order.submissionTimestamp);
        return orderDate >= start && orderDate <= end;
      });
      
      if (ordersInRange.length === 0) {
        await showError('No orders found in the selected date range.', 'No Orders Found');
        finishSaving();
        return;
      }

      // Create zip file
      const zip = new JSZip();
      const ordersFolder = zip.folder('order-packages');
      
      let processedCount = 0;
      const errors = [];

      // Process each order
      for (const order of ordersInRange) {
        try {
          // Generate order details PDF
          const orderPdf = await generateOrderDetailsPDF(order);
          
          let finalPdfBlob;
          let fileName;

          if (downloadOption === 'all') {
            // For complete package, try to include receipt if available
            const receiptInfo = order.documentation?.receiptInvoice;
            if (receiptInfo?.fileName) {
              try {
                // Download receipt
                const receiptFileName = supabaseService.getFileNameFromStorageUrl(receiptInfo.fileName);
                if (receiptFileName) {
                  const receiptBlob = await supabaseService.downloadFileFromStorage('order-receipts', receiptFileName);
                  
                  // For now, we'll include both files separately since merging is complex
                  // In production, you'd merge them using a PDF library
                  const orderPdfBlob = orderPdf.output('blob');
                  
                  // Create a folder for this order
                  const orderFolder = ordersFolder.folder(`order_${order.id}`);
                  orderFolder.file(`order_details_${order.id}.pdf`, orderPdfBlob);
                  orderFolder.file(`receipt_${order.id}.pdf`, receiptBlob);
                  
                  processedCount += 2; // Count both files
                }
              } catch (receiptError) {
                console.warn(`Could not download receipt for order ${order.id}:`, receiptError);
                // Continue with just order details
                const orderPdfBlob = orderPdf.output('blob');
                ordersFolder.file(`order_${order.id}_details_only.pdf`, orderPdfBlob);
                processedCount++;
                errors.push(`Order ${order.id}: Receipt unavailable - included order details only`);
              }
            } else {
              // No receipt, just include order details
              const orderPdfBlob = orderPdf.output('blob');
              ordersFolder.file(`order_${order.id}_details_only.pdf`, orderPdfBlob);
              processedCount++;
            }
          } else {
            // Receipts only option (existing functionality)
            const receiptInfo = order.documentation?.receiptInvoice;
            if (!receiptInfo?.fileName) {
              console.warn(`Order ${order.id} has no receipt file`);
              continue;
            }

            const fileName = supabaseService.getFileNameFromStorageUrl(receiptInfo.fileName);
            if (!fileName) {
              errors.push(`Order ${order.id}: Could not extract filename from URL`);
              continue;
            }

            const safeMaterialName = (order.materialDetails?.materialName || 'material')
              .replace(/[^a-z0-9]/gi, '_')
              .toLowerCase()
              .substring(0, 50);
            
            const fileExtension = fileName.includes('.') ? fileName.split('.').pop() : 'pdf';
            const meaningfulFileName = `order_${order.id}_${safeMaterialName}.${fileExtension}`;

            const fileBlob = await supabaseService.downloadFileFromStorage('order-receipts', fileName);
            ordersFolder.file(meaningfulFileName, fileBlob);
            processedCount++;
          }
          
        } catch (error) {
          console.error(`Failed to process order ${order.id}:`, error);
          errors.push(`Order ${order.id}: ${error.message}`);
        }
      }

      if (processedCount === 0) {
        await showError(
          'No files could be processed. Please check if the orders exist and are accessible.',
          'Download Failed'
        );
        finishSaving();
        return;
      }

      // Generate and download zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create filename with date range
      const startStr = start.toISOString().split('T')[0];
      const endStr = end.toISOString().split('T')[0];
      const optionLabel = downloadOption === 'all' ? 'complete-packages' : 'receipts-only';
      const zipFileName = `solarpack-orders_${optionLabel}_${startStr}_to_${endStr}.zip`;
      
      // Trigger download
      saveAs(zipBlob, zipFileName);

      // Show success message with summary
      let successMessage = `Successfully processed ${processedCount} file${processedCount !== 1 ? 's' : ''}`;
      if (downloadOption === 'all') {
        successMessage += ` (complete order packages with details and receipts)`;
      } else {
        successMessage += ` (receipt files only)`;
      }
      
      if (errors.length > 0) {
        successMessage += ` (${errors.length} error${errors.length !== 1 ? 's' : ''} - check console for details)`;
        console.warn('Errors during order package download:', errors);
      }

      await showSuccess(successMessage);
      
      // Reset modal state
      setShowDownloadModal(false);
      setDownloadStartDate('');
      setDownloadEndDate('');
      setDownloadOption('all');
      
      finishSaving();
      
    } catch (error) {
      console.error('Error downloading order packages:', error);
      finishSaving();
      await showError(`Failed to download order packages: ${error.message}`, 'Download Error');
    }
  };

  // Download a receipt file (tries fetch -> blob download; falls back to opening URL)
  const downloadReceipt = async (fileUrl, suggestedName) => {
    if (!fileUrl) {
      await showError('No receipt file available to download', 'Download Error');
      return;
    }

    try {
      // Try fetching the file and force a download via blob (more reliable for cross-origin)
      const resp = await fetch(fileUrl);
      if (!resp.ok) throw new Error('Failed to fetch file');
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = suggestedName || (fileUrl.split('/').pop() || 'receipt.pdf');
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // If fetching fails (CORS or other), open the URL in a new tab as fallback
      try {
        window.open(fileUrl, '_blank');
      } catch (e) {
        await showError('Unable to download or open receipt file', 'Download Error');
      }
    }
  };

  // Add PDF generation utilities
  // Generate an order details PDF using jsPDF
  const generateOrderDetailsPDF = async (order) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let yPosition = 20;

    // Add header
    pdf.setFontSize(20);
    pdf.setTextColor(220, 38, 38); // Solarpack red
    pdf.text('SOLARPACK ORDER DETAILS', 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Order ID and basic info
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Order ID: ${order.id}`, 20, yPosition);
    pdf.text(`Submitted: ${new Date(order.submissionTimestamp).toLocaleDateString()}`, 150, yPosition);
    yPosition += 10;

    // Material Details Section
    pdf.setFontSize(14);
    pdf.setTextColor(220, 38, 38);
    pdf.text('MATERIAL DETAILS', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Material: ${order.materialDetails.materialName}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Supplier: ${order.materialDetails.supplier || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Link: ${order.materialDetails.materialLink || 'N/A'}`, 20, yPosition);
    yPosition += 10;

    // Specifications (with word wrap)
    const specs = order.materialDetails.specifications || 'No specifications provided';
    const splitSpecs = pdf.splitTextToSize(`Specifications: ${specs}`, 170);
    pdf.text(splitSpecs, 20, yPosition);
    yPosition += (splitSpecs.length * 5) + 10;

    // Cost Breakdown Section
    pdf.setFontSize(14);
    pdf.setTextColor(220, 38, 38);
    pdf.text('COST BREAKDOWN', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Unit Price: $${(order.costBreakdown.unitPrice || 0).toFixed(2)}`, 20, yPosition);
    pdf.text(`Quantity: ${order.costBreakdown.quantity || 0}`, 100, yPosition);
    yPosition += 6;
    pdf.text(`Shipping: $${(order.costBreakdown.shippingCost || 0).toFixed(2)}`, 20, yPosition);
    pdf.text(`Taxes: $${(order.costBreakdown.taxes || 0).toFixed(2)}`, 100, yPosition);
    yPosition += 6;
    pdf.text(`Fees: $${(order.costBreakdown.fees || 0).toFixed(2)}`, 20, yPosition);
    yPosition += 8;

    // Total Cost
    pdf.setFontSize(12);
    pdf.setTextColor(220, 38, 38);
    pdf.text(`TOTAL COST: $${(order.costBreakdown.totalCost || 0).toFixed(2)}`, 20, yPosition);
    yPosition += 15;

    // Project Details Section
    pdf.setFontSize(14);
    pdf.text('PROJECT DETAILS', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Subteam: ${order.submissionDetails.subteam || 'N/A'}`, 20, yPosition);
    pdf.text(`Urgency: ${order.projectDetails.urgency || 'N/A'}`, 100, yPosition);
    yPosition += 6;
    pdf.text(`Submitter: ${order.submissionDetails.submitterName || 'N/A'}`, 20, yPosition);
    pdf.text(`Email: ${order.submissionDetails.submitterEmail || 'N/A'}`, 100, yPosition);
    yPosition += 10;

    // Purpose
    const purpose = order.projectDetails.purpose || 'No purpose provided';
    const splitPurpose = pdf.splitTextToSize(`Purpose: ${purpose}`, 170);
    pdf.text(splitPurpose, 20, yPosition);
    yPosition += (splitPurpose.length * 5) + 10;

    // Approval Workflow Section
    pdf.setFontSize(14);
    pdf.setTextColor(220, 38, 38);
    pdf.text('APPROVAL WORKFLOW', 20, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    
    // Technical Director Approval
    const techApproval = order.approvalWorkflow?.technicalDirectorApproval || { status: 'pending' };
    pdf.text(`Technical Director: ${techApproval.status?.toUpperCase() || 'PENDING'}`, 20, yPosition);
    yPosition += 6;
    if (techApproval.approvedBy) {
      pdf.text(`Approved by: ${techApproval.approvedBy}`, 30, yPosition);
      yPosition += 6;
    }
    if (techApproval.comments) {
      const techComments = pdf.splitTextToSize(`Comments: ${techApproval.comments}`, 160);
      pdf.text(techComments, 30, yPosition);
      yPosition += (techComments.length * 5) + 6;
    }

    // Project Director Approval
    const projectApproval = order.approvalWorkflow?.projectDirectorPurchaseApproval || { status: 'pending' };
    pdf.text(`Project Director: ${projectApproval.status?.toUpperCase() || 'PENDING'}`, 20, yPosition);
    yPosition += 6;
    if (projectApproval.approvedBy) {
      pdf.text(`Approved by: ${projectApproval.approvedBy}`, 30, yPosition);
      yPosition += 6;
    }
    if (projectApproval.comments) {
      const projectComments = pdf.splitTextToSize(`Comments: ${projectApproval.comments}`, 160);
      pdf.text(projectComments, 30, yPosition);
      yPosition += (projectComments.length * 5) + 6;
    }

    // Sponsorship Info
    const sponsorshipInfo = order.sponsorshipInfo || {};
    if (sponsorshipInfo.canBeSponsored || sponsorshipInfo.sponsorshipSearchStatus !== 'not_applicable') {
      pdf.setFontSize(14);
      pdf.setTextColor(220, 38, 38);
      pdf.text('SPONSORSHIP INFORMATION', 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Status: ${sponsorshipInfo.sponsorshipSearchStatus || 'N/A'}`, 20, yPosition);
      yPosition += 6;
      if (sponsorshipInfo.sponsorshipSuccessful) {
        pdf.setTextColor(0, 128, 0);
        pdf.text('✓ OBTAINED THROUGH SPONSORSHIP', 20, yPosition);
        pdf.setTextColor(0, 0, 0);
        yPosition += 6;
      }
    }

    return pdf;
  };

  // Function to merge order PDF with receipt
  const mergeOrderWithReceipt = async (orderPdf, receiptBlob) => {
    // For now, we'll create separate files since PDF merging is complex
    // In a production environment, you'd use a PDF merging library like pdf-lib
    return {
      orderPdf,
      receiptBlob,
      hasReceipt: true
    };
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
        // Merge receipt metadata if provided so we don't overwrite previously-saved receipt info
        if (statusUpdate.receiptInfo) {
          updatedOrder.documentation = updatedOrder.documentation || {};
          updatedOrder.documentation.receiptInvoice = {
            uploaded: true,
            fileName: statusUpdate.receiptInfo.fileName || (updatedOrder.documentation?.receiptInvoice?.fileName || ''),
            uploadDate: statusUpdate.receiptInfo.uploadDate || (updatedOrder.documentation?.receiptInvoice?.uploadDate || now),
            uploadedBy: statusUpdate.receiptInfo.uploadedBy || (updatedOrder.documentation?.receiptInvoice?.uploadedBy || '')
          };
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
    // Prevent saving a "needed by" date in the past
    if (editedOrderData.projectDetails?.neededByDate && isDateInPast(editedOrderData.projectDetails.neededByDate)) {
      await showError('Needed by date cannot be in the past', 'Invalid Date');
      return;
    }

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
    // Validate needed-by date before submitting
    const neededByInput = orderFormData.projectDetails?.neededByDate;
    if (neededByInput && isDateInPast(neededByInput)) {
      await showError('Needed by date cannot be in the past', 'Invalid Date');
      return;
    }
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

  // Receipt handlers for purchase modal (PDF only)
  const handleReceiptSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      await showError('Please upload a PDF receipt.', 'Invalid File Type');
      return;
    }

    // Validate file size (max 1MB)
    const maxSize = 1 * 1024 * 1024;
    if (file.size > maxSize) {
      await showError('Maximum file size is 1MB. Please choose a smaller file.', 'File Too Large');
      return;
    }

    setReceiptFile(file);
    setReceiptFileName(file.name || 'receipt.pdf');
    setPurchaseFormData({ ...purchaseFormData, receiptPdf: file });
  };

  const handleReceiptDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsReceiptDragOver(false);

    const file = e.dataTransfer?.files?.[0];
    if (file) handleReceiptSelect(file);
  };

  const handleReceiptDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsReceiptDragOver(true);
  };

  const handleReceiptDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsReceiptDragOver(false);
  };

  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    setReceiptFileName(null);
    setPurchaseFormData({ ...purchaseFormData, receiptPdf: null });
  };

  // Accept optional receiptInfo so we can merge receipt metadata when marking as purchased
  const handlePurchaseSubmit = async (opts = {}) => {
    if (!purchaseFormData.expectedDeliveryDate) {
      await showError('Please enter an expected delivery date', 'Required Field');
      return;
    }

    // Build the purchase payload
    const purchasePayload = {
      type: 'purchase',
      purchaseOrderNumber: purchaseFormData.purchaseOrderNumber || `PO-${Date.now()}`,
      actualCost: purchasingOrder.costBreakdown.totalCost,
      purchasedBy: authService.currentUser?.level || 'director',
      expectedDeliveryDate: purchaseFormData.expectedDeliveryDate,
      deliveryNotes: purchaseFormData.deliveryNotes,
      trackingNumber: purchaseFormData.trackingNumber
    };

    // If the caller included receipt metadata from the storage upload, include it so
    // updateOrderStatus will merge and persist the documentation.receiptInvoice fields.
    if (opts.receiptInfo) {
      purchasePayload.receiptInfo = opts.receiptInfo;
    }

    await updateOrderStatus(purchasingOrder.id, purchasePayload);

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
  // Strict director-level check (user must be authenticated and have director level)
  const isDirectorLevel = authService.isAuthenticated() && authService.getLevel() === 'director';

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
      case 'shipped': return 'In Transit';
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

  // Format optional ISO date strings safely (returns 'N/A' when missing/invalid)
  const formatOptionalDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    const d = new Date(isoDate);
    if (isNaN(d)) return 'N/A';
    return d.toLocaleDateString();
  };

  // Checks whether a date (ISO or YYYY-MM-DD) is strictly before today
  const isDateInPast = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    if (isNaN(d)) return false;
    d.setHours(0,0,0,0);
    const today = new Date();
    today.setHours(0,0,0,0);
    return d < today;
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
                      min={new Date().toISOString().split('T')[0]}
                    />
                  ) : (
                    ` ${formatOptionalDate(order.projectDetails.neededByDate)}`
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
                <div className="detail-header">
                  <h4>Purchase Information</h4>

                  {isDirectorLevel && order.documentation?.receiptInvoice?.uploaded && order.documentation?.receiptInvoice?.fileName && (
                    <button
                      className="receipt-icon-button"
                      title="Download receipt"
                      onClick={(e) => {
                        e.stopPropagation();
                        const fileUrl = order.documentation.receiptInvoice.fileName;
                        const suggested = `order-${order.id}-receipt.pdf`;
                        downloadReceipt(fileUrl, suggested);
                      }}
                      aria-label="Download receipt"
                    >
                      {/* Simple paper/receipt SVG icon */}
                      <svg className="receipt-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 2v20l3-2 3 2 3-2 3 2 3-2V2z" />
                        <path d="M7 7h10M7 11h6" />
                      </svg>
                    </button>
                  )}
                </div>

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
                          value={sponsorshipSelections[order.id] ?? order.sponsorshipInfo?.sponsorshipSearchStatus ?? 'in_progress'}
                          onChange={(e) => setSponsorshipSelections(prev => ({ ...prev, [order.id]: e.target.value }))}
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
                          disabled={(sponsorshipSelections[order.id] ?? order.sponsorshipInfo?.sponsorshipSearchStatus ?? 'in_progress') === 'in_progress'}
                          style={{
                            opacity: ((sponsorshipSelections[order.id] ?? order.sponsorshipInfo?.sponsorshipSearchStatus ?? 'in_progress') === 'in_progress') ? 0.5 : 1,
                            cursor: ((sponsorshipSelections[order.id] ?? order.sponsorshipInfo?.sponsorshipSearchStatus ?? 'in_progress') === 'in_progress') ? 'not-allowed' : 'pointer'
                          }}
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
                          approvedBy: authService.currentUser?.email || 'Tech Director',
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
                          approvedBy: authService.currentUser?.email || 'Project Director',
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
                      min={new Date().toISOString().split('T')[0]}
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
        {/* Right-aligned actions for filters (director-only) */}
        <div className="filter-actions" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          {isDirectorLevel && (
            <button
              className="btn-secondary"
              onClick={() => setShowDownloadModal(true)}
              title="Download order receipts and data"
            >
              Download Receipts
            </button>
          )}
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

              <form onSubmit={async (e) => {
                e.preventDefault();
                // Upload receipt PDF and update order
                if (!purchaseFormData.receiptPdf) {
                  alert('Please upload a PDF receipt.');
                  return;
                }
                try {
                  const userEmail = authService.currentUser?.email || 'unknown';
                  // Upload receipt and get the updated order object from DB (application format)
                  const updatedOrderFromDB = await supabaseService.uploadOrderReceipt(
                    purchaseFormData.receiptPdf,
                    purchasingOrder.id,
                    userEmail
                  );

                  // Replace the local order with the DB truth returned from the service
                  const updatedOrders = orders.map(o => o.id === purchasingOrder.id ? updatedOrderFromDB : o);
                  setOrders(updatedOrders);
                  setDisplayedData({ orders: updatedOrders });

                  // Extract receipt metadata from the DB response and pass to purchase handler
                  const receiptInvoice = updatedOrderFromDB?.documentation?.receiptInvoice || {};
                  const receiptInfo = {
                    fileName: receiptInvoice.fileName || '',
                    uploadDate: receiptInvoice.uploadDate || new Date().toISOString(),
                    uploadedBy: receiptInvoice.uploadedBy || userEmail
                  };

                  // Continue with purchase logic (update order status, etc.) and wait for it to finish
                  await handlePurchaseSubmit({ receiptInfo });
                } catch (err) {
                  alert('Failed to upload receipt: ' + err.message);
                }
              }}>
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

                  <div className="form-group" style={{ position: 'relative' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Purchase Order Number
                      <button
                        type="button"
                        aria-label="What is this?"
                        onClick={() => setShowPoInfo(!showPoInfo)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.95rem' }}
                        title="What is this?"
                      >
                        ℹ
                      </button>
                    </label>
                    <input
                      type="text"
                      value={purchasingOrder?.id ? purchasingOrder.id.toString() : ''}
                      readOnly
                      className="inline-edit-input"
                      style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text)', border: '1px solid #555', borderRadius: '4px' }}
                    />

                    {showPoInfo && (
                      <div
                        role="note"
                        className="po-info-box"
                        style={{
                          marginTop: '8px',
                          padding: '10px',
                          background: 'rgba(0,0,0,0.06)',
                          borderRadius: '6px',
                          fontSize: '0.92rem',
                          lineHeight: '1.25'
                        }}
                      >
                        <strong>Internal Order Number:</strong> This number is assigned automatically for SolarPack internal records. It links receipts and documentation to this specific SolarPack order for accounting and tracking. It is not the vendor's or merchant's order number (for example, Amazon's order number) and should not be used as the external shipment or merchant reference.
                      </div>
                    )}
                  </div>

                    <div className="form-group">
                      <label>Receipt PDF *</label>
                      <div
                        className={`image-upload-area ${receiptFile ? 'has-image' : ''}`}
                        onDrop={handleReceiptDrop}
                        onDragOver={handleReceiptDragOver}
                        onDragEnter={handleReceiptDragOver}
                        onDragLeave={handleReceiptDragLeave}
                        onClick={() => document.getElementById('receipt-file-input')?.click()}
                        style={{ cursor: 'pointer' }}
                      >
                        {receiptFile ? (
                          <div className="image-preview-container">
                            <div className="file-preview">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}>
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                              </svg>
                              <div style={{ marginLeft: 12 }}>
                                <div style={{ fontWeight: 600 }}>{receiptFileName}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{(receiptFile && (receiptFile.size / 1024 / 1024).toFixed(2)) + ' MB'}</div>
                              </div>
                            </div>

                            <button
                              className="remove-image-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveReceipt();
                              }}
                              title="Remove file"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p>Drop PDF here or click to upload</p>
                            <p className="upload-hint">PDF only • Max 1MB</p>
                          </div>
                        )}

                        <input
                          id="receipt-file-input"
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => handleReceiptSelect(e.target.files[0])}
                          style={{ display: 'none' }}
                        />
                      </div>
                      {receiptFile && (
                        <p className="upload-status">Ready to upload: {receiptFileName}</p>
                      )}
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

      {/* Download Receipts / Data Modal (Director-only UI) */}
      {showDownloadModal && (
        <div className="modal-overlay" onClick={() => setShowDownloadModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 720 }}>
            <div className="modal-header">
              <h3>Download Orders & Receipts</h3>
              <button className="modal-close" onClick={() => setShowDownloadModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="download-description">
                <p>Select a date range and choose your download option. Files will be prepared for download based on your selection.</p>
              </div>

              <form onSubmit={handleDownloadSubmit}>
                <div className="form-section">
                  <h4>Date Range</h4>
                  <div className="date-range-grid">
                    <div className="form-group">
                      <label>Start Date *</label>
                        <div className="input-with-icon" style={{ position: 'relative' }}>
                          <input 
                            type="date" 
                            value={downloadStartDate} 
                            onChange={(e) => setDownloadStartDate(e.target.value)}
                            required
                            style={{ paddingRight: '20px', background: 'linear-gradient(to right, transparent 0%, transparent 80%, white 80%, white 100%)' }}
                          />
                        </div>
                    </div>
                    <div className="form-group">
                      <label>End Date *</label>
                        <div className="input-with-icon" style={{ position: 'relative' }}>
                          <input 
                            type="date" 
                            value={downloadEndDate} 
                            onChange={(e) => setDownloadEndDate(e.target.value)}
                            required
                            style={{ paddingRight: '20px', background: 'linear-gradient(to right, transparent 0%, transparent 80%, white 80%, white 100%)' }}
                          />
                        </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Download Type</h4>
                  <div className="download-options-grid">
                    <label className={`download-option-card ${downloadOption === 'all' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="downloadOption"
                        value="all"
                        checked={downloadOption === 'all'}
                        onChange={() => setDownloadOption('all')}
                        className="sr-only"
                      />
                      <div className="option-header">
                        <div className="option-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14,2 14,8 20,8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10,9 9,9 8,9"></polyline>
                          </svg>
                        </div>
                        <div className="option-check">
                          <div className="checkmark"></div>
                        </div>
                      </div>
                      <div className="option-content">
                        <h5>Complete Order Package</h5>
                        <p>Full order details PDF with separate receipt files for comprehensive records</p>
                        <ul className="option-features">
                          <li>Order submission details</li>
                          <li>Material specifications</li>
                          <li>Cost breakdown</li>
                          <li>Approval workflow</li>
                          <li>Separate receipt files</li>
                        </ul>
                      </div>
                    </label>

                    <label className={`download-option-card ${downloadOption === 'receipts' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="downloadOption"
                        value="receipts"
                        checked={downloadOption === 'receipts'}
                        onChange={() => setDownloadOption('receipts')}
                        className="sr-only"
                      />
                      <div className="option-header">
                        <div className="option-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17,8 12,3 7,8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <div className="option-check">
                          <div className="checkmark"></div>
                        </div>
                      </div>
                      <div className="option-content">
                        <h5>Receipts Only</h5>
                        <p>Just the uploaded receipt PDFs for accounting and reimbursement purposes</p>
                        <ul className="option-features">
                          <li>Individual receipt files</li>
                          <li>Purchase documentation</li>
                          <li>Accounting records</li>
                          <li>Faster download</li>
                          <li>Smaller file size</li>
                        </ul>
                      </div>
                    </label>
                  </div>
                </div>

                {downloadStartDate && downloadEndDate && (
                  <div className="download-summary">
                    <div className="summary-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                    <div className="summary-content">
                      <strong>Ready to download</strong>
                      <span>
                        {downloadOption === 'all'
                          ? 'Complete order packages with receipts'
                          : 'Individual receipt files only'
                        } from {new Date(downloadStartDate).toLocaleDateString()} to {new Date(downloadEndDate).toLocaleDateString()}
                      </span>
                      {status === 'saving' && (
                        <div style={{marginTop: '0.5rem', fontSize: '0.8rem', color: '#3b82f6'}}>
                          Gathering receipts... This may take a moment.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowDownloadModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!downloadStartDate || !downloadEndDate || status === 'saving'}
                  >
                    {status === 'saving' ? (
                      <>
                        <span>Preparing Download...</span>
                        <div
                          className="loading-spinner"
                          style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid transparent',
                            borderTop: '2px solid currentColor',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginLeft: '8px'
                          }}
                        ></div>
                      </>
                    ) : (
                      <>
                        <span>Prepare Download</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px'}}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7,10 12,15 17,10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </>
                    )}
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
