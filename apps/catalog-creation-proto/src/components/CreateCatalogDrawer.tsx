import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { X, ChevronDown, ExternalLink } from 'lucide-react';
import { ArrowsChevronRight, ArrowsChevronUp, ArrowsChevronDown, FormattingMoveDragItem, EcommerceShoppingBag, ObjectsAirplaneFlight, ObjectsTravelCar, ObjectsEventsHoliday, ObjectsApplicationsPackage, ObjectsToolsTargeting, HumanLocationMarker, SymbolsAdditionPlus, ArrowsTransferUpload, SymbolsCheckCheckMark, SymbolsCloseCloseSmall } from '@/components/icons';
import { tokens } from '@/lib/design-tokens';

interface CreateCatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (catalogData: {
    name: string;
    catalogId: string;
    owner: string;
    catalogType: string;
  }) => void;
}

export const CreateCatalogDrawer: React.FC<CreateCatalogDrawerProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [isCatalogTypeSelectionView, setIsCatalogTypeSelectionView] = useState(false);
  const [catalogName, setCatalogName] = useState('');
  const [catalogType, setCatalogType] = useState('');
  const [catalogSubtype, setCatalogSubtype] = useState('');
  const [businessCenter, setBusinessCenter] = useState('');
  const [defaultLocation, setDefaultLocation] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState('');
  const [syncFromPartnerPlatform, setSyncFromPartnerPlatform] = useState(false);
  const [productSource, setProductSource] = useState('');
  const [isManuallyAddView, setIsManuallyAddView] = useState(false);
  const [isDataFeedView, setIsDataFeedView] = useState(false);
  const [dataFeedProductSourceType, setDataFeedProductSourceType] = useState<'existing' | 'new'>('new');
  const [dataFeedName, setDataFeedName] = useState('');
  const [scheduleInterval, setScheduleInterval] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('hourly');
  const [updateMethod, setUpdateMethod] = useState<'update' | 'replace'>('update');
  // Product type with all fields
  type Product = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    images?: Array<{ file: File; url: string; progress: number; isUploading: boolean; id?: string }>;
    videos?: Array<{ file: File; url: string; progress: number; isUploading: boolean; id?: string }>;
    // Product Info fields
    hotelId?: string;
    link?: string;
    brand?: string;
    // Location fields
    latitude?: string;
    longitude?: string;
    neighborhood?: string;
    address?: string;
    city?: string;
    country?: string;
    region?: string;
    postalCode?: string;
    secondaryAddress?: string;
    tertiaryAddress?: string;
    // Pricing fields
    basePrice?: string;
    lowestBasePrice?: string;
    salePrice?: string;
    // Additional Info fields
    category?: string;
    priority?: string;
    roomType?: string;
    loyaltyProgram?: string;
    marginLevel?: string;
    starRating?: string;
    guestRatingSystem?: string;
    numberOfRaters?: string;
    guestRatingScore?: string;
    guestRatingMaxScore?: string;
    customLabel0?: string;
    customLabel1?: string;
    customLabel2?: string;
    customLabel3?: string;
    customLabel4?: string;
    internalLabel0?: string;
    internalLabel1?: string;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'media' | 'product-info' | 'location' | 'pricing' | 'additional-info'>('media');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Helper functions to get/update product images and videos
  const getProductImages = useCallback((productId: string | null) => {
    if (!productId) return [];
    const product = products.find(p => p.id === productId);
    return product?.images || [];
  }, [products]);

  const getProductVideos = useCallback((productId: string | null) => {
    if (!productId) return [];
    const product = products.find(p => p.id === productId);
    return product?.videos || [];
  }, [products]);

  const updateProductImages = useCallback((productId: string | null, updater: (prev: Array<{ file: File; url: string; progress: number; isUploading: boolean; id?: string }>) => Array<{ file: File; url: string; progress: number; isUploading: boolean; id?: string }>) => {
    if (!productId) return;
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, images: updater(p.images || []) }
        : p
    ));
  }, []);

  const updateProductVideos = useCallback((productId: string | null, updater: (prev: Array<{ file: File; url: string; progress: number; isUploading: boolean; id?: string }>) => Array<{ file: File; url: string; progress: number; isUploading: boolean; id?: string }>) => {
    if (!productId) return;
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, videos: updater(p.videos || []) }
        : p
    ));
  }, []);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const imageUploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Refs for tab sections
  const mediaRef = useRef<HTMLDivElement>(null);
  const productInfoRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const additionalInfoRef = useRef<HTMLDivElement>(null);
  const tabContentScrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const videoUploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imageUploadIntervalRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const videoUploadIntervalRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const [uploadBackground, setUploadBackground] = useState('#FFF');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const [isCatalogTypeOpen, setIsCatalogTypeOpen] = useState(false);
  const [isCatalogSubtypeOpen, setIsCatalogSubtypeOpen] = useState(false);
  const [catalogSubtypeDropdownUp, setCatalogSubtypeDropdownUp] = useState(false);
  const [financialServicesSubtype, setFinancialServicesSubtype] = useState('');
  const [financialServicesSubtypeDropdownUp, setFinancialServicesSubtypeDropdownUp] = useState(false);
  const [autoDropdownShouldOpenUp, setAutoDropdownShouldOpenUp] = useState(false);
  const [financialServicesDropdownShouldOpenUp, setFinancialServicesDropdownShouldOpenUp] = useState(false);
  const [defaultLocationDropdownShouldOpenUp, setDefaultLocationDropdownShouldOpenUp] = useState(false);
  const [defaultCurrencyDropdownShouldOpenUp, setDefaultCurrencyDropdownShouldOpenUp] = useState(false);
  const [isBusinessCenterOpen, setIsBusinessCenterOpen] = useState(false);
  const [isDefaultLocationOpen, setIsDefaultLocationOpen] = useState(false);
  const [defaultLocationSearch, setDefaultLocationSearch] = useState('');
  const [isDefaultCurrencyOpen, setIsDefaultCurrencyOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState('');
  const [isUserPermissionsOpen, setIsUserPermissionsOpen] = useState(false);
  const [permissionLevel, setPermissionLevel] = useState('');
  const [isPermissionLevelOpen, setIsPermissionLevelOpen] = useState(false);
  const [isProductSourceOpen, setIsProductSourceOpen] = useState(false);
  const [catalogTypeDropdownUp, setCatalogTypeDropdownUp] = useState(false);
  const [productSourceDropdownUp, setProductSourceDropdownUp] = useState(false);
  const [partnerPlatform, setPartnerPlatform] = useState('');
  const [isPartnerPlatformOpen, setIsPartnerPlatformOpen] = useState(false);
  const [isShopifyConnected, setIsShopifyConnected] = useState(false);
  const [dataConnection, setDataConnection] = useState('');
  const [isDataConnectionOpen, setIsDataConnectionOpen] = useState(false);
  const [isImageUploadDropdownOpen, setIsImageUploadDropdownOpen] = useState(false);
  const [isVideoUploadDropdownOpen, setIsVideoUploadDropdownOpen] = useState(false);
  const [isMediaUploadDropdownOpen, setIsMediaUploadDropdownOpen] = useState(false);
  const [isAddFromUrlPopoverOpen, setIsAddFromUrlPopoverOpen] = useState(false);
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [collapsedCards, setCollapsedCards] = useState<Set<string>>(new Set());
  const addFromUrlPopoverRef = useRef<HTMLDivElement>(null);
  const dataConnectionRef = useRef<HTMLDivElement>(null);
  const catalogTypeRef = useRef<HTMLDivElement>(null);
  const catalogSubtypeRef = useRef<HTMLDivElement>(null);
  const catalogSubtypeDropdownRef = useRef<HTMLDivElement>(null);
  const financialServicesSubtypeRef = useRef<HTMLDivElement>(null);
  const financialServicesSubtypeDropdownRef = useRef<HTMLDivElement>(null);
  const businessCenterRef = useRef<HTMLDivElement>(null);
  const defaultLocationRef = useRef<HTMLDivElement>(null);
  const defaultLocationDropdownRef = useRef<HTMLDivElement>(null);
  const defaultCurrencyRef = useRef<HTMLDivElement>(null);
  const defaultCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const userPermissionsRef = useRef<HTMLDivElement>(null);
  const permissionLevelRef = useRef<HTMLDivElement>(null);
  const productSourceRef = useRef<HTMLDivElement>(null);
  const partnerPlatformRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    // Clear all fields
    setCatalogName('');
    setCatalogType('');
    setCatalogSubtype('');
    setFinancialServicesSubtype('');
    setBusinessCenter('');
    setDefaultLocation('');
    setDefaultCurrency('');
    setDefaultLocationSearch('');
    setUserPermissions('');
    setPermissionLevel('');
    setSyncFromPartnerPlatform(false);
    setProductSource('');
    setPartnerPlatform('');
    setIsShopifyConnected(false);
    setDataConnection('');
    setDataFeedName('');
    // Reset view
    setIsManuallyAddView(false);
    setIsDataFeedView(false);
    setDataFeedProductSourceType('new');
    setIsCatalogTypeSelectionView(false);
    setIsAddFromUrlPopoverOpen(false);
    setMediaUrlInput('');
    setProducts([]);
    setSelectedProductId(null);
    setActiveTab('product-info');
    setMainImage(null);
    // Clear uploaded files
    setUploadedFiles([]);
    // Reset upload success state
    setIsUploadSuccessful(false);
    // Reset upload state
    setIsUploading(false);
    setUploadProgress(0);
    // Clear all product images and videos
    setProducts(prev => prev.map(p => {
      // Revoke URLs for images
      if (p.images) {
        p.images.forEach(img => URL.revokeObjectURL(img.url));
      }
      // Revoke URLs for videos
      if (p.videos) {
        p.videos.forEach(vid => URL.revokeObjectURL(vid.url));
      }
      return { ...p, images: undefined, videos: undefined };
    }));
    // Clear upload timeout and interval if exists
    if (uploadTimeoutRef.current) {
      clearTimeout(uploadTimeoutRef.current);
      uploadTimeoutRef.current = null;
    }
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
    if (imageUploadTimeoutRef.current) {
      clearTimeout(imageUploadTimeoutRef.current);
      imageUploadTimeoutRef.current = null;
    }
    imageUploadIntervalRef.current.forEach(interval => clearInterval(interval));
    imageUploadIntervalRef.current.clear();
    if (videoUploadTimeoutRef.current) {
      clearTimeout(videoUploadTimeoutRef.current);
      videoUploadTimeoutRef.current = null;
    }
    videoUploadIntervalRef.current.forEach(interval => clearInterval(interval));
    videoUploadIntervalRef.current.clear();
    // Close all dropdowns
    setIsCatalogTypeOpen(false);
    setIsBusinessCenterOpen(false);
    setIsDefaultLocationOpen(false);
    setIsDefaultCurrencyOpen(false);
    setIsProductSourceOpen(false);
    setCatalogSubtypeDropdownUp(false);
    setFinancialServicesSubtypeDropdownUp(false);
    // Call the onClose prop
    onClose();
  };

  const isCsvFile = (fileName: string): boolean => {
    return fileName.toLowerCase().endsWith('.csv');
  };

  const renderFileIcon = (fileName: string) => {
    if (isCsvFile(fileName)) {
      // Excel/CSV icon
      return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto' }}>
          <path d="M14 0H0V14H14V0Z" fill="black"/>
          <path d="M12.6389 0H1.36111C0.609391 0 0 0.609391 0 1.36111V12.6389C0 13.3906 0.609391 14 1.36111 14H12.6389C13.3906 14 14 13.3906 14 12.6389V1.36111C14 0.609391 13.3906 0 12.6389 0Z" fill="#219C26"/>
          <path d="M9.45813 10.1111C9.66507 10.1111 9.786 9.8778 9.66665 9.70875L7.69189 6.90974L9.52919 4.28737C9.64766 4.11823 9.52665 3.88574 9.32015 3.88574H8.35164C8.26604 3.88574 8.18615 3.92865 8.13887 4.00002L6.80522 6.01374L5.45306 3.99873C5.40566 3.92809 5.32621 3.88574 5.24116 3.88574H4.28945C4.0831 3.88574 3.96206 4.11791 4.08021 4.28708L5.91856 6.91908L3.94479 9.7084C3.82518 9.87745 3.94607 10.1111 4.15313 10.1111H5.10309C5.18709 10.1111 5.26566 10.0698 5.31329 10.0006L6.80522 7.83374L8.28788 10C8.33545 10.0695 8.41426 10.1111 8.49849 10.1111H9.45813Z" fill="white"/>
        </svg>
      );
    }
    // Default file icon
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto' }}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.97959 3.26524V10.7346H12.0204V3.26524H1.97959ZM1.85714 2.28564C1.38376 2.28564 1 2.6694 1 3.14279V10.8571C1 11.3305 1.38376 11.7142 1.85714 11.7142H12.1429C12.6162 11.7142 13 11.3305 13 10.8571V3.14279C13 2.6694 12.6162 2.28564 12.1429 2.28564H1.85714Z" fill="#87898B"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.50717 5.47C8.36942 5.30224 8.11701 5.28988 7.96352 5.44337L2.20348 11.2034C2.0122 11.3947 1.70208 11.3947 1.5108 11.2034C1.31953 11.0121 1.31953 10.702 1.5108 10.5107L7.27084 4.75069C7.83365 4.18789 8.75913 4.23322 9.26423 4.84834L12.7092 9.04366C12.8809 9.25272 12.8506 9.56135 12.6415 9.73302C12.4325 9.90469 12.1238 9.87438 11.9522 9.66532L8.50717 5.47Z" fill="#87898B"/>
        <path d="M5.04118 5.04075C5.04118 5.58176 4.6026 6.02034 4.06158 6.02034C3.52057 6.02034 3.08199 5.58176 3.08199 5.04075C3.08199 4.49973 3.52057 4.06115 4.06158 4.06115C4.6026 4.06115 5.04118 4.49973 5.04118 5.04075Z" fill="#87898B"/>
      </svg>
    );
  };

  const handleBack = () => {
    // If leaving manually add view, completely reset all product data
    if (isManuallyAddView) {
      // Revoke all image and video URLs for all products
      setProducts(prev => {
        prev.forEach(p => {
          if (p.images) {
            p.images.forEach(img => URL.revokeObjectURL(img.url));
          }
          if (p.videos) {
            p.videos.forEach(vid => URL.revokeObjectURL(vid.url));
          }
        });
        return [];
      });
      // Clear all product-related state
      setSelectedProductId(null);
      setActiveTab('product-info');
      setMainImage(null);
    }
    
    setIsManuallyAddView(false);
    setIsDataFeedView(false);
    setDataFeedProductSourceType('new');
    // Clear product source when going back from any product source page
      setProductSource('');
    setDataFeedName('');
    setPartnerPlatform('');
    setIsShopifyConnected(false);
    setDataConnection('');
    
    // Clear any active upload intervals
    imageUploadIntervalRef.current.forEach(interval => clearInterval(interval));
    imageUploadIntervalRef.current.clear();
    videoUploadIntervalRef.current.forEach(interval => clearInterval(interval));
    videoUploadIntervalRef.current.clear();
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: `product-${Date.now()}`,
      title: '',
      description: ''
    };
    setProducts([...products, newProduct]);
    setSelectedProductId(newProduct.id);
    // Clear main image when adding a new product
    setMainImage(null);
  };

  const initializeManuallyAddView = () => {
    setIsManuallyAddView(true);
    // Initialize with one default product if the list is empty
    if (products.length === 0) {
      const defaultProduct = {
        id: `product-${Date.now()}`,
        title: '',
        description: ''
      };
      setProducts([defaultProduct]);
      setSelectedProductId(defaultProduct.id);
    }
  };

  // Initialize products for inline manually add card (without navigating)
  const initializeManuallyAddProducts = () => {
    // Initialize with one default product if the list is empty
    if (products.length === 0) {
      const defaultProduct = {
        id: `product-${Date.now()}`,
        title: '',
        description: ''
      };
      setProducts([defaultProduct]);
      setSelectedProductId(defaultProduct.id);
    }
  };

  // Get the currently selected product - this will update automatically when products or selectedProductId changes
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return products.find(p => p.id === selectedProductId) || null;
  }, [selectedProductId, products]);

  // Auto-switch tabs based on scroll position
  useEffect(() => {
    // Work for both the full manually add view and the inline card version
    const isManuallyAddActive = isManuallyAddView || productSource === 'Manually add';
    if (!isManuallyAddActive || !selectedProductId || !tabContentScrollRef.current) return;

    const scrollContainer = tabContentScrollRef.current;
    const tabBarHeight = 54; // 36px tab + 16px padding + 2px border

    const handleScroll = () => {
      // Ignore scroll events during programmatic scrolling
      if (isProgrammaticScrollRef.current) return;

      const scrollTop = scrollContainer.scrollTop;
      const containerTop = scrollContainer.getBoundingClientRect().top;
      
      // Define sections in order from top to bottom
      const sections = [
        { ref: mediaRef, id: 'media' as const },
        { ref: productInfoRef, id: 'product-info' as const },
        { ref: locationRef, id: 'location' as const },
        { ref: pricingRef, id: 'pricing' as const },
        { ref: additionalInfoRef, id: 'additional-info' as const }
      ];

      // Find which section is currently at the top (accounting for sticky tab bar)
      let activeSectionId: typeof activeTab = 'media';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.getBoundingClientRect().top;
          const relativeTop = sectionTop - containerTop + scrollTop;
          
          if (scrollTop + tabBarHeight + 24 >= relativeTop) {
            activeSectionId = section.id;
            break;
          }
        }
      }

      // Only update if different to avoid unnecessary re-renders
      if (activeSectionId !== activeTab) {
        setActiveTab(activeSectionId);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isManuallyAddView, productSource, selectedProductId, activeTab]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown-container]')) {
        setIsImageUploadDropdownOpen(false);
        setIsVideoUploadDropdownOpen(false);
        setIsMediaUploadDropdownOpen(false);
      }
      if (addFromUrlPopoverRef.current && !addFromUrlPopoverRef.current.contains(target)) {
        setIsAddFromUrlPopoverOpen(false);
      }
      if (userPermissionsRef.current && !userPermissionsRef.current.contains(target)) {
        setIsUserPermissionsOpen(false);
      }
      if (permissionLevelRef.current && !permissionLevelRef.current.contains(target)) {
        setIsPermissionLevelOpen(false);
      }
    };

    if (isImageUploadDropdownOpen || isVideoUploadDropdownOpen || isMediaUploadDropdownOpen || isAddFromUrlPopoverOpen || isUserPermissionsOpen || isPermissionLevelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isImageUploadDropdownOpen, isVideoUploadDropdownOpen, isMediaUploadDropdownOpen, isAddFromUrlPopoverOpen, isUserPermissionsOpen, isPermissionLevelOpen]);

  // Clear search when default location dropdown closes
  useEffect(() => {
    if (!isDefaultLocationOpen) {
      setDefaultLocationSearch('');
    }
  }, [isDefaultLocationOpen]);

  // Helper function to map field names to product property names
  const getFieldKey = (fieldName: string): keyof Product => {
    const fieldMap: Record<string, keyof Product> = {
      'Hotel ID (SKU ID)': 'hotelId',
      'Hotel Name': 'title',
      'Link': 'link',
      'Brand': 'brand',
      'Description': 'description',
      'Latitude': 'latitude',
      'Longitude': 'longitude',
      'Neighborhood': 'neighborhood',
      'Address': 'address',
      'City': 'city',
      'Country': 'country',
      'Region': 'region',
      'Postal code': 'postalCode',
      'Secondary Address': 'secondaryAddress',
      'Tertiary Address': 'tertiaryAddress',
      'Base price': 'basePrice',
      'Lowest Base Price': 'lowestBasePrice',
      'Sale Price': 'salePrice',
      'Category': 'category',
      'Priority': 'priority',
      'Room Type': 'roomType',
      'Loyalty Program': 'loyaltyProgram',
      'Margin Level': 'marginLevel',
      'Star Rating': 'starRating',
      'Guest Rating System': 'guestRatingSystem',
      'Number of Raters': 'numberOfRaters',
      'Guest Rating Score': 'guestRatingScore',
      'Guest Rating Max Score': 'guestRatingMaxScore',
      'Custom Label 0': 'customLabel0',
      'Custom Label 1': 'customLabel1',
      'Custom Label 2': 'customLabel2',
      'Custom Label 3': 'customLabel3',
      'Custom Label 4': 'customLabel4',
      'Internal Label 0': 'internalLabel0',
      'Internal Label 1': 'internalLabel1',
    };
    return fieldMap[fieldName] || 'title';
  };

  // Update product in list when form fields change
  const updateProductField = React.useCallback((field: keyof Product, value: string) => {
    if (!selectedProductId) return;
    setProducts(prevProducts => {
      const updated = prevProducts.map(p =>
        p.id === selectedProductId ? { ...p, [field]: value } : p
      );
      return updated;
    });
  }, [selectedProductId]);

  // Update product image when mainImage changes
  useEffect(() => {
    if (mainImage && selectedProductId) {
      const imageUrl = URL.createObjectURL(mainImage);
      updateProductField('imageUrl', imageUrl);
    }
    // Cleanup: revoke object URL when component unmounts or image changes
    return () => {
      if (mainImage) {
        // Note: We'll handle cleanup when product is deleted or changed
      }
    };
  }, [mainImage, selectedProductId]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle file upload
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      console.log('Files selected:', files);
      // Background will remain white after upload
      setUploadBackground('#FFF');
      // Start upload simulation
      startUploadSimulation(fileArray);
    }
  };

  // Handle media file upload (images and videos)
  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && selectedProductId) {
      const fileArray = Array.from(files);
      fileArray.forEach((file, fileIndex) => {
        const url = URL.createObjectURL(file);
        const fileId = `${Date.now()}-${fileIndex}-${Math.random()}`;
        
        // Detect if file is image or video
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (isImage) {
          const newImage = { file, url, progress: 0, isUploading: true, id: fileId };
          updateProductImages(selectedProductId, (prev) => [...prev, newImage]);
          
          // Simulate upload progress
          const duration = 1000;
          const interval = 16;
          const steps = duration / interval;
          let currentStep = 0;
          
          const updateProgress = () => {
            currentStep++;
            const progress = Math.min(100, (currentStep / steps) * 100);
            const isComplete = progress >= 100;
            
            updateProductImages(selectedProductId, (prev) => {
              const imageExists = prev.some(img => img.id === fileId);
              if (!imageExists) return prev;
              
              const updated = prev.map(img => 
                img.id === fileId ? { ...img, progress: isComplete ? 100 : progress, isUploading: !isComplete } : img
              );
              
              if (isComplete && updated.length > 0 && updated[0] && !updated[0].isUploading) {
                const firstImageUrl = updated[0].url;
                setProducts(prevProducts => 
                  prevProducts.map(p => 
                    p.id === selectedProductId 
                      ? { ...p, imageUrl: firstImageUrl }
                      : p
                  )
                );
              }
              
              return updated;
            });
            
            if (!isComplete) {
              setTimeout(updateProgress, interval);
            }
          };
          
          setTimeout(updateProgress, interval);
        } else if (isVideo) {
          const newVideo = { file, url, progress: 0, isUploading: true, id: fileId };
          updateProductVideos(selectedProductId, (prev) => [...prev, newVideo]);
          
          // Simulate upload progress
          const duration = 1000;
          const interval = 16;
          const steps = duration / interval;
          let currentStep = 0;
          
          const updateProgress = () => {
            currentStep++;
            const progress = Math.min(100, (currentStep / steps) * 100);
            const isComplete = progress >= 100;
            
            updateProductVideos(selectedProductId, (prev) => {
              const videoExists = prev.some(vid => vid.id === fileId);
              if (!videoExists) return prev;
              
              return prev.map(vid => 
                vid.id === fileId ? { ...vid, progress: isComplete ? 100 : progress, isUploading: !isComplete } : vid
              );
            });
            
            if (!isComplete) {
              setTimeout(updateProgress, interval);
            }
          };
          
          setTimeout(updateProgress, interval);
        }
      });
    }
  };

  // Handle media drag and drop
  const handleMediaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setUploadBackground('#FFF');
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && selectedProductId) {
      const fileArray = Array.from(files);
      fileArray.forEach((file, fileIndex) => {
        const url = URL.createObjectURL(file);
        const fileId = `${Date.now()}-${fileIndex}-${Math.random()}`;
        
        // Detect if file is image or video
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (isImage) {
          const newImage = { file, url, progress: 0, isUploading: true, id: fileId };
          updateProductImages(selectedProductId, (prev) => [...prev, newImage]);
          
          // Simulate upload progress
          const duration = 1000;
          const interval = 16;
          const steps = duration / interval;
          let currentStep = 0;
          
          const updateProgress = () => {
            currentStep++;
            const progress = Math.min(100, (currentStep / steps) * 100);
            const isComplete = progress >= 100;
            
            updateProductImages(selectedProductId, (prev) => {
              const imageExists = prev.some(img => img.id === fileId);
              if (!imageExists) return prev;
              
              const updated = prev.map(img => 
                img.id === fileId ? { ...img, progress: isComplete ? 100 : progress, isUploading: !isComplete } : img
              );
              
              if (isComplete && updated.length > 0 && updated[0] && !updated[0].isUploading) {
                const firstImageUrl = updated[0].url;
                setProducts(prevProducts => 
                  prevProducts.map(p => 
                    p.id === selectedProductId 
                      ? { ...p, imageUrl: firstImageUrl }
                      : p
                  )
                );
              }
              
              return updated;
            });
            
            if (!isComplete) {
              setTimeout(updateProgress, interval);
            }
          };
          
          setTimeout(updateProgress, interval);
        } else if (isVideo) {
          const newVideo = { file, url, progress: 0, isUploading: true, id: fileId };
          updateProductVideos(selectedProductId, (prev) => [...prev, newVideo]);
          
          // Simulate upload progress
          const duration = 1000;
          const interval = 16;
          const steps = duration / interval;
          let currentStep = 0;
          
          const updateProgress = () => {
            currentStep++;
            const progress = Math.min(100, (currentStep / steps) * 100);
            const isComplete = progress >= 100;
            
            updateProductVideos(selectedProductId, (prev) => {
              const videoExists = prev.some(vid => vid.id === fileId);
              if (!videoExists) return prev;
              
              return prev.map(vid => 
                vid.id === fileId ? { ...vid, progress: isComplete ? 100 : progress, isUploading: !isComplete } : vid
              );
            });
            
            if (!isComplete) {
              setTimeout(updateProgress, interval);
            }
          };
          
          setTimeout(updateProgress, interval);
        }
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setUploadBackground('#9EE1DD');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setUploadBackground('#FFF');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setUploadBackground('#FFF');
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Handle file upload
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      console.log('Files dropped:', files);
      // Background will remain white after upload
      // Start upload simulation
      startUploadSimulation(fileArray);
    }
  };

  const startUploadSimulation = (files: File[]) => {
    // Reset states
    setIsUploadSuccessful(false);
    setIsUploading(true);
    setUploadProgress(0);

    // Clear any existing timeout and interval
    if (uploadTimeoutRef.current) {
      clearTimeout(uploadTimeoutRef.current);
    }
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
    }

    // Simulate progress updates
    const duration = 2500; // 2.5 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);
    let currentProgress = 0;

    uploadIntervalRef.current = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (uploadIntervalRef.current) {
          clearInterval(uploadIntervalRef.current);
          uploadIntervalRef.current = null;
        }
      }
      setUploadProgress(currentProgress);
    }, interval);

    // Complete upload after duration
    uploadTimeoutRef.current = setTimeout(() => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
        uploadIntervalRef.current = null;
      }
      setIsUploading(false);
      setIsUploadSuccessful(true);
      setUploadProgress(100);
      uploadTimeoutRef.current = null;
    }, duration);
  };

  const handleCancelUpload = () => {
    if (isUploading) {
      // Cancel upload
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
        uploadTimeoutRef.current = null;
      }
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
        uploadIntervalRef.current = null;
      }
      setIsUploading(false);
      setUploadProgress(0);
      setUploadedFiles([]);
      setIsUploadSuccessful(false);
    } else if (isUploadSuccessful) {
      // Delete file
      setUploadedFiles([]);
      setIsUploadSuccessful(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (catalogTypeRef.current && !catalogTypeRef.current.contains(event.target as Node)) {
        setIsCatalogTypeOpen(false);
      }
      if (catalogSubtypeRef.current && !catalogSubtypeRef.current.contains(event.target as Node)) {
        setIsCatalogSubtypeOpen(false);
        setCatalogSubtypeDropdownUp(false);
      }
      if (financialServicesSubtypeRef.current && !financialServicesSubtypeRef.current.contains(event.target as Node)) {
        setFinancialServicesSubtypeDropdownUp(false);
      }
      if (businessCenterRef.current && !businessCenterRef.current.contains(event.target as Node)) {
        setIsBusinessCenterOpen(false);
      }
      if (defaultLocationRef.current && !defaultLocationRef.current.contains(event.target as Node)) {
        setIsDefaultLocationOpen(false);
      }
      if (defaultCurrencyRef.current && !defaultCurrencyRef.current.contains(event.target as Node)) {
        setIsDefaultCurrencyOpen(false);
      }
      if (productSourceRef.current && !productSourceRef.current.contains(event.target as Node)) {
        setIsProductSourceOpen(false);
      }
      if (partnerPlatformRef.current && !partnerPlatformRef.current.contains(event.target as Node)) {
        setIsPartnerPlatformOpen(false);
      }
      if (dataConnectionRef.current && !dataConnectionRef.current.contains(event.target as Node)) {
        setIsDataConnectionOpen(false);
      }
    };

    if (isCatalogTypeOpen || isCatalogSubtypeOpen || isBusinessCenterOpen || isDefaultLocationOpen || isDefaultCurrencyOpen || isProductSourceOpen || isPartnerPlatformOpen || isDataConnectionOpen || financialServicesSubtypeDropdownUp) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCatalogTypeOpen, isCatalogSubtypeOpen, isBusinessCenterOpen, isDefaultLocationOpen, isDefaultCurrencyOpen, isProductSourceOpen, isPartnerPlatformOpen, isDataConnectionOpen, financialServicesSubtypeDropdownUp]);

  // Check if Auto dropdown should open upward
  useEffect(() => {
    if (catalogSubtypeDropdownUp && catalogSubtypeRef.current) {
      // Use setTimeout to ensure DOM is updated
      const timer = setTimeout(() => {
        if (catalogSubtypeRef.current) {
          const buttonRect = catalogSubtypeRef.current.getBoundingClientRect();
          const dropdownHeight = 400; // maxHeight from dropdown style
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const spaceAbove = buttonRect.top;
          
          if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            setAutoDropdownShouldOpenUp(true);
          } else {
            setAutoDropdownShouldOpenUp(false);
          }
        }
      }, 0);
      
      return () => clearTimeout(timer);
    } else {
      setAutoDropdownShouldOpenUp(false);
    }
  }, [catalogSubtypeDropdownUp]);

  // Check if Financial services dropdown should open upward
  useEffect(() => {
    if (financialServicesSubtypeDropdownUp && financialServicesSubtypeRef.current) {
      // Use setTimeout to ensure DOM is updated
      const timer = setTimeout(() => {
        if (financialServicesSubtypeRef.current) {
          const buttonRect = financialServicesSubtypeRef.current.getBoundingClientRect();
          const dropdownHeight = 400; // maxHeight from dropdown style
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const spaceAbove = buttonRect.top;
          
          if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            setFinancialServicesDropdownShouldOpenUp(true);
          } else {
            setFinancialServicesDropdownShouldOpenUp(false);
          }
        }
      }, 0);
      
      return () => clearTimeout(timer);
    } else {
      setFinancialServicesDropdownShouldOpenUp(false);
    }
  }, [financialServicesSubtypeDropdownUp]);

  // Check if Default location dropdown should open upward
  useEffect(() => {
    if (isDefaultLocationOpen && defaultLocationRef.current) {
      // Use setTimeout to ensure DOM is updated
      const timer = setTimeout(() => {
        if (defaultLocationRef.current) {
          const buttonRect = defaultLocationRef.current.getBoundingClientRect();
          const dropdownHeight = 400; // maxHeight from dropdown style
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const spaceAbove = buttonRect.top;
          
          if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            setDefaultLocationDropdownShouldOpenUp(true);
          } else {
            setDefaultLocationDropdownShouldOpenUp(false);
          }
        }
      }, 0);
      
      return () => clearTimeout(timer);
    } else {
      setDefaultLocationDropdownShouldOpenUp(false);
    }
  }, [isDefaultLocationOpen]);

  // Check if Default currency dropdown should open upward
  useEffect(() => {
    if (isDefaultCurrencyOpen && defaultCurrencyRef.current) {
      // Use setTimeout to ensure DOM is updated
      const timer = setTimeout(() => {
        if (defaultCurrencyRef.current) {
          const buttonRect = defaultCurrencyRef.current.getBoundingClientRect();
          const dropdownHeight = 400; // maxHeight from dropdown style
          const spaceBelow = window.innerHeight - buttonRect.bottom;
          const spaceAbove = buttonRect.top;
          
          if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            setDefaultCurrencyDropdownShouldOpenUp(true);
          } else {
            setDefaultCurrencyDropdownShouldOpenUp(false);
          }
        }
      }, 0);
      
      return () => clearTimeout(timer);
    } else {
      setDefaultCurrencyDropdownShouldOpenUp(false);
    }
  }, [isDefaultCurrencyOpen]);

  // Icon component for catalog types - returns SVG JSX
  const getCatalogTypeIcon = (value: string) => {
    switch (value) {
      case 'ecommerce':
        return (
          <svg width="14" height="14" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M0.669414 6.15287C0.720933 5.22552 1.48793 4.49994 2.41672 4.49994H15.9977C16.9265 4.49994 17.6935 5.22552 17.745 6.15287L18.4116 18.1529C18.4674 19.156 17.669 19.9999 16.6643 19.9999H1.75005C0.745405 19.9999 -0.0529776 19.156 0.00274993 18.1529L0.669414 6.15287ZM2.65322 6.49994L2.01433 17.9999H16.4001L15.7612 6.49994H2.65322Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.20722 2C7.27424 2 5.70724 3.567 5.70724 5.5H3.70724C3.70724 2.46244 6.16966 0 9.20722 0C12.2448 0 14.7072 2.46244 14.7072 5.5H12.7072C12.7072 3.567 11.1402 2 9.20722 2Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.20721 11.2499C11.1402 11.2499 12.7072 9.68295 12.7072 7.74995H14.7072C14.7072 10.7875 12.2448 13.2499 9.20721 13.2499C6.16965 13.2499 3.70723 10.7875 3.70723 7.74995H5.70723C5.70723 9.68295 7.27423 11.2499 9.20721 11.2499Z" fill="currentColor"/>
          </svg>
        );
      case 'auto':
        return (
          <svg width="14" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M5.30273 10.0039C6.1311 10.004 6.80273 10.6755 6.80273 11.5039C6.80273 12.3323 6.1311 13.0038 5.30273 13.0039C4.47431 13.0039 3.80273 12.3323 3.80273 11.5039C3.80273 10.6755 4.47431 10.0039 5.30273 10.0039Z" fill="currentColor"/>
            <path d="M14.334 10.0039C15.1623 10.004 15.834 10.6755 15.834 11.5039C15.834 12.3323 15.1623 13.0038 14.334 13.0039C13.5056 13.0039 12.834 12.3323 12.834 11.5039C12.834 10.6755 13.5056 10.0039 14.334 10.0039Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.5723 0.0126953C16.941 0.0728647 17.2511 0.336849 17.3652 0.702148L19.5518 7.70312L19.5859 7.85059C19.5935 7.90054 19.5977 7.95128 19.5977 8.00195L19.5918 16.6133C19.5918 17.4869 18.8834 18.1953 18.0098 18.1953C17.1361 18.1953 16.4277 17.487 16.4277 16.6133V16.0273H3.16602V16.6133C3.16602 17.4869 2.45764 18.1953 1.58398 18.1953C0.710292 18.1953 0.00195316 17.487 0.00195312 16.6133V16.0273H0L0.00195312 15.4902V14.4385H0.00585938L0.0292969 7.97949L0.0341797 7.88867C0.0427632 7.79857 0.0631667 7.70976 0.0957031 7.625L2.77734 0.641602L2.84375 0.50293C3.01987 0.195403 3.34888 6.38985e-05 3.71094 0H16.4111L16.5723 0.0126953ZM2.00781 14.0273H17.5938L17.5967 8.99902L2.02539 8.98438L2.00781 14.0273ZM2.4834 6.98438L17.2373 6.99902L15.6758 2H4.39844L2.4834 6.98438Z" fill="currentColor"/>
          </svg>
        );
      case 'media-entertainment':
        return (
          <svg width="14" height="14" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M14.3182 10.4693L10.5877 7.71324C10.0926 7.34748 9.39205 7.70092 9.39205 8.31647V13.8286C9.39205 14.4441 10.0926 14.7976 10.5877 14.4318L14.3182 11.6758C14.7239 11.376 14.7239 10.7691 14.3182 10.4693Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 2.49999C0 1.11929 1.11928 0 2.49999 0H20.4999C21.8806 0 22.9999 1.11929 22.9999 2.49999V16C22.9999 17.3807 21.8806 18.5 20.4999 18.5H2.49999C1.11928 18.5 0 17.3807 0 16V2.49999ZM2.49999 2C2.22386 2 2 2.22385 2 2.49999V16C2 16.2761 2.22385 16.5 2.49999 16.5H20.4999C20.7761 16.5 20.9999 16.2761 20.9999 16V2.49999C20.9999 2.22385 20.7761 2 20.4999 2H2.49999Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M21.2499 6.5H1.74999V4.5H21.2499V6.5Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.7581 1.83465L7.00816 6.15545L5.4977 4.84453L9.24768 0.523734L10.7581 1.83465Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18.2557 1.83464L14.5057 6.15544L12.9953 4.84452L16.7453 0.523721L18.2557 1.83464Z" fill="currentColor"/>
          </svg>
        );
      case 'destination':
        return (
          <svg width="14" height="14" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M15.4976 0.0717902C16.0104 -0.13332 16.5924 0.116079 16.7975 0.628844L18.2068 4.15174H19.9823C20.5346 4.15174 20.9823 4.59945 20.9823 5.15174V7.99909C20.9823 8.55137 20.5346 8.99909 19.9823 8.99909C18.9325 8.99909 18.135 9.66346 18.135 10.6092C18.135 11.153 18.3705 11.6852 18.7507 12.0866C19.137 12.4943 19.5998 12.6938 19.9823 12.6938C20.5346 12.6938 20.9823 13.1415 20.9823 13.6938V16.5411C20.9823 17.0934 20.5346 17.5411 19.9823 17.5411H1C0.447715 17.5411 0 17.0934 0 16.5411V13.6938C0 13.1415 0.447715 12.6938 1 12.6938C1.49881 12.6938 1.96488 12.5264 2.29321 12.2345C2.60314 11.9591 2.84735 11.5242 2.84735 10.8464C2.84735 10.1687 2.60313 9.73384 2.29319 9.45833C1.96484 9.16647 1.49877 8.99909 1 8.99909C0.447715 8.99909 0 8.55137 0 7.99909V5.15174C0 4.59945 0.447715 4.15174 1 4.15174H5.29784L15.4976 0.0717902ZM5.46777 6.15174C5.48305 6.15209 5.49836 6.15209 5.5137 6.15174H17.5071C17.5224 6.15209 17.5377 6.15209 17.5531 6.15174H18.9823V7.12297C17.502 7.48996 16.135 8.66864 16.135 10.6092C16.135 11.7263 16.6113 12.7364 17.2988 13.4621C17.7548 13.9434 18.3359 14.332 18.9823 14.5365V15.5411H2V14.5723C2.58618 14.4272 3.14875 14.15 3.62195 13.7294C4.37976 13.0557 4.84735 12.0669 4.84735 10.8464C4.84735 9.62596 4.37973 8.63713 3.62192 7.96352C3.14872 7.5429 2.58616 7.26565 2 7.12054V6.15174H5.46777ZM16.0527 4.15174H10.683L15.312 2.30012L16.0527 4.15174ZM6.07795 9.30279C6.07795 8.75051 6.52567 8.30279 7.07795 8.30279H10.0621C10.6144 8.30279 11.0621 8.75051 11.0621 9.30279C11.0621 9.85508 10.6144 10.3028 10.0621 10.3028H7.07795C6.52567 10.3028 6.07795 9.85508 6.07795 9.30279ZM6.07795 12.2871C6.07795 11.7348 6.52567 11.2871 7.07795 11.2871H14.041C14.5933 11.2871 15.041 11.7348 15.041 12.2871C15.041 12.8394 14.5933 13.2871 14.041 13.2871H7.07795C6.52567 13.2871 6.07795 12.8394 6.07795 12.2871Z" fill="currentColor"/>
          </svg>
        );
      case 'hotel':
        return (
          <svg width="14" height="14" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M20 18H0V16H1V1C1 0.44772 1.44772 0 2 0H16C16.5523 0 17 0.44772 17 1V6H19V16H20V18ZM15 16H17V8H11V16H13V10H15V16ZM15 6V2H3V16H9V6H15ZM5 8H7V10H5V8ZM5 12H7V14H5V12ZM5 4H7V6H5V4Z" fill="currentColor"/>
          </svg>
        );
      case 'flight':
        return (
          <svg width="14" height="14" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.4969 1.2018C15.625 0.441359 17.5834 -0.547961 19.5506 0.368791L19.741 0.463517L19.867 0.536759C20.1545 0.717009 20.392 0.968581 20.5565 1.26723L20.6561 1.45766C21.614 3.4332 20.6077 5.41178 19.8465 6.53676C19.18 7.52151 18.3152 8.42919 17.577 9.13539L17.5779 17.4225L17.5682 17.6217C17.5223 18.0815 17.3178 18.5139 16.9871 18.8424L16.4959 19.3297C16.0317 19.7904 15.3707 19.9959 14.7274 19.8786C14.1644 19.7758 13.6767 19.4372 13.3817 18.9557L13.2674 18.7409L11.3992 14.6491L10.1883 15.7243L10.2264 18.4645C10.2329 18.9381 10.0708 19.3973 9.77326 19.7604L9.63654 19.9098L9.12189 20.4225C8.65715 20.8848 7.99518 21.0896 7.35041 20.9713C6.70539 20.8529 6.15868 20.4263 5.88849 19.8288L5.47052 18.9049L5.05353 19.1393C4.33475 19.5429 3.44154 19.4643 2.80451 18.9411C2.16771 18.4178 1.91748 17.5574 2.17365 16.7741L2.51252 15.736L1.16193 15.1129C0.568151 14.839 0.145966 14.2918 0.0310711 13.6481C-0.0836733 13.0044 0.123411 12.3448 0.585759 11.8825L1.11603 11.3512L1.2674 11.2155C1.63337 10.9174 2.0958 10.7565 2.57209 10.7663L5.33283 10.8219L6.3797 9.6432L2.284 7.79067C1.68742 7.5207 1.26038 6.97561 1.14142 6.33168C1.02265 5.68794 1.22673 5.02635 1.68732 4.56117L2.1922 4.05141L2.33966 3.91664C2.69634 3.6221 3.14643 3.45872 3.6131 3.45863H11.9022C12.6078 2.72269 13.5133 1.86493 14.4969 1.2018ZM18.8045 2.2311C17.1269 1.3427 14.8802 3.24706 13.3709 4.81606L12.7733 5.45863H3.6131L3.10822 5.9684L9.67853 8.94106L6.21466 12.8414L2.53107 12.7663L1.99982 13.2965L4.96662 14.6657L4.07404 17.3961L6.39533 16.0924L7.71174 19.0045L8.22638 18.4918L8.1756 14.8375L12.0945 11.3571L15.0867 17.9108L15.5779 17.4235L15.577 8.2643C17.1419 6.85195 19.6889 4.3024 18.8924 2.41176L18.8045 2.2311Z" fill="currentColor"/>
          </svg>
        );
      case 'live-events':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M19.68 6.66012c-0.1025 0.09627 -0.2232 0.17116 -0.355 0.22032 -0.1318 0.04915 -0.272 0.0716 -0.4126 0.06601 -0.1405 -0.00558 -0.2785 -0.03908 -0.406 -0.09854 -0.1275 -0.05946 -0.2418 -0.14369 -0.3364 -0.24779l-1.57 -1.6c-0.2081 -0.20067 -0.3306 -0.47404 -0.3418 -0.76293 -0.0111 -0.28889 0.0898 -0.57091 0.2818 -0.78707 0.1502 -0.20462 0.3597 -0.35821 0.6 -0.44l4.77 -1.46c0.1772 -0.04815 0.3643 -0.04657 0.5407 0.00459 0.1764 0.05115 0.3353 0.1499 0.4593 0.28541 0.0999 0.08687 0.1815 0.1927 0.2401 0.31135 0.0587 0.11865 0.0932 0.24776 0.1015 0.37985 0.0084 0.13209 -0.0095 0.26452 -0.0527 0.38963 -0.0432 0.1251 -0.1108 0.24039 -0.1989 0.33917l-3.32 3.4Z" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M11 10.5302c-0.3131 -0.3349 -0.5453 -0.73704 -0.6788 -1.17562 -0.1335 -0.43858 -0.1647 -0.90191 -0.0912 -1.35442 0.1207 -0.70232 0.3609 -1.37877 0.71 -2 0.1212 -0.22153 0.1682 -0.4761 0.134 -0.72631 -0.0342 -0.2502 -0.1478 -0.48283 -0.324 -0.66369 -0.1037 -0.10924 -0.2285 -0.19622 -0.3669 -0.25566 -0.1384 -0.05944 -0.2875 -0.0901 -0.4381 -0.0901 -0.15061 0 -0.29966 0.03066 -0.43805 0.0901s-0.26324 0.14642 -0.36694 0.25566c-0.94405 0.91934 -1.59177 2.09986 -1.86001 3.39 -0.21 1.05 -1 2.48004 -2 2.49004 -0.61438 0.0033 -1.22175 0.1309 -1.78563 0.3748 -0.56387 0.244 -1.07263 0.5994 -1.49572 1.0449 -0.4231 0.4455 -0.75179 0.972 -0.96636 1.5477 -0.214574 0.5757 -0.310589 1.1888 -0.282286 1.8026 0.014508 1.6077 0.661096 3.1451 1.799996 4.28l1.08 1.12c0.53739 0.5717 1.1845 1.0294 1.90268 1.3455 0.71818 0.3161 1.49271 0.4843 2.27732 0.4945 0.60891 0.0107 1.2138 -0.1007 1.77896 -0.3276 0.56514 -0.2269 1.07914 -0.5646 1.51164 -0.9934 0.4325 -0.4288 0.7747 -0.9398 1.0065 -1.503 0.2317 -0.5632 0.3483 -1.1671 0.3429 -1.776 0 -1.11 1.2 -1.8 2.23 -1.76 0.6017 0.0488 1.2066 -0.0392 1.7695 -0.2574 0.5628 -0.2182 1.069 -0.561 1.4805 -1.0026 0.1429 -0.1528 0.2402 -0.3425 0.2808 -0.5476 0.0407 -0.2052 0.023 -0.4177 -0.0509 -0.6133 -0.0739 -0.1957 -0.2011 -0.3668 -0.3672 -0.4939 -0.1661 -0.1271 -0.3645 -0.2051 -0.5727 -0.2252 -3.24 -0.27 -3.93 -0.16 -4.8 -1.06l-1.42 -1.41Z" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m8.52 12.79 2.07 2.12" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m11.89 11.42 5.49 -5.62996" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4.92 17.06c0 0.1996 0.03828 0.3973 0.11266 0.5817 0.07437 0.1844 0.18339 0.352 0.32082 0.4931 0.13743 0.1412 0.30058 0.2531 0.48015 0.3295 0.17956 0.0764 0.37201 0.1157 0.56637 0.1157 0.19435 0 0.38681 -0.0393 0.56637 -0.1157 0.17956 -0.0764 0.34272 -0.1883 0.48015 -0.3295 0.13743 -0.1411 0.24644 -0.3087 0.32082 -0.4931S7.88 17.2596 7.88 17.06s-0.03828 -0.3972 -0.11266 -0.5816c-0.07438 -0.1845 -0.18339 -0.352 -0.32082 -0.4932 -0.13743 -0.1411 -0.30059 -0.2531 -0.48015 -0.3295 -0.17956 -0.0763 -0.37202 -0.1157 -0.56637 -0.1157 -0.19436 0 -0.38681 0.0394 -0.56637 0.1157 -0.17957 0.0764 -0.34272 0.1884 -0.48015 0.3295 -0.13743 0.1412 -0.24645 0.3087 -0.32082 0.4932 -0.07438 0.1844 -0.11266 0.382 -0.11266 0.5816Z" strokeWidth="2"></path>
          </svg>
        );
      case 'local-services':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 2.35688C6.67458 2.35688 2.35734 6.67412 2.35734 11.9997C2.35734 17.3253 6.67458 21.6425 12.0002 21.6425C17.3257 21.6425 21.643 17.3253 21.643 11.9997C21.643 11.5263 22.0267 11.1426 22.5001 11.1426C22.9735 11.1426 23.3572 11.5263 23.3572 11.9997C23.3572 18.272 18.2725 23.3568 12.0002 23.3568C5.72781 23.3568 0.643066 18.272 0.643066 11.9997C0.643066 5.72735 5.72781 0.642603 12.0002 0.642603C12.4735 0.642603 12.8573 1.02636 12.8573 1.49974C12.8573 1.97313 12.4735 2.35688 12.0002 2.35688Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 7.60686C9.57406 7.60686 7.60732 9.5736 7.60732 11.9997C7.60732 14.4258 9.57406 16.3925 12.0002 16.3925C14.4263 16.3925 16.393 14.4258 16.393 11.9997C16.393 11.5263 16.7767 11.1426 17.2501 11.1426C17.7235 11.1426 18.1073 11.5263 18.1073 11.9997C18.1073 15.3726 15.373 18.1068 12.0002 18.1068C8.62729 18.1068 5.89304 15.3726 5.89304 11.9997C5.89304 8.62683 8.62729 5.89258 12.0002 5.89258C12.4735 5.89258 12.8573 6.27633 12.8573 6.74972C12.8573 7.2231 12.4735 7.60686 12.0002 7.60686Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.3277 0.707849C19.648 0.840518 19.8568 1.15306 19.8568 1.49974V4.14262H22.4997C22.8464 4.14262 23.1589 4.35145 23.2916 4.67174C23.4242 4.99204 23.3509 5.36071 23.1058 5.60585L19.6058 9.10586C19.445 9.26661 19.227 9.35691 18.9997 9.35691H15.4997C15.0263 9.35691 14.6425 8.97316 14.6425 8.49977V4.99976C14.6425 4.77243 14.7328 4.55441 14.8936 4.39367L18.3936 0.893653C18.6387 0.648513 19.0074 0.57518 19.3277 0.707849ZM18.1425 3.56906L16.3568 5.3548V7.64263L18.6446 7.64263L20.4304 5.8569L18.9997 5.8569C18.5263 5.8569 18.1425 5.47314 18.1425 4.99976V3.56906Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.1063 7.89374C16.441 8.22848 16.441 8.77119 16.1063 9.10592L12.6062 12.6059C12.2715 12.9407 11.7288 12.9407 11.3941 12.6059C11.0593 12.2712 11.0593 11.7285 11.3941 11.3938L14.8941 7.89374C15.2288 7.55901 15.7715 7.55901 16.1063 7.89374Z" fill="currentColor"/>
          </svg>
        );
      case 'real-estate':
        return (
          <svg width="14" height="14" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M15.9999 7.98419L8.99996 2.15086L2 7.98418L2 17.0474H15.9999V7.98419ZM17.9999 7.75C17.9999 7.30483 17.8022 6.88266 17.4602 6.59767L9.96023 0.347668C9.40397 -0.11589 8.59595 -0.115889 8.03968 0.347669L0.539717 6.59767C0.197731 6.88266 4.47717e-07 7.30483 4.28258e-07 7.74999L0 17.5474C-3.62113e-08 18.3759 0.671568 19.0474 1.49999 19.0474H16.4999C17.3283 19.0474 17.9999 18.3759 17.9999 17.5474V7.75Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.81835 14.6675C4.81835 14.1152 5.26606 13.6675 5.81835 13.6675H12.1823C12.7346 13.6675 13.1823 14.1152 13.1823 14.6675C13.1823 15.2197 12.7346 15.6675 12.1823 15.6675H5.81835C5.26606 15.6675 4.81835 15.2197 4.81835 14.6675Z" fill="currentColor"/>
          </svg>
        );
      case 'financial-services':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13.574 12.75h-2.033c-0.3116 0.0002 -0.6134 0.1088 -0.8536 0.3072 -0.2402 0.1984 -0.404 0.4742 -0.4631 0.7801 -0.0591 0.3059 -0.0099 0.6229 0.1391 0.8965 0.149 0.2736 0.3886 0.4869 0.6776 0.6032l2.064 0.826c0.289 0.1163 0.5286 0.3296 0.6776 0.6032 0.149 0.2736 0.1982 0.5906 0.1391 0.8965 -0.0591 0.3059 -0.2229 0.5817 -0.4631 0.7801 -0.2402 0.1984 -0.542 0.307 -0.8536 0.3072h-2.031" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.074 12.75V12" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.074 19.5v-0.75" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.82401 8.25H17.324" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m15.63 5.03592 1.438 -2.876c0.0703 -0.14076 0.0945 -0.30006 0.0692 -0.45534 -0.0252 -0.15529 -0.0987 -0.2987 -0.2099 -0.40994 -0.1113 -0.11125 -0.2547 -0.18469 -0.41 -0.20995 -0.1552 -0.02525 -0.3145 -0.00103 -0.4553 0.06923l-1.9 0.948c-0.1635 0.0816 -0.3511 0.10073 -0.5277 0.05377 -0.1766 -0.04695 -0.33 -0.15675 -0.4313 -0.30877l-0.503 -0.763c-0.0685 -0.10272 -0.1613 -0.186942 -0.2701 -0.245192C12.321 0.780478 12.1995 0.75 12.076 0.75s-0.245 0.030478 -0.3539 0.088728c-0.1088 0.05825 -0.2016 0.142472 -0.2701 0.245192l-0.509 0.763c-0.1012 0.15219 -0.2546 0.26213 -0.4312 0.3091 -0.1767 0.04696 -0.3644 0.02772 -0.52781 -0.0541l-1.897 -0.948c-0.1408 -0.06993 -0.3 -0.09391 -0.45516 -0.06856 -0.15515 0.02535 -0.29844 0.09876 -0.40966 0.20987 -0.11123 0.11111 -0.18478 0.25433 -0.21028 0.40946 -0.02551 0.15513 -0.00169 0.31435 0.0681 0.45523l1.41 2.82" strokeWidth="2"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.237 10.5 -2.76 3.2c-0.6754 0.8779 -1.09149 1.9274 -1.20116 3.0297 -0.10967 1.1022 0.09145 2.2131 0.5806 3.2069 0.48916 0.9938 1.24679 1.8308 2.18711 2.4162 0.94033 0.5854 2.02578 0.8959 3.13345 0.8962h5.79c1.1077 -0.0003 2.1931 -0.3108 3.1334 -0.8962 0.9404 -0.5854 1.698 -1.4224 2.1871 -2.4162 0.4892 -0.9938 0.6903 -2.1047 0.5807 -3.2069 -0.1097 -1.1023 -0.5258 -2.1518 -1.2012 -3.0297l-2.76 -3.2" strokeWidth="2"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const catalogTypeOptions = [
    { value: 'ecommerce', title: 'Ecommerce', description: 'Products that are sold online', hasSubcategories: false },
    { value: 'auto', title: 'Auto', description: 'For automotive', hasSubcategories: true },
    { value: 'media-entertainment', title: 'Media and entertainment', description: 'From streaming services', hasSubcategories: false },
    { value: 'destination', title: 'Destination', description: 'Online bookings for tours, tickets, and activites', hasSubcategories: false },
    { value: 'hotel', title: 'Hotels', description: 'Hotel reservations', hasSubcategories: false },
    { value: 'flight', title: 'Flights', description: 'Flight bookings and tickets', hasSubcategories: false },
    { value: 'live-events', title: 'Live events', description: 'For concerts and other live events', hasSubcategories: false },
    { value: 'local-services', title: 'Local services', description: 'For services found locally near customers', hasSubcategories: false },
    { value: 'real-estate', title: 'Real estate', description: 'For home rentals or purchases', hasSubcategories: false },
    { value: 'financial-services', title: 'Financial services', description: 'For financial services', hasSubcategories: true }
  ];

  const catalogSubtypeOptions = [
    { value: 'inventory', title: 'Inventory', description: 'Display specific information about the vehicle' },
    { value: 'model', title: 'Model', description: 'Display auto make and model' }
  ];

  const financialServicesSubtypeOptions = [
    { value: 'loan', title: 'Loan' },
    { value: 'brokerage-trading', title: 'Brokerage & Trading' },
    { value: 'insurance', title: 'Insurance' },
    { value: 'credit', title: 'Credit' },
    { value: 'non-credit', title: 'Non-Credit' }
  ];

  // Comprehensive list of all countries
  const allCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe'
  ];

  // Country to currency mapping - comprehensive list
  const countryToCurrency: Record<string, string> = {
    'Afghanistan': 'AFN',
    'Albania': 'ALL',
    'Algeria': 'DZD',
    'Andorra': 'EUR',
    'Angola': 'AOA',
    'Antigua and Barbuda': 'XCD',
    'Argentina': 'ARS',
    'Armenia': 'AMD',
    'Australia': 'AUD',
    'Austria': 'EUR',
    'Azerbaijan': 'AZN',
    'Bahamas': 'BSD',
    'Bahrain': 'BHD',
    'Bangladesh': 'BDT',
    'Barbados': 'BBD',
    'Belarus': 'BYN',
    'Belgium': 'EUR',
    'Belize': 'BZD',
    'Benin': 'XOF',
    'Bhutan': 'BTN',
    'Bolivia': 'BOB',
    'Bosnia and Herzegovina': 'BAM',
    'Botswana': 'BWP',
    'Brazil': 'BRL',
    'Brunei': 'BND',
    'Bulgaria': 'BGN',
    'Burkina Faso': 'XOF',
    'Burundi': 'BIF',
    'Cabo Verde': 'CVE',
    'Cambodia': 'KHR',
    'Cameroon': 'XAF',
    'Canada': 'CAD',
    'Central African Republic': 'XAF',
    'Chad': 'XAF',
    'Chile': 'CLP',
    'China': 'CNY',
    'Colombia': 'COP',
    'Comoros': 'KMF',
    'Congo': 'XAF',
    'Costa Rica': 'CRC',
    'Croatia': 'EUR',
    'Cuba': 'CUP',
    'Cyprus': 'EUR',
    'Czech Republic': 'CZK',
    'Denmark': 'DKK',
    'Djibouti': 'DJF',
    'Dominica': 'XCD',
    'Dominican Republic': 'DOP',
    'Ecuador': 'USD',
    'Egypt': 'EGP',
    'El Salvador': 'USD',
    'Equatorial Guinea': 'XAF',
    'Eritrea': 'ERN',
    'Estonia': 'EUR',
    'Eswatini': 'SZL',
    'Ethiopia': 'ETB',
    'Fiji': 'FJD',
    'Finland': 'EUR',
    'France': 'EUR',
    'Gabon': 'XAF',
    'Gambia': 'GMD',
    'Georgia': 'GEL',
    'Germany': 'EUR',
    'Ghana': 'GHS',
    'Greece': 'EUR',
    'Grenada': 'XCD',
    'Guatemala': 'GTQ',
    'Guinea': 'GNF',
    'Guinea-Bissau': 'XOF',
    'Guyana': 'GYD',
    'Haiti': 'HTG',
    'Honduras': 'HNL',
    'Hungary': 'HUF',
    'Iceland': 'ISK',
    'India': 'INR',
    'Indonesia': 'IDR',
    'Iran': 'IRR',
    'Iraq': 'IQD',
    'Ireland': 'EUR',
    'Israel': 'ILS',
    'Italy': 'EUR',
    'Jamaica': 'JMD',
    'Japan': 'JPY',
    'Jordan': 'JOD',
    'Kazakhstan': 'KZT',
    'Kenya': 'KES',
    'Kiribati': 'AUD',
    'Kosovo': 'EUR',
    'Kuwait': 'KWD',
    'Kyrgyzstan': 'KGS',
    'Laos': 'LAK',
    'Latvia': 'EUR',
    'Lebanon': 'LBP',
    'Lesotho': 'LSL',
    'Liberia': 'LRD',
    'Libya': 'LYD',
    'Liechtenstein': 'CHF',
    'Lithuania': 'EUR',
    'Luxembourg': 'EUR',
    'Madagascar': 'MGA',
    'Malawi': 'MWK',
    'Malaysia': 'MYR',
    'Maldives': 'MVR',
    'Mali': 'XOF',
    'Malta': 'EUR',
    'Marshall Islands': 'USD',
    'Mauritania': 'MRU',
    'Mauritius': 'MUR',
    'Mexico': 'MXN',
    'Micronesia': 'USD',
    'Moldova': 'MDL',
    'Monaco': 'EUR',
    'Mongolia': 'MNT',
    'Montenegro': 'EUR',
    'Morocco': 'MAD',
    'Mozambique': 'MZN',
    'Myanmar': 'MMK',
    'Namibia': 'NAD',
    'Nauru': 'AUD',
    'Nepal': 'NPR',
    'Netherlands': 'EUR',
    'New Zealand': 'NZD',
    'Nicaragua': 'NIO',
    'Niger': 'XOF',
    'Nigeria': 'NGN',
    'North Korea': 'KPW',
    'North Macedonia': 'MKD',
    'Norway': 'NOK',
    'Oman': 'OMR',
    'Pakistan': 'PKR',
    'Palau': 'USD',
    'Palestine': 'ILS',
    'Panama': 'PAB',
    'Papua New Guinea': 'PGK',
    'Paraguay': 'PYG',
    'Peru': 'PEN',
    'Philippines': 'PHP',
    'Poland': 'PLN',
    'Portugal': 'EUR',
    'Qatar': 'QAR',
    'Romania': 'RON',
    'Russia': 'RUB',
    'Rwanda': 'RWF',
    'Saint Kitts and Nevis': 'XCD',
    'Saint Lucia': 'XCD',
    'Saint Vincent and the Grenadines': 'XCD',
    'Samoa': 'WST',
    'San Marino': 'EUR',
    'Sao Tome and Principe': 'STN',
    'Saudi Arabia': 'SAR',
    'Senegal': 'XOF',
    'Serbia': 'RSD',
    'Seychelles': 'SCR',
    'Sierra Leone': 'SLL',
    'Singapore': 'SGD',
    'Slovakia': 'EUR',
    'Slovenia': 'EUR',
    'Solomon Islands': 'SBD',
    'Somalia': 'SOS',
    'South Africa': 'ZAR',
    'South Korea': 'KRW',
    'South Sudan': 'SSP',
    'Spain': 'EUR',
    'Sri Lanka': 'LKR',
    'Sudan': 'SDG',
    'Suriname': 'SRD',
    'Sweden': 'SEK',
    'Switzerland': 'CHF',
    'Syria': 'SYP',
    'Taiwan': 'TWD',
    'Tajikistan': 'TJS',
    'Tanzania': 'TZS',
    'Thailand': 'THB',
    'Timor-Leste': 'USD',
    'Togo': 'XOF',
    'Tonga': 'TOP',
    'Trinidad and Tobago': 'TTD',
    'Tunisia': 'TND',
    'Turkey': 'TRY',
    'Turkmenistan': 'TMT',
    'Tuvalu': 'AUD',
    'Uganda': 'UGX',
    'Ukraine': 'UAH',
    'United Arab Emirates': 'AED',
    'United Kingdom': 'GBP',
    'United States': 'USD',
    'Uruguay': 'UYU',
    'Uzbekistan': 'UZS',
    'Vanuatu': 'VUV',
    'Vatican City': 'EUR',
    'Venezuela': 'VES',
    'Vietnam': 'VND',
    'Yemen': 'YER',
    'Zambia': 'ZMW',
    'Zimbabwe': 'ZWL'
  };

  // Get all unique currencies from the mapping
  const allCurrencies = useMemo(() => {
    const uniqueCurrencies = new Set(Object.values(countryToCurrency));
    return Array.from(uniqueCurrencies).sort();
  }, []);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!defaultLocationSearch) return allCountries;
    const searchLower = defaultLocationSearch.toLowerCase();
    return allCountries.filter(country => 
      country.toLowerCase().includes(searchLower)
    );
  }, [defaultLocationSearch]);

  // Catalog Type Tile Component
  const CatalogTypeTile: React.FC<{
    option: { value: string; title: string; description: string; hasSubcategories: boolean };
    isSelected: boolean;
    onClick: () => void;
  }> = ({ option, isSelected, onClick }) => {
    const icon = getCatalogTypeIcon(option.value);
    const showDropdown = (option.value === 'auto' || option.value === 'financial-services') && isSelected;
    
    return (
      <div
        style={{
          background: tokens.color.neutral.surface1,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0',
          position: 'relative',
          boxSizing: 'border-box',
          width: '100%'
        }}
      >
        <div
          style={{
            background: tokens.color.neutral.surface1,
            border: isSelected ? `1px solid ${tokens.color.primary.fill}` : `1px solid ${tokens.color.neutral.fillLow}`,
            borderRadius: '4px',
            padding: '16px',
            width: '100%',
            height: '120px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '10px',
            position: 'relative',
            boxSizing: 'border-box',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            // Only trigger tile selection if clicking outside the dropdown area
            if (!catalogSubtypeRef.current?.contains(e.target as Node) && !financialServicesSubtypeRef.current?.contains(e.target as Node)) {
              onClick();
            }
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isSelected ? tokens.color.primary.fill : tokens.color.neutral.onSurface,
              borderRadius: '4px',
              flexShrink: 0,
              position: 'relative',
              pointerEvents: 'none'
            }}
          >
            {icon && (
              <div style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
              </div>
            )}
          </div>
          {/* Title and Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0, alignItems: 'flex-start', position: 'relative', pointerEvents: 'none', paddingBottom: showDropdown ? '48px' : '0' }}>
            <p
              style={{
                fontFamily: 'TikTok Sans Text, sans-serif',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '20px',
                letterSpacing: '0.0938px',
                color: tokens.color.neutral.highOnSurface,
                margin: 0,
                textAlign: 'left'
              }}
            >
              {option.title}
            </p>
            <p
              style={{
                fontFamily: 'TikTok Sans Text, sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '16px',
                letterSpacing: '0.1608px',
                color: tokens.color.neutral.onSurface,
                margin: 0,
                textAlign: 'left'
              }}
            >
              {option.description}
            </p>
          </div>
          {/* Radio Button */}
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: tokens.color.neutral.surface,
              border: isSelected 
                ? `6px solid ${tokens.color.primary.fill}` 
                : `2px solid ${tokens.color.neutral.fillLow}`,
              boxSizing: 'border-box',
              flexShrink: 0,
              pointerEvents: 'none'
            }}
          />
          {/* Dropdown for Auto */}
          {showDropdown && option.value === 'auto' && (
            <div className="relative" ref={catalogSubtypeRef} style={{ width: 'calc(100% - 32px)', position: 'absolute', bottom: '16px', left: '16px', zIndex: 10 }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCatalogSubtypeDropdownUp(!catalogSubtypeDropdownUp);
              }}
              className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
              style={{
                borderRadius: '4px',
                borderWidth: '1px',
                fontSize: '14px',
                padding: '8px 12px',
                color: catalogSubtype ? '#121415' : 'rgba(169, 171, 172, 1)',
                cursor: 'pointer'
              }}
            >
              <span>{catalogSubtype ? catalogSubtypeOptions.find(opt => opt.value === catalogSubtype)?.title || 'Select a category' : 'Select a category'}</span>
              <ChevronDown 
                className={`transition-transform ${catalogSubtypeDropdownUp ? 'rotate-180' : ''}`}
                style={{ 
                  width: '16px', 
                  height: '16px',
                  strokeWidth: 1.5,
                  color: 'rgba(109, 110, 112, 1)',
                  flexShrink: 0
                }}
              />
            </button>
            {catalogSubtypeDropdownUp && (
              <div
                ref={catalogSubtypeDropdownRef}
                className="absolute left-0 z-50"
                style={{
                  ...(autoDropdownShouldOpenUp ? {
                    bottom: '100%',
                    marginBottom: '4px'
                  } : {
                    top: '100%',
                    marginTop: '4px'
                  }),
                  display: 'flex',
                  width: '100%',
                  minWidth: '120px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderRadius: '8px',
                  background: '#FFF',
                  boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                  padding: '4px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  scrollbarGutter: 'stable'
                }}
              >
                {catalogSubtypeOptions.map((subtype) => (
                  <button
                    key={subtype.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCatalogSubtype(subtype.value);
                      setCatalogSubtypeDropdownUp(false);
                    }}
                    className="w-full text-left transition-colors"
                    style={{
                      display: 'flex',
                      padding: '8px',
                      alignItems: 'center',
                      gap: '8px',
                      alignSelf: 'stretch',
                      borderRadius: '4px',
                      background: '#FFF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F1F2F2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FFF';
                    }}
                  >
                    <span style={{ fontSize: '14px', color: '#121415' }}>{subtype.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          )}
          {/* Dropdown for Financial services */}
          {showDropdown && option.value === 'financial-services' && (
            <div className="relative" ref={financialServicesSubtypeRef} style={{ width: 'calc(100% - 32px)', position: 'absolute', bottom: '16px', left: '16px', zIndex: 10 }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFinancialServicesSubtypeDropdownUp(!financialServicesSubtypeDropdownUp);
              }}
              className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
              style={{
                borderRadius: '4px',
                borderWidth: '1px',
                fontSize: '14px',
                padding: '8px 12px',
                color: financialServicesSubtype ? '#121415' : 'rgba(169, 171, 172, 1)',
                cursor: 'pointer'
              }}
            >
              <span>{financialServicesSubtype ? financialServicesSubtypeOptions.find(opt => opt.value === financialServicesSubtype)?.title || 'Select a category' : 'Select a category'}</span>
              <ChevronDown 
                className={`transition-transform ${financialServicesSubtypeDropdownUp ? 'rotate-180' : ''}`}
                style={{ 
                  width: '16px',
                  height: '16px',
                  strokeWidth: 1.5,
                  color: 'rgba(109, 110, 112, 1)',
                  flexShrink: 0
                }}
              />
            </button>
            {financialServicesSubtypeDropdownUp && (
              <div
                ref={financialServicesSubtypeDropdownRef}
                className="absolute left-0 z-50"
                style={{
                  ...(financialServicesDropdownShouldOpenUp ? {
                    bottom: '100%',
                    marginBottom: '4px'
                  } : {
                    top: '100%',
                    marginTop: '4px'
                  }),
                  display: 'flex',
                  width: '100%',
                  minWidth: '120px',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderRadius: '8px',
                  background: '#FFF',
                  boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                  padding: '4px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  scrollbarGutter: 'stable'
                }}
              >
                {financialServicesSubtypeOptions.map((subtype) => (
                  <button
                    key={subtype.value}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFinancialServicesSubtype(subtype.value);
                      setFinancialServicesSubtypeDropdownUp(false);
                    }}
                    className="w-full text-left transition-colors"
                    style={{
                      display: 'flex',
                      padding: '8px',
                      alignItems: 'center',
                      gap: '8px',
                      alignSelf: 'stretch',
                      borderRadius: '4px',
                      background: '#FFF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F1F2F2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FFF';
                    }}
                  >
                    <span style={{ fontSize: '14px', color: '#121415' }}>{subtype.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Overlay - fades in with easing (non-interactive) */}
      <div
        className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
      {/* Drawer - slides from right with easing, 944px wide */}
      <div
        className="fixed top-[40px] right-0 h-[calc(100vh-40px)] w-[944px] bg-white shadow-2xl z-[90] transform transition-transform duration-300 ease-out"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          scrollbarGutter: 'stable'
        }}
      >
        {/* Close Button - Outside drawer on the left, slides with drawer */}
        <button
          onClick={handleClose}
          className={`absolute top-0 -left-9 w-9 h-9 bg-[#404142] flex items-center justify-center z-[90] hover:bg-[#505152] transition-all duration-300 ease-out rounded-l ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            borderRadius: '4px 0 0 4px'
          }}
          aria-label="Close drawer"
        >
          <X className="text-white" style={{ width: '16px', height: '16px' }} strokeWidth={2.5} />
        </button>
        <div className="h-full flex flex-col" style={{ scrollbarGutter: 'stable' }}>
          {/* Header */}
          {!isManuallyAddView && !isDataFeedView ? (
            <div className="px-6 h-[72px] flex items-center">
              <h2 
                style={{
                  color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                  fontFamily: '"TikTok Sans Display"',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '28px',
                  letterSpacing: '0.3px',
                  margin: 0
                }}
              >
                New Catalog
              </h2>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                padding: '20px 24px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '4px',
                alignSelf: 'stretch'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '2px',
                  alignItems: 'center'
                }}
              >
                <button
                  type="button"
                  onClick={handleBack}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <span
                    style={{
                      color: '#6D6E70',
                      textAlign: 'center',
                      fontFamily: 'TikTok Sans Display, sans-serif',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '28px',
                      letterSpacing: '0.3px'
                    }}
                  >
                    New Catalog
                  </span>
                </button>
                <ArrowsChevronRight 
                  size="14" 
                  style={{ color: 'rgba(135, 137, 139, 1)' }} 
                />
                <span
                  style={{
                    color: '#121415',
                    textAlign: 'center',
                    fontFamily: 'TikTok Sans Display, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px'
                  }}
                >
                  Manually add products
                </span>
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto" style={{ background: tokens.color.neutral.surface1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', scrollbarGutter: 'stable' }}>
            {isCatalogTypeSelectionView ? (
              <div 
                style={{ 
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <h2
                  style={{
                    color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                    fontFamily: '"TikTok Sans Display"',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    margin: 0,
                    marginBottom: '32px'
                  }}
                >
                  Select your catalog type
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', width: '100%' }}>
                  {/* Render tiles in rows of 3 */}
                  {Array.from({ length: Math.ceil(catalogTypeOptions.length / 3) }).map((_, rowIndex) => {
                    const rowTiles = catalogTypeOptions.slice(rowIndex * 3, rowIndex * 3 + 3);
                    // All tiles should have the same width as if there were 3 in a row
                    // Width calculation: (100% - 20px) / 3 (20px = 2 gaps of 10px between 3 tiles)
                    const tileWidth = 'calc((100% - 20px) / 3)';
                    return (
                      <div key={rowIndex} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%' }}>
                        {rowTiles.map((option) => (
                          <div key={option.value} style={{ width: tileWidth, minWidth: 0 }}>
                            <CatalogTypeTile
                              option={option}
                              isSelected={catalogType === option.value}
                              onClick={() => {
                                setCatalogType(option.value);
                                if (option.value !== 'auto') {
                                  setCatalogSubtype('');
                                } else {
                                  // Ensure dropdown is closed when auto is selected
                                  setCatalogSubtypeDropdownUp(false);
                                }
                                if (option.value !== 'financial-services') {
                                  setFinancialServicesSubtype('');
                                } else {
                                  // Ensure dropdown is closed when financial-services is selected
                                  setFinancialServicesSubtypeDropdownUp(false);
                                }
                                // Reset business center and permissions when catalog type changes
                                setBusinessCenter('');
                                setDefaultLocation('');
                                setDefaultCurrency('');
                                setUserPermissions('');
                                setPermissionLevel('');
                                // Reset sync from partner platform if switching away from ecommerce
                                if (option.value !== 'ecommerce') {
                                  setSyncFromPartnerPlatform(false);
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : !isManuallyAddView && !isDataFeedView ? (
              <div 
                className="flex flex-col gap-4"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: collapsedCards.has('catalog-details') ? 0 : undefined }}>
                  <h2
                    style={{
                      color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                      fontFamily: 'TikTok Sans Display, sans-serif',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '28px',
                      letterSpacing: '0.3px',
                      margin: 0,
                      flex: '1 0 0'
                    }}
                  >
                    Catalog details
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCollapsedCards(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has('catalog-details')) {
                            newSet.delete('catalog-details');
                          } else {
                            newSet.add('catalog-details');
                          }
                          return newSet;
                        });
                      }}
                      style={{
                        background: tokens.color.neutral.transparentFill,
                        cursor: 'pointer',
                        display: 'flex',
                        gap: tokens.spacing['2-5'],
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: tokens.spacing['0-5'],
                        border: 'none',
                        minWidth: '20px',
                        minHeight: '20px',
                        outline: 'none',
                      }}
                    >
                      {collapsedCards.has('catalog-details') ? (
                        <ArrowsChevronDown size="16" style={{ color: '#121415' }} />
                      ) : (
                        <ArrowsChevronUp size="16" style={{ color: '#121415' }} />
                      )}
                    </button>
                  </div>
                </div>
                {!collapsedCards.has('catalog-details') && (
                <>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    Catalog name
                  </label>
                  <input
                    type="text"
                    className="catalog-input border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                    style={{
                      width: '100%',
                      maxWidth: '600px',
                      borderWidth: '1px',
                      fontSize: '14px',
                      padding: '8px 12px',
                      borderRadius: '4px'
                    }}
                    placeholder="Enter catalog name"
                    value={catalogName}
                    onChange={(e) => setCatalogName(e.target.value)}
                  />
                  <style>{`
                    .catalog-input::placeholder {
                      color: rgba(109, 110, 112, 1);
                    }
                  `}</style>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    Catalog type
                  </label>
                  <div className="relative" ref={catalogTypeRef} style={{ width: '100%', maxWidth: '600px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!isCatalogTypeOpen && catalogTypeRef.current) {
                          const rect = catalogTypeRef.current.getBoundingClientRect();
                          const spaceBelow = window.innerHeight - rect.bottom;
                          const spaceAbove = rect.top;
                          const dropdownHeight = 400;
                          setCatalogTypeDropdownUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
                        }
                        setIsCatalogTypeOpen(!isCatalogTypeOpen);
                      }}
                      className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                      style={{
                        borderRadius: '4px',
                        borderWidth: '1px',
                        fontSize: '14px',
                        padding: '8px 12px',
                        color: catalogType ? '#121415' : 'rgba(109, 110, 112, 1)',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                        {catalogType && (() => {
                          const icon = getCatalogTypeIcon(catalogType);
                          return icon ? (
                            <div style={{ 
                              color: '#121415', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              flexShrink: 0,
                              width: '14px',
                              height: '14px',
                              minWidth: '14px',
                              minHeight: '14px'
                            }}>
                              <div style={{ maxWidth: '11px', maxHeight: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {icon}
                              </div>
                            </div>
                          ) : null;
                        })()}
                        <span style={{ flex: 1, minWidth: 0 }}>{catalogType ? catalogTypeOptions.find(opt => opt.value === catalogType)?.title || catalogType : 'Select a catalog type'}</span>
                      </div>
                      <ChevronDown 
                        className={`transition-transform ${isCatalogTypeOpen ? 'rotate-180' : ''}`}
                        style={{ 
                          width: '20px', 
                          height: '20px',
                          strokeWidth: 1.5,
                          color: 'rgba(109, 110, 112, 1)',
                          flexShrink: 0
                        }}
                      />
                    </button>
                    {isCatalogTypeOpen && (
                      <div
                        className="absolute left-0 z-50"
                        style={{
                          width: '100%',
                          minWidth: '120px',
                          borderRadius: '8px',
                          background: '#FFF',
                          boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                          padding: '4px',
                          maxHeight: '400px',
                          overflowY: 'auto',
                          overflowX: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '0',
                          scrollbarGutter: 'stable',
                          ...(catalogTypeDropdownUp
                            ? { bottom: '100%', marginBottom: '4px' }
                            : { top: '100%', marginTop: '4px' }
                          )
                        }}
                      >
                        {catalogTypeOptions.map((option) => {
                          const icon = getCatalogTypeIcon(option.value);
                          return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setCatalogType(option.value);
                              setIsCatalogTypeOpen(false);
                                if (option.value !== 'auto') {
                                  setCatalogSubtype('');
                                }
                                if (option.value !== 'financial-services') {
                                  setFinancialServicesSubtype('');
                                }
                                // Reset sync from partner platform if switching away from ecommerce
                                if (option.value !== 'ecommerce') {
                                  setSyncFromPartnerPlatform(false);
                                }
                                // Reset business center and permissions when catalog type changes
                                setBusinessCenter('');
                                setDefaultLocation('');
                                setDefaultCurrency('');
                                setUserPermissions('');
                                setPermissionLevel('');
                            }}
                            className="w-full text-left transition-colors"
                            style={{
                              display: 'flex',
                              padding: '8px',
                              alignItems: 'center',
                              gap: '8px',
                              alignSelf: 'stretch',
                              borderRadius: '4px',
                              background: catalogType === option.value ? '#F1F2F2' : '#FFF'
                            }}
                            onMouseEnter={(e) => {
                                if (catalogType !== option.value) {
                              e.currentTarget.style.background = '#F1F2F2';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (catalogType !== option.value) {
                              e.currentTarget.style.background = '#FFF';
                                }
                            }}
                            >
                              {icon && (
                                <div style={{ 
                                  color: '#121415', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  flexShrink: 0,
                                  width: '14px',
                                  height: '14px',
                                  minWidth: '14px',
                                  minHeight: '14px'
                                }}>
                                  <div style={{ maxWidth: '11px', maxHeight: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {icon}
                                  </div>
                                </div>
                              )}
                              <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '2px', 
                                flex: 1, 
                                minWidth: 0,
                                justifyContent: 'center'
                              }}>
                                <span style={{ 
                                  fontSize: '14px', 
                                  fontWeight: 400, 
                                  fontFamily: '"TikTok Sans Text", sans-serif',
                                  color: '#121415', 
                                  lineHeight: '20px',
                                  letterSpacing: '0.0938px'
                                }}>{option.title}</span>
                                {option.description && (
                                  <span style={{ 
                                    fontSize: '12px', 
                                    fontWeight: 400,
                                    fontFamily: '"TikTok Sans Text", sans-serif',
                                    color: '#6D6E70', 
                                    lineHeight: '16px',
                                    letterSpacing: '0.1608px'
                                  }}>{option.description}</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {/* Category dropdown for auto catalog type - appears in catalog details card */}
                {catalogType === 'auto' && (
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <label 
                      className="text-[#121415]"
                      style={{
                        fontVariantNumeric: 'lining-nums tabular-nums',
                        fontFamily: 'TikTok Sans, sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '20px',
                        letterSpacing: '0.094px'
                      }}
                    >
                      Category
                    </label>
                    <div className="relative" ref={catalogSubtypeRef} style={{ width: '100%', maxWidth: '600px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!isCatalogSubtypeOpen && catalogSubtypeRef.current) {
                            const rect = catalogSubtypeRef.current.getBoundingClientRect();
                            const spaceBelow = window.innerHeight - rect.bottom;
                            const spaceAbove = rect.top;
                            const dropdownHeight = 200;
                            setCatalogSubtypeDropdownUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
                          }
                          setIsCatalogSubtypeOpen(!isCatalogSubtypeOpen);
                        }}
                        className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                        style={{
                          borderRadius: '4px',
                          borderWidth: '1px',
                          fontSize: '14px',
                          padding: '8px 12px',
                          color: catalogSubtype ? '#121415' : 'rgba(109, 110, 112, 1)',
                          gap: '8px'
                        }}
                      >
                        <span style={{ flex: 1, minWidth: 0 }}>
                          {catalogSubtype 
                            ? catalogSubtypeOptions.find(opt => opt.value === catalogSubtype)?.title || catalogSubtype 
                            : 'Select a category'}
                        </span>
                        <ChevronDown 
                          className={`transition-transform ${isCatalogSubtypeOpen ? 'rotate-180' : ''}`}
                          style={{ 
                            width: '20px', 
                            height: '20px',
                            strokeWidth: 1.5,
                            color: 'rgba(109, 110, 112, 1)',
                            flexShrink: 0
                          }}
                        />
                      </button>
                      {isCatalogSubtypeOpen && (
                        <div
                          className="absolute left-0 z-50"
                                style={{
                            width: '100%',
                            minWidth: '120px',
                            borderRadius: '8px',
                            background: '#FFF',
                            boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                            padding: '4px',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '0',
                            scrollbarGutter: 'stable',
                            ...(catalogSubtypeDropdownUp
                              ? { bottom: '100%', marginBottom: '4px' }
                              : { top: '100%', marginTop: '4px' }
                            )
                          }}
                        >
                          {catalogSubtypeOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setCatalogSubtype(option.value);
                                setIsCatalogSubtypeOpen(false);
                              }}
                              className="w-full text-left transition-colors"
                              style={{
                                display: 'flex',
                                padding: '8px',
                                alignItems: 'center',
                                gap: '8px',
                                alignSelf: 'stretch',
                                borderRadius: '4px',
                                background: catalogSubtype === option.value ? '#F1F2F2' : '#FFF'
                              }}
                              onMouseEnter={(e) => {
                                if (catalogSubtype !== option.value) {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (catalogSubtype !== option.value) {
                                  e.currentTarget.style.background = '#FFF';
                                }
                              }}
                            >
                              <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '2px', 
                                flex: 1, 
                                minWidth: 0,
                                justifyContent: 'center'
                              }}>
                                <span style={{ 
                                  fontSize: '14px', 
                                  fontWeight: 400, 
                                  fontFamily: '"TikTok Sans Text", sans-serif',
                                  color: '#121415',
                                  lineHeight: '20px',
                                  letterSpacing: '0.0938px'
                                }}>{option.title}</span>
                                {option.description && (
                                  <span style={{ 
                                    fontSize: '12px', 
                                    fontWeight: 400,
                                    fontFamily: '"TikTok Sans Text", sans-serif',
                                    color: '#6D6E70', 
                                    lineHeight: '16px',
                                    letterSpacing: '0.1608px'
                                  }}>{option.description}</span>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Switch for ecommerce catalog type only - between catalog type and product source */}
                {catalogType === 'ecommerce' && (
                  <div className="flex items-start gap-3" style={{ width: '100%', maxWidth: '600px' }}>
                    <div 
                      className="flex items-center relative"
                                style={{
                        width: '36px',
                        height: '20px',
                        flexShrink: 0
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '20px',
                          background: syncFromPartnerPlatform 
                            ? 'var(--ks-color-primary-fill, #009995)' 
                            : 'var(--ks-color-neutral-fillLow, #D3D4D5)',
                          borderRadius: '10px',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onClick={() => {
                          const newValue = !syncFromPartnerPlatform;
                          setSyncFromPartnerPlatform(newValue);
                          if (newValue) {
                            // Clear productSource when enabling sync from partner platform
                            setProductSource('');
                          }
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            width: '16px',
                            height: '16px',
                            background: 'var(--ks-color-neutral-onFill, #FFFFFF)',
                            borderRadius: '50%',
                            top: '2px',
                            left: syncFromPartnerPlatform ? '18px' : '2px',
                            boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.12)',
                            transition: 'left 0.2s'
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start" style={{ flex: 1 }}>
                      <div 
                        style={{
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                          letterSpacing: '0.094px',
                          color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                          marginBottom: '0px'
                        }}
                      >
                        Sync from partner platform
                      </div>
                      <div
                        style={{
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                          letterSpacing: '0.094px',
                          color: 'var(--ks-color-neutral-onSurface, #6D6E70)',
                          marginTop: '0px'
                        }}
                      >
                        Use a partner platform like Shopify or WooCommerce
                      </div>
                    </div>
                  </div>
                )}
                </>
                )}
              </div>
            ) : isDataFeedView ? (
              <div className="pb-6 px-6">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p
                    style={{
                      color: '#6D6E70',
                                  fontFamily: 'TikTok Sans, sans-serif',
                                  fontSize: '14px',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.094px',
                      margin: 0
                    }}
                  >
                    Check out the standard template and make sure the file you upload matches the template.
                  </p>
                  <a
                    href="#"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#017976',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.094px',
                      textDecoration: 'none'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.26123 2.70361C7.26123 2.2894 7.59702 1.95361 8.01123 1.95361C8.42544 1.95361 8.76123 2.2894 8.76123 2.70361L8.76123 9.46327L11.4697 6.75483C11.7626 6.46193 12.2374 6.46193 12.5303 6.75483C12.8232 7.04772 12.8232 7.52259 12.5303 7.81549L8.63919 11.7066C8.50525 11.9112 8.27402 12.0464 8.01123 12.0464C7.80126 12.0464 7.61145 11.9601 7.47531 11.8211L7.46967 11.8155C7.44336 11.7892 7.41942 11.7614 7.39783 11.7324L3.4809 7.81549C3.18801 7.52259 3.18801 7.04772 3.4809 6.75483C3.77379 6.46193 4.24867 6.46193 4.54156 6.75483L7.26123 9.47449L7.26123 2.70361Z" fill="#017976"/>
                      <path d="M3.25 11.2964C3.25 10.8822 2.91421 10.5464 2.5 10.5464C2.08579 10.5464 1.75 10.8822 1.75 11.2964V14.0464H14.25V11.2964C14.25 10.8822 13.9142 10.5464 13.5 10.5464C13.0858 10.5464 12.75 10.8822 12.75 11.2964V12.5464H3.25V11.2964Z" fill="#017976"/>
                    </svg>
                    <span>Download template</span>
                  </a>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ marginTop: '16px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                                  lineHeight: '20px',
                                  letterSpacing: '0.094px'
                                }}
                              >
                    Data feed name
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '600px' }}>
                    <label 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => setDataFeedProductSourceType('existing')}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: dataFeedProductSourceType === 'existing' ? 'none' : '2px solid #D3D4D5',
                          background: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative'
                        }}
                      >
                        {dataFeedProductSourceType === 'existing' && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <circle cx="8" cy="8" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                          </svg>
                        )}
                              </div>
                      <span style={{ fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px', color: '#121415' }}>Upload to existing product source</span>
                    </label>
                    <label 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => setDataFeedProductSourceType('new')}
                    >
                              <div
                                style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: dataFeedProductSourceType === 'new' ? 'none' : '2px solid #D3D4D5',
                          background: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative'
                        }}
                      >
                        {dataFeedProductSourceType === 'new' && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <circle cx="8" cy="8" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px', color: '#121415' }}>Create new product source</span>
                  </label>
                  <input
                    type="text"
                      className="data-feed-input border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                      borderWidth: '1px',
                      fontSize: '14px',
                        padding: '8px 12px',
                        borderRadius: '4px'
                    }}
                    placeholder="Name your data feed"
                      defaultValue="TheWorldIsEnding"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ marginTop: '16px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    Data Feed URL
                  </label>
                  <p
                    style={{
                      color: '#6D6E70',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.094px',
                      margin: 0,
                      marginBottom: '8px'
                    }}
                  >
                    Add the URL of your file, starting with http, https, ftp, or sftp. Files can be up to 8GB and in a CSV format.
                  </p>
                  <input
                    type="text"
                    className="data-feed-input border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                    style={{
                      width: '100%',
                      maxWidth: '600px',
                      borderWidth: '1px',
                      fontSize: '14px',
                      padding: '8px 12px',
                      borderRadius: '4px'
                    }}
                    placeholder="Enter data feed URL"
                    defaultValue="https://thebulletin.org/doomsday-clock/2025-statement/"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ marginTop: '16px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    Data feed name
                  </label>
                  <p
                    style={{
                      color: '#6D6E70',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '12px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '16px',
                      letterSpacing: '0.161px',
                      margin: 0,
                      marginBottom: '8px'
                    }}
                  >
                    The upload schedule must be set to "Daily" if the data feed exceeds 15 GB in size.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '600px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #009995',
                          background: '#009995',
                          color: '#FFFFFF',
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        Hourly
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #D3D4D5',
                          background: '#FFFFFF',
                          color: '#121415',
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        Daily
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #D3D4D5',
                          background: '#FFFFFF',
                          color: '#121415',
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        Weekly
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '4px',
                          border: '1px solid #D3D4D5',
                          background: '#FFFFFF',
                          color: '#121415',
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label
                          style={{
                            fontFamily: 'TikTok Sans, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            color: '#6D6E70',
                            lineHeight: '16px'
                          }}
                        >
                          Repeat
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #D3D4D5',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'TikTok Sans, sans-serif',
                            color: '#121415'
                          }}
                          defaultValue="every-hour"
                        >
                          <option value="every-hour">Every hour</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label
                          style={{
                            fontFamily: 'TikTok Sans, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            color: '#6D6E70',
                            lineHeight: '16px'
                          }}
                        >
                          From
                        </label>
                        <input
                          type="time"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #D3D4D5',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontFamily: 'TikTok Sans, sans-serif',
                            color: '#121415'
                          }}
                          defaultValue="12:00"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label
                          style={{
                            fontFamily: 'TikTok Sans, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            color: '#6D6E70',
                            lineHeight: '16px'
                          }}
                        >
                          Timezone
                        </label>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <input
                            type="text"
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              paddingRight: '32px',
                              border: '1px solid #D3D4D5',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontFamily: 'TikTok Sans, sans-serif',
                              color: '#121415'
                            }}
                            defaultValue="UTC+08:00"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none'
                            }}
                          >
                            <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM8 13.5C5.23858 13.5 3 11.2614 3 8.5C3 5.73858 5.23858 3.5 8 3.5C10.7614 3.5 13 5.73858 13 8.5C13 11.2614 10.7614 13.5 8 13.5Z" fill="#87898B"/>
                            <path d="M8 5V8.5L10.5 11" stroke="#87898B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ marginTop: '16px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    Update method
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '600px' }}>
                    <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', padding: '12px', border: '1px solid #009995', borderRadius: '4px', background: '#F0FDFC' }}>
                      <input type="radio" name="update-method" value="update" defaultChecked style={{ width: '16px', height: '16px', marginTop: '2px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <span style={{ fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: '#121415' }}>Update your data feed</span>
                        <span style={{ fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px', fontWeight: 400, color: '#6D6E70', lineHeight: '20px' }}>
                          Upload a file to add new items to your data feed or update existing items. Existing items which are not in your new data feed will not be deleted.
                        </span>
                      </div>
                    </label>
                    <label style={{ display: 'flex', gap: '12px', cursor: 'pointer', padding: '12px', border: '1px solid #D3D4D5', borderRadius: '4px', background: '#FFFFFF' }}>
                      <input type="radio" name="update-method" value="replace" style={{ width: '16px', height: '16px', marginTop: '2px' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <span style={{ fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: '#121415' }}>Replace your data feed</span>
                        <span style={{ fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px', fontWeight: 400, color: '#6D6E70', lineHeight: '20px' }}>
                          Upload a file to add new items to your data feed or update existing items. Existing items which are not in your new data feed will be deleted.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                <style>{`
                  .data-feed-input::placeholder {
                    color: rgba(109, 110, 112, 1);
                  }
                `}</style>
              </div>
            ) : isManuallyAddView ? (
              <div
                    style={{
                      display: 'flex',
                  gap: '12px',
                  padding: '0 12px',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                {/* Left Fixed Sidebar - Product List */}
                <div
                  style={{
                    display: 'flex',
                      flexDirection: 'column',
                    gap: 0,
                    width: '250px',
                    maxWidth: '500px',
                    flexShrink: 0,
                    background: '#FFFFFF',
                    height: '100%',
                                  overflow: 'hidden',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Product List Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '16px 12px 8px 12px',
                      flexShrink: 0
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'TikTok Sans, sans-serif',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '24px',
                        letterSpacing: '0.0304px',
                        color: '#121415',
                        margin: 0
                      }}
                    >
                      Product list
                    </h3>
                    <p
                      style={{
                        fontFamily: 'TikTok Sans, sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '20px',
                        letterSpacing: '0.0938px',
                        color: '#121415',
                        margin: 0
                      }}
                    >
                      Total × {products.length}
                    </p>
                  </div>

                  {/* Product List Items - Scrollable */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      width: '100%',
                      flex: 1,
                      minHeight: 0,
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      padding: '16px 12px',
                      scrollbarGutter: 'stable',
                      boxSizing: 'border-box'
                    }}
                  >
                    {products.map((product) => {
                      // Get the first uploaded image (main image) for the preview
                      // Priority: product.imageUrl > first uploaded image (if image is ready)
                      const productImages = product.images || [];
                      const productImageUrl = product.imageUrl || 
                        (productImages.length > 0 && !productImages[0].isUploading 
                          ? productImages[0].url 
                          : null);
                      
                      return (
                      <div
                        key={product.id}
                      >
                        <div
                          onClick={() => setSelectedProductId(product.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px',
                            cursor: 'pointer',
                            background: selectedProductId === product.id ? '#FFFFFF' : '#F8F8F9',
                            border: selectedProductId === product.id ? '1px solid #009995' : '1px solid #F8F8F9',
                            borderRadius: '4px',
                            marginBottom: 0
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '4px',
                                border: '1px solid #D3D4D5',
                                background: '#F2F3F3',
                                flexShrink: 0,
                                  overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {productImageUrl ? (
                                <img
                                  src={productImageUrl}
                                  alt={product.title || 'Product'}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                />
                              ) : (
                                <div
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    background: '#F2F3F3'
                                  }}
                                />
                              )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                              {product.title ? (
                                <p
                                  style={{
                                    fontFamily: 'TikTok Sans, sans-serif',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    letterSpacing: '0.0938px',
                                    color: '#121415',
                                    margin: 0,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {product.title}
                                </p>
                              ) : (
                                <div
                                  style={{
                                    height: '14px',
                                    width: '80%',
                                    background: '#F1F2F2',
                                    borderRadius: '2px',
                                    margin: '3px 0'
                                  }}
                                />
                              )}
                              {product.description ? (
                                <p
                                  style={{
                                    fontFamily: 'TikTok Sans, sans-serif',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '16px',
                                    letterSpacing: '-0.12px',
                                  color: '#6D6E70',
                                    margin: 0,
                                    overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {product.description}
                                </p>
                              ) : (
                                <div
                                  style={{
                                    height: '12px',
                                    width: '60%',
                                    background: '#F1F2F2',
                                    borderRadius: '2px',
                                    margin: '2px 0'
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const currentIndex = products.findIndex(p => p.id === product.id);
                              const isSelected = selectedProductId === product.id;
                              
                              // Revoke URLs for images and videos before deleting
                              if (product.images) {
                                product.images.forEach(img => URL.revokeObjectURL(img.url));
                              }
                              if (product.videos) {
                                product.videos.forEach(vid => URL.revokeObjectURL(vid.url));
                              }
                              
                              // Filter out the deleted product
                              const updatedProducts = products.filter(p => p.id !== product.id);
                              setProducts(updatedProducts);
                              
                              // If the deleted product was selected, select the next product above (or below if no product above)
                              if (isSelected && updatedProducts.length > 0) {
                                const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                                setSelectedProductId(updatedProducts[nextIndex].id);
                              } else if (isSelected) {
                                setSelectedProductId(null);
                              }
                              
                              // Clear main image when deleting a product
                              setMainImage(null);
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              padding: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                      justifyContent: 'center',
                              width: '24px',
                              height: '24px',
                              flexShrink: 0
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.9363 3.06372C11.1316 3.25898 11.1316 3.57556 10.9363 3.77082L7.70711 7.00004L10.9363 10.2293C11.1316 10.4245 11.1316 10.7411 10.9363 10.9364C10.7411 11.1316 10.4245 11.1316 10.2292 10.9364L7.00004 7.70718L3.77082 10.9364C3.57556 11.1316 3.25898 11.1316 3.06372 10.9364C2.86846 10.7411 2.86846 10.4245 3.06372 10.2293L6.29293 7.00004L3.06372 3.77082C2.86846 3.57556 2.86846 3.25898 3.06372 3.06372C3.25898 2.86846 3.57556 2.86846 3.77082 3.06372L7.00004 6.29293L10.2292 3.06372C10.4245 2.86846 10.7411 2.86846 10.9363 3.06372Z" fill="#262627"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      );
                    })}
                  </div>

                  {/* Add Product Button - Fixed at bottom */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 12px 16px 12px', flexShrink: 0, boxSizing: 'border-box' }}>
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      style={{
                        display: 'flex',
                      alignItems: 'center',
                        justifyContent: 'center',
                      gap: '8px',
                        padding: '8px 12px',
                        border: '1px solid #87898B',
                        background: '#F8F8F9',
                      borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#ECECED';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F8F8F9';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3.33333V12.6667" stroke="#262627" strokeWidth="1.33333" strokeLinecap="round"/>
                        <path d="M3.33333 8H12.6667" stroke="#262627" strokeWidth="1.33333" strokeLinecap="round"/>
                    </svg>
                      <span
                        style={{
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '20px',
                          letterSpacing: '0.0938px',
                          color: '#121415'
                        }}
                      >
                        Add product
                      </span>
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: '1px',
                    height: '100%',
                    background: '#D3D4D5',
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0
                  }}
                />

                {/* Right Scrollable Product Details */}
                <div
                  ref={tabContentScrollRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '606px',
                    padding: '0 12px',
                    flex: 1,
                    position: 'relative',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                    scrollbarGutter: 'stable'
                  }}
                >
                  {selectedProductId ? (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
                      {/* Sticky Tab Bar - at the top of the drawer */}
                      <div
                        style={{
                          background: '#FFFFFF',
                          position: 'sticky',
                          top: 0,
                          zIndex: 10,
                          marginBottom: 0,
                          paddingTop: '16px',
                          paddingBottom: 0,
                          marginLeft: '-12px',
                          paddingLeft: '12px'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            borderBottom: '1px solid #D3D4D5'
                          }}
                        >
                          {[
                            { id: 'media', label: 'Media' },
                            { id: 'product-info', label: 'Product info' },
                            { id: 'location', label: 'Location' },
                            { id: 'pricing', label: 'Pricing' },
                            { id: 'additional-info', label: 'Additional info' }
                          ].map((tab) => {
                          const isActive = activeTab === tab.id;
                          return (
                      <button
                              key={tab.id}
                        type="button"
                              onClick={() => {
                                setActiveTab(tab.id as typeof activeTab);
                                // Scroll to the corresponding section
                                const refs: Record<string, React.RefObject<HTMLDivElement>> = {
                                  'media': mediaRef,
                                  'product-info': productInfoRef,
                                  'location': locationRef,
                                  'pricing': pricingRef,
                                  'additional-info': additionalInfoRef
                                };
                                const targetRef = refs[tab.id];
                                if (targetRef?.current && tabContentScrollRef.current) {
                                  const scrollContainer = tabContentScrollRef.current;
                                  const targetElement = targetRef.current;
                                  
                                  // Set flag to prevent scroll detection from interfering
                                  isProgrammaticScrollRef.current = true;
                                  
                                  // Calculate scroll position more accurately
                                  const containerRect = scrollContainer.getBoundingClientRect();
                                  const targetRect = targetElement.getBoundingClientRect();
                                  const tabBarHeight = 54; // 36px tab + 16px padding + 2px border
                                  const spacing = 24;
                                  
                                  // Calculate the target scroll position
                                  const scrollPosition = scrollContainer.scrollTop + (targetRect.top - containerRect.top) - tabBarHeight - spacing;
                                  
                                  scrollContainer.scrollTo({
                                    top: Math.max(0, scrollPosition),
                                    behavior: 'smooth'
                                  });
                                  
                                  // Reset flag after smooth scroll completes (approximately 500ms for smooth scroll)
                                  setTimeout(() => {
                                    isProgrammaticScrollRef.current = false;
                                  }, 600);
                                }
                              }}
                        style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '36px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0,
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                                position: 'relative',
                                flexShrink: 0,
                                width: 'auto'
                              }}
                            >
                              <span
                                style={{
                          fontFamily: 'TikTok Sans, sans-serif',
                                  fontSize: '14px',
                                  fontStyle: 'normal',
                                  fontWeight: 500,
                                  lineHeight: '20px',
                                  letterSpacing: '0.0938px',
                                  color: isActive ? '#121415' : '#6D6E70',
                                  marginBottom: '2px'
                                }}
                              >
                                {tab.label}
                              </span>
                              {isActive && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: '#009995'
                                  }}
                                />
                              )}
                              {!isActive && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'transparent'
                                  }}
                                />
                              )}
                            </button>
                          );
                        })}
                        </div>
                      </div>

                      {/* Media Section - Images and Videos */}
                      <div ref={mediaRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
                        {/* Media Section Header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Media
                            </p>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                          letterSpacing: '0.094px',
                                color: '#6D6E70',
                                margin: 0
                              }}
                            >
                              Upload images or videos related to your product.
                            </p>
                          </div>
                          {/* Dropdown Button - only show when there are uploaded items */}
                          {(getProductImages(selectedProductId).length > 0 || getProductVideos(selectedProductId).length > 0) && (
                            <div style={{ position: 'relative', flexShrink: 0 }} data-dropdown-container>
                            <button
                              type="button"
                              onClick={() => setIsMediaUploadDropdownOpen(!isMediaUploadDropdownOpen)}
                              style={{
                                background: tokens.color.neutral.surface1,
                                border: `1px solid ${tokens.color.neutral.fill}`,
                                borderRadius: '4px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                padding: '0 12px',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = tokens.color.neutral.surface2;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = tokens.color.neutral.surface1;
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: 'TikTok Sans Text, sans-serif',
                                  fontSize: '14px',
                                  fontStyle: 'normal',
                                  fontWeight: 500,
                                  lineHeight: '20px',
                                  letterSpacing: '0.0938px',
                                  color: tokens.color.neutral.highOnSurface,
                                  margin: 0,
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                Add media
                              </p>
                              <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 16 16" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg" 
                                style={{ 
                                  flexShrink: 0,
                                  transform: isMediaUploadDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s'
                                }}
                              >
                                <path d="M4 6L8 10L12 6" stroke={tokens.color.neutral.highOnSurface} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                      </button>
                            {isMediaUploadDropdownOpen && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '100%',
                                  right: 0,
                                  marginTop: '4px',
                                  background: tokens.color.neutral.surface,
                                  border: `1px solid ${tokens.color.neutral.fillLow}`,
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                  zIndex: 1000,
                                  minWidth: '160px',
                                  overflow: 'hidden'
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsMediaUploadDropdownOpen(false);
                                    mediaFileInputRef.current?.click();
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: 'transparent',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontFamily: 'TikTok Sans Text, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    color: tokens.color.neutral.highOnSurface
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = tokens.color.neutral.surface2;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                  }}
                                >
                                  Add from file
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsMediaUploadDropdownOpen(false);
                                    setIsAddFromUrlPopoverOpen(true);
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: 'transparent',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontFamily: 'TikTok Sans Text, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    color: tokens.color.neutral.highOnSurface
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = tokens.color.neutral.surface2;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                  }}
                                >
                                  Add from URL
                                </button>
                              </div>
                            )}
                            {/* Popover positioned outside dropdown */}
                            {isAddFromUrlPopoverOpen && (
                              <div
                                ref={addFromUrlPopoverRef}
                                style={{
                                  position: 'absolute',
                                  top: '100%',
                                  right: 0,
                                  marginTop: '4px',
                                  background: tokens.color.neutral.surface,
                                  border: `1px solid ${tokens.color.neutral.fillLow}`,
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                  zIndex: 1001,
                                  padding: '12px',
                                  minWidth: '280px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px'
                                }}
                              >
                                  <input
                                    type="text"
                                    placeholder="Input media URL"
                                    value={mediaUrlInput}
                                    onChange={(e) => setMediaUrlInput(e.target.value)}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      border: `1px solid ${tokens.color.neutral.fillLow}`,
                                      borderRadius: '4px',
                                      fontFamily: 'TikTok Sans Text, sans-serif',
                                      fontSize: '14px',
                                      lineHeight: '20px',
                                      color: tokens.color.neutral.highOnSurface,
                                      outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = tokens.color.primary.fill;
                                      e.target.style.boxShadow = `0 0 0 1px ${tokens.color.primary.fill}`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = tokens.color.neutral.fillLow;
                                      e.target.style.boxShadow = 'none';
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        // Handle URL submission
                                        setIsAddFromUrlPopoverOpen(false);
                                        setMediaUrlInput('');
                                      } else if (e.key === 'Escape') {
                                        setIsAddFromUrlPopoverOpen(false);
                                        setMediaUrlInput('');
                                      }
                                    }}
                                  />
                                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsAddFromUrlPopoverOpen(false);
                                        setMediaUrlInput('');
                                      }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        padding: 0,
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = tokens.color.neutral.surface2;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                      }}
                                    >
                                      <SymbolsCloseCloseSmall 
                                        size="16"
                                        style={{ color: tokens.color.neutral.highOnSurface }}
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        // Handle URL submission
                                        if (mediaUrlInput.trim() && selectedProductId) {
                                          try {
                                            // Fetch the URL
                                            const response = await fetch(mediaUrlInput.trim());
                                            if (!response.ok) {
                                              throw new Error('Failed to fetch URL');
                                            }
                                            
                                            // Get content type from response
                                            const contentType = response.headers.get('content-type') || '';
                                            const blob = await response.blob();
                                            
                                            // Determine file type and extension
                                            let isImage = false;
                                            let isVideo = false;
                                            let fileExtension = '';
                                            
                                            if (contentType.startsWith('image/')) {
                                              isImage = true;
                                              fileExtension = contentType.split('/')[1] || 'jpg';
                                            } else if (contentType.startsWith('video/')) {
                                              isVideo = true;
                                              fileExtension = contentType.split('/')[1] || 'mp4';
                                            } else {
                                              // Try to determine from URL extension
                                              const urlLower = mediaUrlInput.toLowerCase();
                                              const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
                                              const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv'];
                                              
                                              if (imageExtensions.some(ext => urlLower.includes(ext))) {
                                                isImage = true;
                                                fileExtension = urlLower.split('.').pop() || 'jpg';
                                              } else if (videoExtensions.some(ext => urlLower.includes(ext))) {
                                                isVideo = true;
                                                fileExtension = urlLower.split('.').pop() || 'mp4';
                                              } else {
                                                // Default to image if can't determine
                                                isImage = true;
                                                fileExtension = 'jpg';
                                              }
                                            }
                                            
                                            // Create File object from blob
                                            const fileName = `media-${Date.now()}.${fileExtension}`;
                                            const file = new File([blob], fileName, { type: contentType || (isImage ? 'image/jpeg' : 'video/mp4') });
                                            
                                            // Create object URL for preview
                                            const url = URL.createObjectURL(file);
                                            const fileId = `${Date.now()}-${Math.random()}`;
                                            
                                            if (isImage) {
                                              const newImage = { file, url, progress: 0, isUploading: true, id: fileId };
                                              updateProductImages(selectedProductId, (prev) => [...prev, newImage]);
                                              
                                              // Simulate upload progress
                                              const duration = 1000;
                                              const interval = 16;
                                              const steps = duration / interval;
                                              let currentStep = 0;
                                              
                                              const updateProgress = () => {
                                                currentStep++;
                                                const progress = Math.min(100, (currentStep / steps) * 100);
                                                const isComplete = progress >= 100;
                                                
                                                updateProductImages(selectedProductId, (prev) => {
                                                  const imageExists = prev.some(img => img.id === fileId);
                                                  if (!imageExists) return prev;
                                                  
                                                  const updated = prev.map(img => 
                                                    img.id === fileId ? { ...img, progress: isComplete ? 100 : progress, isUploading: !isComplete } : img
                                                  );
                                                  
                                                  if (isComplete && updated.length > 0 && updated[0] && !updated[0].isUploading) {
                                                    const firstImageUrl = updated[0].url;
                                                    setProducts(prevProducts => 
                                                      prevProducts.map(p => 
                                                        p.id === selectedProductId 
                                                          ? { ...p, imageUrl: firstImageUrl }
                                                          : p
                                                      )
                                                    );
                                                  }
                                                  
                                                  return updated;
                                                });
                                                
                                                if (!isComplete) {
                                                  setTimeout(updateProgress, interval);
                                                }
                                              };
                                              
                                              setTimeout(updateProgress, interval);
                                            } else if (isVideo) {
                                              const newVideo = { file, url, progress: 0, isUploading: true, id: fileId };
                                              updateProductVideos(selectedProductId, (prev) => [...prev, newVideo]);
                                              
                                              // Simulate upload progress
                                              const duration = 1000;
                                              const interval = 16;
                                              const steps = duration / interval;
                                              let currentStep = 0;
                                              
                                              const updateProgress = () => {
                                                currentStep++;
                                                const progress = Math.min(100, (currentStep / steps) * 100);
                                                const isComplete = progress >= 100;
                                                
                                                updateProductVideos(selectedProductId, (prev) => {
                                                  const videoExists = prev.some(vid => vid.id === fileId);
                                                  if (!videoExists) return prev;
                                                  
                                                  return prev.map(vid => 
                                                    vid.id === fileId ? { ...vid, progress: isComplete ? 100 : progress, isUploading: !isComplete } : vid
                                                  );
                                                });
                                                
                                                if (!isComplete) {
                                                  setTimeout(updateProgress, interval);
                                                }
                                              };
                                              
                                              setTimeout(updateProgress, interval);
                                            }
                                            
                                            setIsAddFromUrlPopoverOpen(false);
                                            setMediaUrlInput('');
                                          } catch (error) {
                                            console.error('Error fetching URL:', error);
                                            // You could show an error message to the user here
                                            alert('Failed to fetch media from URL. Please check the URL and try again.');
                                          }
                                        }
                                      }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        padding: 0,
                                        background: tokens.color.primary.fill,
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = tokens.color.primary.onSurface;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = tokens.color.primary.fill;
                                      }}
                                    >
                                      <SymbolsCheckCheckMark 
                                        size="16"
                                        style={{ color: tokens.color.primary.surface }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Show uploader if no images or videos */}
                        {(!getProductImages(selectedProductId).length && !getProductVideos(selectedProductId).length) ? (
                          <div
                            style={{
                              width: '100%',
                              height: '180px',
                              border: `1px dashed ${isDragging ? '#009995' : '#D3D4D5'}`,
                              borderRadius: '4px',
                              background: uploadBackground,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'border-color 0.2s, background-color 0.2s',
                              marginBottom: '24px'
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDragOver(e);
                            }}
                            onDragLeave={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDragLeave(e);
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMediaDrop(e);
                            }}
                            onMouseEnter={(e) => {
                              if (!isDragging) {
                                e.currentTarget.style.borderColor = '#009995';
                                e.currentTarget.style.background = '#F0FDFC';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isDragging) {
                                e.currentTarget.style.borderColor = '#D3D4D5';
                                e.currentTarget.style.background = uploadBackground;
                              }
                            }}
                            onClick={() => {
                              mediaFileInputRef.current?.click();
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17 8L12 3L7 8" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 3V15" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans, sans-serif',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '20px',
                                letterSpacing: '0.0938px',
                                color: '#6D6E70',
                                margin: 0,
                                textAlign: 'center'
                              }}
                            >
                              <span>Drop files here, or </span>
                              <span style={{ color: '#017976' }}>click to upload</span>
                            </p>
                          </div>
                        ) : (
                          <>
                            {/* Images Section - only show if there are images */}
                            {getProductImages(selectedProductId).length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 500,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.highOnSurface,
                                          margin: 0
                                        }}
                                      >
                                        Product images
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start' }}>
                                    {/* Uploaded Image Thumbnails */}
                                    {getProductImages(selectedProductId).map((image, index) => (
                              <div 
                                key={image.id || index} 
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  width: '100px', 
                                  position: 'relative',
                                  opacity: draggedImageIndex === index ? 0.5 : 1,
                                  transition: 'opacity 0.2s'
                                }}
                                draggable={!image.isUploading}
                                onDragStart={(e) => {
                                  setDraggedImageIndex(index);
                                  e.dataTransfer.effectAllowed = 'move';
                                  e.dataTransfer.setData('text/html', index.toString());
                                }}
                                onDragEnd={() => {
                                  setDraggedImageIndex(null);
                                  setDragOverIndex(null);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = 'move';
                                  if (draggedImageIndex !== null && draggedImageIndex !== index) {
                                    setDragOverIndex(index);
                                  }
                                }}
                                onDragLeave={() => {
                                  setDragOverIndex(null);
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const draggedIndex = draggedImageIndex;
                                  const dropIndex = index;
                                  
                                  if (draggedIndex !== null && draggedIndex !== dropIndex && selectedProductId) {
                                    // Update both images array and imageUrl in a single state update
                                    setProducts(prevProducts => {
                                      return prevProducts.map(p => {
                                        if (p.id === selectedProductId) {
                                          const currentImages = p.images || [];
                                          const newImages = [...currentImages];
                                          const [draggedImage] = newImages.splice(draggedIndex, 1);
                                          newImages.splice(dropIndex, 0, draggedImage);
                                          
                                          // Update imageUrl to match the first image (if it exists and is not uploading)
                                          const newImageUrl = newImages.length > 0 && newImages[0] && !newImages[0].isUploading
                                            ? newImages[0].url
                                            : undefined;
                                          
                                          return {
                                            ...p,
                                            images: newImages,
                                            imageUrl: newImageUrl
                                          };
                                        }
                                        return p;
                                      });
                                    });
                                  }
                                  setDraggedImageIndex(null);
                                  setDragOverIndex(null);
                                }}
                              >
                                <div
                                  style={{
                                    aspectRatio: '1/1',
                                    border: `1px solid ${dragOverIndex === index ? tokens.color.primary.fill : tokens.color.neutral.fillLow}`,
                                    borderRadius: '4px',
                                    width: '100%',
                                    height: '100px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: tokens.color.neutral.surface1,
                                    transition: 'border-color 0.2s'
                                  }}
                                  onMouseEnter={() => setHoveredImageId(image.id || `${index}`)}
                                  onMouseLeave={() => setHoveredImageId(null)}
                                >
                                  {image.isUploading ? (
                                    <>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.onSurface,
                                          margin: 0,
                                          textAlign: 'center',
                                          zIndex: 1,
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)'
                                        }}
                                      >
                                        {Math.round(image.progress)}%
                                      </p>
                                      {/* Progress Bar */}
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: '0px',
                                          left: '0px',
                                          width: '100%',
                                          height: '8px',
                                          backgroundColor: '#ECECED',
                                          borderRadius: '0 0 4px 4px',
                                          overflow: 'hidden',
                                          zIndex: 10,
                                          display: 'block',
                                          pointerEvents: 'none'
                                        }}
                                        data-testid="progress-bar-container"
                                      >
                                        <div
                                          style={{
                                            width: `${image.progress || 0}%`,
                                            height: '100%',
                                            backgroundColor: '#009995',
                                            borderRadius: '0 0 4px 4px',
                                            transition: 'width 0.05s linear',
                                            display: 'block',
                                            boxSizing: 'border-box'
                                          }}
                                          data-testid="progress-bar-fill"
                                          data-progress={image.progress}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={image.url}
                                        alt={`Uploaded image ${index + 1}`}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover'
                                        }}
                                      />
                                      {/* Main Tag - only on first image (index 0), hidden only when that image is being dragged */}
                                      {index === 0 && draggedImageIndex !== 0 && (
                                        <div
                                          style={{
                                            position: 'absolute',
                                            left: '6px',
                                            top: '7px',
                                            background: tokens.color.primary.surface3,
                                            borderRadius: '4px',
                                            padding: '2px 6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            zIndex: 3
                                          }}
                                        >
                                          <p
                                            style={{
                                              fontFamily: 'TikTok Sans Text, sans-serif',
                                              fontSize: '12px',
                                              fontStyle: 'normal',
                                              fontWeight: 500,
                                              lineHeight: '16px',
                                              letterSpacing: '0.1608px',
                                              color: tokens.color.primary.onSurface,
                                              margin: 0,
                                              whiteSpace: 'nowrap'
                                            }}
                                          >
                                            Main
                                          </p>
                                        </div>
                                      )}
                                      {/* Hover Overlay */}
                                      {hoveredImageId === (image.id || `${index}`) && !image.isUploading && (
                                        <>
                                          <div
                                            style={{
                                              position: 'absolute',
                                              top: '0',
                                              left: '0',
                                              width: '100%',
                                              height: '100%',
                                              backgroundColor: '#262627',
                                              opacity: 0.5,
                                              borderRadius: '4px',
                                              zIndex: 2,
                                              pointerEvents: 'none'
                                            }}
                                          />
                                          {/* Grab Handle Button */}
                                          <button
                                            type="button"
                                            style={{
                                              position: 'absolute',
                                              top: '6px',
                                              right: '6px',
                                              width: '24px',
                                              height: '24px',
                                              background: tokens.color.neutral.surface1,
                                              border: `1px solid ${tokens.color.neutral.fill}`,
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'grab',
                                              zIndex: 3,
                                              padding: 0,
                                              transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = '#EAEAEA';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = tokens.color.neutral.surface1;
                                            }}
                                            onMouseDown={(e) => {
                                              e.currentTarget.style.cursor = 'grabbing';
                                            }}
                                            onMouseUp={(e) => {
                                              e.currentTarget.style.cursor = 'grab';
                                            }}
                                            onDragStart={(e) => {
                                              // Allow drag to propagate to parent
                                              e.stopPropagation();
                                            }}
                                            onClick={(e) => {
                                              // Prevent click from interfering with drag
                                              e.stopPropagation();
                                            }}
                                          >
                                            <FormattingMoveDragItem size="14" style={{ color: tokens.color.neutral.highOnSurface }} />
                                          </button>
                                          {/* Delete Button */}
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (!selectedProductId) return;
                                              
                                              updateProductImages(selectedProductId, (prev) => {
                                                // Revoke the URL to free memory
                                                URL.revokeObjectURL(image.url);
                                                // Filter out the image being deleted
                                                const updated = image.id
                                                  ? prev.filter(img => img.id !== image.id)
                                                  : prev.filter((_, i) => i !== index);
                                                
                                                // If all images are deleted, clear the product's imageUrl
                                                if (updated.length === 0) {
                                                  setProducts(prevProducts =>
                                                    prevProducts.map(p =>
                                                      p.id === selectedProductId
                                                        ? { ...p, imageUrl: undefined }
                                                        : p
                                                    )
                                                  );
                                                }
                                                
                                                return updated;
                                              });
                                            }}
                                            style={{
                                              position: 'absolute',
                                              bottom: '6px',
                                              right: '6px',
                                              width: '24px',
                                              height: '24px',
                                              background: tokens.color.neutral.surface1,
                                              border: `1px solid ${tokens.color.neutral.fill}`,
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'pointer',
                                              zIndex: 3,
                                              padding: 0,
                                              transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = '#EAEAEA';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = tokens.color.neutral.surface1;
                                            }}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                              <path d="M6.74854 7.6626C7.16275 7.6626 7.49854 7.99838 7.49854 8.4126V12.6909C7.49844 13.1051 7.16269 13.4409 6.74854 13.4409C6.33448 13.4408 5.99863 13.105 5.99854 12.6909V8.4126C5.99854 7.99846 6.33443 7.66272 6.74854 7.6626Z" fill="#121415"/>
                                              <path d="M9.25635 7.66162C9.67023 7.66183 10.0061 7.99775 10.0063 8.41162V12.6899C10.0063 13.104 9.67039 13.4397 9.25635 13.4399C8.84213 13.4399 8.50635 13.1042 8.50635 12.6899V8.41162C8.5066 7.99762 8.84229 7.66162 9.25635 7.66162Z" fill="#121415"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M9.03662 0.214355C9.25366 0.241692 9.44961 0.363466 9.5708 0.549316L10.5737 2.0874C10.6265 2.16836 10.6608 2.25595 10.6792 2.34521H13.2642C13.818 2.34521 14.2671 2.79428 14.2671 3.34814V5.00146L14.2622 5.104C14.2139 5.57579 13.8386 5.95082 13.3667 5.99854L13.2642 6.00439H12.9194L12.1011 14.8442L12.0874 14.9429C11.9971 15.431 11.5872 15.7915 11.103 15.7915H4.89697L4.80127 15.7876C4.3595 15.7438 3.99691 15.3986 3.9126 14.9429L3.89893 14.8442L3.08057 6.00439H2.73584L2.6333 5.99854C2.16153 5.95064 1.78602 5.57567 1.73779 5.104L1.73291 5.00146V3.34814C1.73291 2.82888 2.12758 2.40143 2.6333 2.3501L2.73584 2.34521H5.32178C5.34022 2.25603 5.37355 2.1683 5.42627 2.0874L6.4292 0.549316L6.48486 0.473145C6.62626 0.306395 6.83538 0.208561 7.05713 0.208496H8.94287L9.03662 0.214355ZM5.354 14.2915H10.646L11.4136 6.01123H4.58643L5.354 14.2915ZM3.23291 4.50439H12.7671V3.84521H3.23291V4.50439ZM7.04834 2.34521H8.95166L8.53662 1.7085H7.46338L7.04834 2.34521Z" fill="#121415"/>
                                            </svg>
                                          </button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                                <p
                                  style={{
                                  fontFamily: 'TikTok Sans, sans-serif',
                                  fontSize: '12px',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  lineHeight: '16px',
                                    letterSpacing: '0.1608px',
                                    color: tokens.color.neutral.highOnSurface,
                                    margin: 0,
                                    marginTop: '4px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%'
                                  }}
                                >
                                  {image.file.name}
                                </p>
                              </div>
                                    ))}
                            </div>
                                </div>
                              </div>
                            )}

                            {/* Videos Section - only show if there are videos */}
                            {getProductVideos(selectedProductId).length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 500,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.highOnSurface,
                                          margin: 0
                                        }}
                                      >
                                        Videos
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start' }}>
                                    {/* Uploaded Video Thumbnails */}
                                    {getProductVideos(selectedProductId).map((video, index) => (
                              <div key={video.id || index} style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
                                <div
                                  style={{
                                    width: '100px',
                                    height: '100px',
                                    border: `1px solid ${tokens.color.neutral.fillLow}`,
                                    borderRadius: '4px',
                                    background: tokens.color.neutral.surface1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                  }}
                                  onMouseEnter={() => setHoveredVideoId(video.id || `${index}`)}
                                  onMouseLeave={() => setHoveredVideoId(null)}
                                >
                                  {video.isUploading === true ? (
                                    <>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.onSurface,
                                          margin: 0,
                                          textAlign: 'center',
                                          zIndex: 1
                                        }}
                                      >
                                        {Math.round(video.progress)}%
                                      </p>
                                      {/* Progress Bar */}
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: '0px',
                                          left: '0px',
                                          width: '100%',
                                          height: '8px',
                                          backgroundColor: '#ECECED',
                                          borderRadius: '0 0 4px 4px',
                                          overflow: 'hidden',
                                          zIndex: 10,
                                          display: 'block',
                                          pointerEvents: 'none'
                                        }}
                                        data-testid="progress-bar-container"
                                      >
                                        <div
                                          style={{
                                            width: `${video.progress || 0}%`,
                                            height: '100%',
                                            backgroundColor: '#009995',
                                            borderRadius: '0 0 4px 4px',
                                            transition: 'width 0.05s linear',
                                            display: 'block',
                                            boxSizing: 'border-box'
                                          }}
                                          data-testid="progress-bar-fill"
                                          data-progress={video.progress}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <video
                                        src={video.url}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover'
                                        }}
                                      />
                                      {/* Hover Overlay */}
                                      {hoveredVideoId === (video.id || `${index}`) && !video.isUploading && (
                                        <>
                                          <div
                                            style={{
                                              position: 'absolute',
                                              top: '0',
                                              left: '0',
                                              width: '100%',
                                              height: '100%',
                                              backgroundColor: '#262627',
                                              opacity: 0.5,
                                              borderRadius: '4px',
                                              zIndex: 2,
                                              pointerEvents: 'none'
                                            }}
                                          />
                                          {/* Delete Button */}
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (!selectedProductId) return;
                                              
                                              updateProductVideos(selectedProductId, (prev) => {
                                                // Revoke the URL to free memory
                                                URL.revokeObjectURL(video.url);
                                                // Filter out the video being deleted
                                                return video.id
                                                  ? prev.filter(vid => vid.id !== video.id)
                                                  : prev.filter((_, i) => i !== index);
                                              });
                                            }}
                                            style={{
                                              position: 'absolute',
                                              bottom: '6px',
                                              right: '6px',
                                              width: '24px',
                                              height: '24px',
                                              background: tokens.color.neutral.surface1,
                                              border: `1px solid ${tokens.color.neutral.fill}`,
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'pointer',
                                              zIndex: 3,
                                              padding: 0,
                                              transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = '#EAEAEA';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = tokens.color.neutral.surface1;
                                            }}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                              <path d="M6.74854 7.6626C7.16275 7.6626 7.49854 7.99838 7.49854 8.4126V12.6909C7.49844 13.1051 7.16269 13.4409 6.74854 13.4409C6.33448 13.4408 5.99863 13.105 5.99854 12.6909V8.4126C5.99854 7.99846 6.33443 7.66272 6.74854 7.6626Z" fill="#121415"/>
                                              <path d="M9.25635 7.66162C9.67023 7.66183 10.0061 7.99775 10.0063 8.41162V12.6899C10.0063 13.104 9.67039 13.4397 9.25635 13.4399C8.84213 13.4399 8.50635 13.1042 8.50635 12.6899V8.41162C8.5066 7.99762 8.84229 7.66162 9.25635 7.66162Z" fill="#121415"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M9.03662 0.214355C9.25366 0.241692 9.44961 0.363466 9.5708 0.549316L10.5737 2.0874C10.6265 2.16836 10.6608 2.25595 10.6792 2.34521H13.2642C13.818 2.34521 14.2671 2.79428 14.2671 3.34814V5.00146L14.2622 5.104C14.2139 5.57579 13.8386 5.95082 13.3667 5.99854L13.2642 6.00439H12.9194L12.1011 14.8442L12.0874 14.9429C11.9971 15.431 11.5872 15.7915 11.103 15.7915H4.89697L4.80127 15.7876C4.3595 15.7438 3.99691 15.3986 3.9126 14.9429L3.89893 14.8442L3.08057 6.00439H2.73584L2.6333 5.99854C2.16153 5.95064 1.78602 5.57567 1.73779 5.104L1.73291 5.00146V3.34814C1.73291 2.82888 2.12758 2.40143 2.6333 2.3501L2.73584 2.34521H5.32178C5.34022 2.25603 5.37355 2.1683 5.42627 2.0874L6.4292 0.549316L6.48486 0.473145C6.62626 0.306395 6.83538 0.208561 7.05713 0.208496H8.94287L9.03662 0.214355ZM5.354 14.2915H10.646L11.4136 6.01123H4.58643L5.354 14.2915ZM3.23291 4.50439H12.7671V3.84521H3.23291V4.50439ZM7.04834 2.34521H8.95166L8.53662 1.7085H7.46338L7.04834 2.34521Z" fill="#121415"/>
                                            </svg>
                          </button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontFamily: 'TikTok Sans, sans-serif',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '16px',
                                    letterSpacing: '0.1608px',
                                    color: tokens.color.neutral.highOnSurface,
                                    margin: 0,
                                    marginTop: '4px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%'
                                  }}
                                >
                                  {video.file.name}
                                </p>
                              </div>
                                    ))}
                                  </div>
                                </div>
                      </div>
                    )}
                          </>
                        )}
                        {/* Hidden file input - always available for dropdown */}
                        <input
                          ref={mediaFileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleMediaFileChange}
                          style={{ display: 'none' }}
                        />
                  </div>

                      {/* Divider Line */}
                      <div style={{
                        height: '1px',
                        background: '#D3D4D5',
                        width: '100%',
                        marginTop: (!getProductImages(selectedProductId).length && !getProductVideos(selectedProductId).length) ? '0px' : '24px'
                      }} />

                      {/* Tab Content */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '24px', 
                          paddingTop: '24px', 
                          paddingBottom: '24px'
                        }}
                      >
                        <style>{`
                          input::placeholder,
                          textarea::placeholder {
                            color: rgba(109, 110, 112, 1);
                          }
                        `}</style>
                        
                        {/* Product Info Tab */}
                        <div ref={productInfoRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Product info
                            </p>
                            {[
                              'Hotel ID (SKU ID)',
                              'Hotel Name',
                              'Link',
                              'Brand',
                              'Description'
                            ].map((fieldName) => {
                              const fieldKey = getFieldKey(fieldName);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={fieldName} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <label
                                    style={{
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: 500,
                                      lineHeight: '20px',
                                      letterSpacing: '0.0938px',
                                      color: '#121415'
                                    }}
                                  >
                                    {fieldName}
                                  </label>
                                  {fieldName === 'Description' ? (
                                    <textarea
                                      className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                      style={{
                                        width: '100%',
                                        minHeight: '104px',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        resize: 'vertical'
                                      }}
                                      placeholder=""
                                      value={fieldValue as string}
                                      onChange={(e) => {
                                        updateProductField(fieldKey, e.target.value);
                                      }}
                                    />
                                  ) : (
                                    <input
                                      type="text"
                                      className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                      style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px'
                                      }}
                                      placeholder={fieldName === 'Link' ? 'http://' : ''}
                                      value={fieldValue as string}
                                      onChange={(e) => {
                                        updateProductField(fieldKey, e.target.value);
                                      }}
                                    />
                                  )}
                </div>
                              );
                            })}
                          </div>

                        {/* Divider Line */}
                        <div style={{
                          height: '1px',
                          background: '#D3D4D5',
                          width: '100%'
                        }} />

                        {/* Location Tab */}
                        <div ref={locationRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Location
                            </p>
                            {[
                              { name: 'Latitude', optional: false },
                              { name: 'Longitude', optional: false },
                              { name: 'Neighborhood', optional: false },
                              { name: 'Address', optional: false },
                              { name: 'City', optional: false },
                              { name: 'Country', optional: false },
                              { name: 'Region', optional: true },
                              { name: 'Postal code', optional: true },
                              { name: 'Secondary Address', optional: true },
                              { name: 'Tertiary Address', optional: true }
                            ].map((field) => {
                              const fieldKey = getFieldKey(field.name);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <label
                                      style={{
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        letterSpacing: '0.0938px',
                                        color: '#121415'
                                      }}
                                    >
                                      {field.name}
                                    </label>
                                    {field.optional && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#87898B' }} />
                                        <span
                                          style={{
                                            fontFamily: 'TikTok Sans, sans-serif',
                                            fontSize: '12px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '16px',
                                            letterSpacing: '0.1608px',
                                            color: '#87898B'
                                          }}
                                        >
                                          Optional
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      borderWidth: '1px',
                                      borderRadius: '4px',
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px'
                                    }}
                                    placeholder=""
                                    value={fieldValue as string}
                                    onChange={(e) => {
                                      updateProductField(fieldKey, e.target.value);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>

                        {/* Divider Line */}
                        <div style={{
                          height: '1px',
                          background: '#D3D4D5',
                          width: '100%'
                        }} />

                        {/* Pricing Tab */}
                        <div ref={pricingRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Pricing
                            </p>
                            {[
                              { name: 'Base price', optional: false },
                              { name: 'Lowest Base Price', optional: true },
                              { name: 'Sale Price', optional: true }
                            ].map((field) => {
                              const fieldKey = getFieldKey(field.name);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <label
                                      style={{
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        letterSpacing: '0.0938px',
                                        color: '#121415'
                                      }}
                                    >
                                      {field.name}
                                    </label>
                                    {field.optional && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#87898B' }} />
                                        <span
                                          style={{
                                            fontFamily: 'TikTok Sans, sans-serif',
                                            fontSize: '12px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '16px',
                                            letterSpacing: '0.1608px',
                                            color: '#87898B'
                                          }}
                                        >
                                          Optional
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      borderWidth: '1px',
                                      borderRadius: '4px',
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px'
                                    }}
                                    placeholder=""
                                    value={fieldValue as string}
                                    onChange={(e) => {
                                      updateProductField(fieldKey, e.target.value);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>

                        {/* Divider Line */}
                        <div style={{
                          height: '1px',
                          background: '#D3D4D5',
                          width: '100%'
                        }} />

                        {/* Additional Info Tab */}
                        <div ref={additionalInfoRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Additional info
                            </p>
                            {[
                              { name: 'Category', isDropdown: true },
                              { name: 'Priority', isDropdown: true },
                              { name: 'Room Type', isDropdown: true },
                              { name: 'Loyalty Program', isDropdown: false },
                              { name: 'Margin Level', isDropdown: false },
                              { name: 'Star Rating', isDropdown: true },
                              { name: 'Guest Rating System', isDropdown: true },
                              { name: 'Number of Raters', isDropdown: false },
                              { name: 'Guest Rating Score', isDropdown: false },
                              { name: 'Guest Rating Max Score', isDropdown: false },
                              { name: 'Custom Label 0', isDropdown: false },
                              { name: 'Custom Label 1', isDropdown: false },
                              { name: 'Custom Label 2', isDropdown: false },
                              { name: 'Custom Label 3', isDropdown: false },
                              { name: 'Custom Label 4', isDropdown: false },
                              { name: 'Internal Label 0', isDropdown: false },
                              { name: 'Internal Label 1', isDropdown: false }
                            ].map((field) => {
                              const fieldKey = getFieldKey(field.name);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <label
                                      style={{
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        letterSpacing: '0.0938px',
                                        color: '#121415'
                                      }}
                                    >
                                      {field.name}
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#87898B' }} />
                                      <span
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '12px',
                                          fontStyle: 'normal',
                                          fontWeight: 500,
                                          lineHeight: '16px',
                                          letterSpacing: '0.1608px',
                                          color: '#87898B'
                                        }}
                                      >
                                        Optional
                                      </span>
                                    </div>
                                  </div>
                                  {field.isDropdown ? (
                                    <div
                                      className="border border-[#D3D4D5] bg-white focus-within:outline-none focus-within:ring-1 focus-within:ring-[#009995] focus-within:border-transparent"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <span style={{ flex: 1, color: fieldValue ? '#121415' : 'rgba(109, 110, 112, 1)', fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px' }}>
                                        {fieldValue || 'Select'}
                                      </span>
                                      <ChevronDown style={{ width: '20px', height: '20px', strokeWidth: 1.5, color: 'rgba(109, 110, 112, 1)' }} />
                                    </div>
                                  ) : (
                                    <input
                                      type="text"
                                      className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                      style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px'
                                      }}
                                      placeholder=""
                                      value={fieldValue as string}
                                      onChange={(e) => {
                                        updateProductField(fieldKey, e.target.value);
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#6D6E70',
                        fontFamily: 'TikTok Sans, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      Select a product from the list to edit
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {/* Permissions card - separate card that appears when catalog type is selected */}
            {!isCatalogTypeSelectionView && !isManuallyAddView && !isDataFeedView && catalogType && (catalogType !== 'auto' || catalogSubtype) && !(catalogType === 'ecommerce' && syncFromPartnerPlatform) && (
              <div 
                className="flex flex-col gap-4"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: collapsedCards.has('permissions') ? 0 : undefined }}>
                  <h2
                    style={{
                      color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                      fontFamily: 'TikTok Sans Display, sans-serif',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '28px',
                      letterSpacing: '0.3px',
                      margin: 0,
                      flex: '1 0 0'
                    }}
                  >
                    Business center and Permissions
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setCollapsedCards(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has('permissions')) {
                            newSet.delete('permissions');
                          } else {
                            newSet.add('permissions');
                          }
                          return newSet;
                        });
                      }}
                      style={{
                        background: tokens.color.neutral.transparentFill,
                        cursor: 'pointer',
                        display: 'flex',
                        gap: tokens.spacing['2-5'],
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: tokens.spacing['0-5'],
                        border: 'none',
                        minWidth: '20px',
                        minHeight: '20px',
                      }}
                    >
                      {collapsedCards.has('permissions') ? (
                        <ArrowsChevronDown size="16" style={{ color: '#121415' }} />
                      ) : (
                        <ArrowsChevronUp size="16" style={{ color: '#121415' }} />
                      )}
                    </button>
                  </div>
                </div>
                {!collapsedCards.has('permissions') && (
                <>
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.094px'
                    }}
                  >
                    Business Center account
                  </label>
                  <div className="relative" ref={businessCenterRef} style={{ width: '100%', maxWidth: '600px' }}>
                    <button
                      type="button"
                      onClick={() => setIsBusinessCenterOpen(!isBusinessCenterOpen)}
                      className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                      style={{
                        borderRadius: '4px',
                        borderWidth: '1px',
                        fontSize: '14px',
                        padding: '8px 12px',
                        color: businessCenter ? '#121415' : 'rgba(109, 110, 112, 1)'
                      }}
                    >
                      <span>{businessCenter || 'Select a Business Center'}</span>
                      <ChevronDown 
                        className={`transition-transform ${isBusinessCenterOpen ? 'rotate-180' : ''}`}
                        style={{ 
                          width: '20px', 
                          height: '20px',
                          strokeWidth: 1.5,
                          color: 'rgba(109, 110, 112, 1)'
                        }}
                      />
                    </button>
                    {isBusinessCenterOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 z-50"
                        style={{
                          display: 'flex',
                          width: '100%',
                          minWidth: '120px',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          borderRadius: '8px',
                          background: '#FFF',
                          boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                          padding: '4px'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setBusinessCenter('Business Center 1');
                            setIsBusinessCenterOpen(false);
                          }}
                          className="w-full text-left transition-colors"
                          style={{
                            display: 'flex',
                            padding: '8px',
                            alignItems: 'center',
                            gap: '8px',
                            alignSelf: 'stretch',
                            borderRadius: '4px',
                            background: '#FFF'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F1F2F2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FFF';
                          }}
                        >
                          <span style={{ fontSize: '14px', color: '#121415' }}>Business Center 1</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBusinessCenter('Business Center 2');
                            setIsBusinessCenterOpen(false);
                          }}
                          className="w-full text-left transition-colors"
                          style={{
                            display: 'flex',
                            padding: '8px',
                            alignItems: 'center',
                            gap: '8px',
                            alignSelf: 'stretch',
                            borderRadius: '4px',
                            background: '#FFF'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F1F2F2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FFF';
                          }}
                        >
                          <span style={{ fontSize: '14px', color: '#121415' }}>Business Center 2</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBusinessCenter('Business Center 3');
                            setIsBusinessCenterOpen(false);
                          }}
                          className="w-full text-left transition-colors"
                          style={{
                            display: 'flex',
                            padding: '8px',
                            alignItems: 'center',
                            gap: '8px',
                            alignSelf: 'stretch',
                            borderRadius: '4px',
                            background: '#FFF'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F1F2F2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FFF';
                          }}
                        >
                          <span style={{ fontSize: '14px', color: '#121415' }}>Business Center 3</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* User permissions and Permission level - only show when business center is selected */}
                {businessCenter && (
                  <div className="flex flex-col gap-4" style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-start gap-2 self-stretch flex-1">
                        <label 
                          className="text-[#121415]"
                          style={{
                            fontVariantNumeric: 'lining-nums tabular-nums',
                            fontFamily: 'TikTok Sans, sans-serif',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '20px',
                            letterSpacing: '0.094px'
                          }}
                        >
                          User permissions
                        </label>
                        <div className="relative w-full" ref={userPermissionsRef} style={{ maxWidth: '600px' }}>
                          <button
                            type="button"
                            onClick={() => setIsUserPermissionsOpen(!isUserPermissionsOpen)}
                            className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                            style={{
                              borderRadius: '4px',
                              borderWidth: '1px',
                              fontSize: '14px',
                              padding: '8px 12px',
                              color: userPermissions ? '#121415' : 'rgba(109, 110, 112, 1)'
                            }}
                          >
                            <span>{userPermissions || 'Select user permissions'}</span>
                            <ChevronDown 
                              className={`transition-transform ${isUserPermissionsOpen ? 'rotate-180' : ''}`}
                              style={{ 
                                width: '20px', 
                                height: '20px',
                                strokeWidth: 1.5,
                                color: 'rgba(109, 110, 112, 1)'
                              }}
                            />
                          </button>
                          {isUserPermissionsOpen && (
                            <div
                              className="absolute top-full left-0 mt-1 z-50"
                              style={{
                                display: 'flex',
                                width: '100%',
                                minWidth: '120px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderRadius: '8px',
                                background: '#FFF',
                                boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                                padding: '4px'
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setUserPermissions('User 1');
                                  setIsUserPermissionsOpen(false);
                                }}
                                className="w-full text-left transition-colors"
                                style={{
                                  display: 'flex',
                                  padding: '8px',
                                  alignItems: 'center',
                                  gap: '8px',
                                  alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF';
                                }}
                              >
                                <span style={{ fontSize: '14px', color: '#121415' }}>User 1</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setUserPermissions('User 2');
                                  setIsUserPermissionsOpen(false);
                                }}
                                className="w-full text-left transition-colors"
                                style={{
                                  display: 'flex',
                                  padding: '8px',
                                  alignItems: 'center',
                                  gap: '8px',
                                  alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF';
                                }}
                              >
                                <span style={{ fontSize: '14px', color: '#121415' }}>User 2</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setUserPermissions('User 3');
                                  setIsUserPermissionsOpen(false);
                                }}
                                className="w-full text-left transition-colors"
                                style={{
                                  display: 'flex',
                                  padding: '8px',
                                  alignItems: 'center',
                                  gap: '8px',
                                  alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF';
                                }}
                              >
                                <span style={{ fontSize: '14px', color: '#121415' }}>User 3</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 self-stretch flex-1">
                        <label 
                          className="text-[#121415]"
                          style={{
                            fontVariantNumeric: 'lining-nums tabular-nums',
                            fontFamily: 'TikTok Sans, sans-serif',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '20px',
                            letterSpacing: '0.094px'
                          }}
                        >
                          Permission level
                        </label>
                        <div className="relative w-full" ref={permissionLevelRef} style={{ maxWidth: '600px' }}>
                          <button
                            type="button"
                            onClick={() => setIsPermissionLevelOpen(!isPermissionLevelOpen)}
                            className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                            style={{
                              borderRadius: '4px',
                              borderWidth: '1px',
                              fontSize: '14px',
                              padding: '8px 12px',
                              color: permissionLevel ? '#121415' : 'rgba(109, 110, 112, 1)'
                            }}
                          >
                            <span>{permissionLevel || 'Select permission level'}</span>
                            <ChevronDown 
                              className={`transition-transform ${isPermissionLevelOpen ? 'rotate-180' : ''}`}
                              style={{ 
                                width: '20px', 
                                height: '20px',
                                strokeWidth: 1.5,
                                color: 'rgba(109, 110, 112, 1)'
                              }}
                            />
                          </button>
                          {isPermissionLevelOpen && (
                            <div
                              className="absolute top-full left-0 mt-1 z-50"
                              style={{
                                display: 'flex',
                                width: '100%',
                                minWidth: '120px',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                borderRadius: '8px',
                                background: '#FFF',
                                boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                                padding: '4px'
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setPermissionLevel('Admin');
                                  setIsPermissionLevelOpen(false);
                                }}
                                className="w-full text-left transition-colors"
                                style={{
                                  display: 'flex',
                                  padding: '8px',
                                  alignItems: 'center',
                                  gap: '8px',
                                  alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF';
                                }}
                              >
                                <span style={{ fontSize: '14px', color: '#121415' }}>Admin</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setPermissionLevel('Editor');
                                  setIsPermissionLevelOpen(false);
                                }}
                                className="w-full text-left transition-colors"
                                style={{
                                  display: 'flex',
                                  padding: '8px',
                                  alignItems: 'center',
                                  gap: '8px',
                                  alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF';
                                }}
                              >
                                <span style={{ fontSize: '14px', color: '#121415' }}>Editor</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setPermissionLevel('Viewer');
                                  setIsPermissionLevelOpen(false);
                                }}
                                className="w-full text-left transition-colors"
                                style={{
                                  display: 'flex',
                                  padding: '8px',
                                  alignItems: 'center',
                                  gap: '8px',
                                  alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: '#FFF',
                                  flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F1F2F2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#FFF';
                                }}
                              >
                                <span style={{ fontSize: '14px', color: '#121415' }}>Viewer</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Default location and Default currency - only show when business center is selected */}
                {businessCenter && (
                  <div className="flex flex-col gap-4" style={{ width: '100%', maxWidth: '600px' }}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-start gap-2 self-stretch flex-1">
                      <label 
                        className="text-[#121415]"
                        style={{
                          fontVariantNumeric: 'lining-nums tabular-nums',
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '20px',
                          letterSpacing: '0.094px'
                        }}
                      >
                        Default location
                      </label>
                      <div className="relative w-full" ref={defaultLocationRef} style={{ maxWidth: '600px' }}>
                        <button
                          type="button"
                          onClick={() => setIsDefaultLocationOpen(!isDefaultLocationOpen)}
                          className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                          style={{
                            borderRadius: '4px',
                            borderWidth: '1px',
                            fontSize: '14px',
                            padding: '8px 12px',
                            color: defaultLocation ? '#121415' : 'rgba(109, 110, 112, 1)'
                          }}
                        >
                          <span>{defaultLocation || 'Select a location'}</span>
                          <ChevronDown 
                            className={`transition-transform ${isDefaultLocationOpen ? 'rotate-180' : ''}`}
                            style={{ 
                              width: '20px', 
                              height: '20px',
                              strokeWidth: 1.5,
                              color: 'rgba(109, 110, 112, 1)'
                            }}
                          />
                        </button>
                        {isDefaultLocationOpen && (
                          <div
                            ref={defaultLocationDropdownRef}
                            className="absolute left-0 z-50"
                            style={{
                              ...(defaultLocationDropdownShouldOpenUp ? {
                                bottom: '100%',
                                marginBottom: '4px'
                              } : {
                                top: '100%',
                                marginTop: '4px'
                              }),
                              display: 'flex',
                              width: '100%',
                              minWidth: '120px',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              borderRadius: '8px',
                              background: '#FFF',
                              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                              padding: '4px',
                              maxHeight: '400px',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Search input */}
                            <div style={{ padding: '8px', width: '100%', borderBottom: '1px solid #F1F2F2' }}>
                              <input
                                type="text"
                                placeholder="Search countries..."
                                value={defaultLocationSearch}
                                onChange={(e) => setDefaultLocationSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  border: '1px solid #D3D4D5',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  fontFamily: 'TikTok Sans, sans-serif',
                                  color: '#121415',
                                  outline: 'none'
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = '#009995';
                                  e.target.style.boxShadow = '0 0 0 1px #009995';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = '#D3D4D5';
                                  e.target.style.boxShadow = 'none';
                                }}
                              />
                            </div>
                            {/* Scrollable country list */}
                            <div
                              style={{
                                width: '100%',
                                maxHeight: '340px',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                scrollbarGutter: 'stable'
                              }}
                            >
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                            <button
                                    key={country}
                              type="button"
                              onClick={() => {
                                      setDefaultLocation(country);
                                      // Auto-select currency based on country
                                      const currency = countryToCurrency[country];
                                      if (currency) {
                                        setDefaultCurrency(currency);
                                      } else {
                                        // If country not in mapping, clear currency
                                        setDefaultCurrency('');
                                      }
                                setIsDefaultLocationOpen(false);
                                      setDefaultLocationSearch('');
                              }}
                              className="w-full text-left transition-colors"
                              style={{
                                display: 'flex',
                                padding: '8px',
                                alignItems: 'center',
                                gap: '8px',
                                alignSelf: 'stretch',
                                      borderRadius: '4px',
                                      background: '#FFF',
                                      flexShrink: 0
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#F1F2F2';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#FFF';
                              }}
                            >
                                    <span style={{ fontSize: '14px', color: '#121415' }}>{country}</span>
                            </button>
                                ))
                              ) : (
                                <div style={{ padding: '8px', color: '#6D6E70', fontSize: '14px' }}>
                                  No countries found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 self-stretch flex-1">
                      <label 
                        className="text-[#121415]"
                        style={{
                          fontVariantNumeric: 'lining-nums tabular-nums',
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '20px',
                          letterSpacing: '0.094px'
                        }}
                      >
                        Default currency
                      </label>
                      <div className="relative w-full" ref={defaultCurrencyRef} style={{ maxWidth: '600px' }}>
                        <button
                          type="button"
                          onClick={() => setIsDefaultCurrencyOpen(!isDefaultCurrencyOpen)}
                          className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                          style={{
                            borderRadius: '4px',
                            borderWidth: '1px',
                            fontSize: '14px',
                            padding: '8px 12px',
                            color: defaultCurrency ? '#121415' : 'rgba(109, 110, 112, 1)'
                          }}
                        >
                          <span>{defaultCurrency || 'Select a currency'}</span>
                          <ChevronDown 
                            className={`transition-transform ${isDefaultCurrencyOpen ? 'rotate-180' : ''}`}
                            style={{ 
                              width: '20px', 
                              height: '20px',
                              strokeWidth: 1.5,
                              color: 'rgba(109, 110, 112, 1)'
                            }}
                          />
                        </button>
                        {isDefaultCurrencyOpen && (
                          <div
                            ref={defaultCurrencyDropdownRef}
                            className="absolute left-0 z-50"
                            style={{
                              ...(defaultCurrencyDropdownShouldOpenUp ? {
                                bottom: '100%',
                                marginBottom: '4px'
                              } : {
                                top: '100%',
                                marginTop: '4px'
                              }),
                              display: 'flex',
                              width: '100%',
                              minWidth: '120px',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              borderRadius: '8px',
                              background: '#FFF',
                              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                              padding: '4px',
                              maxHeight: '400px',
                              overflowY: 'auto',
                              overflowX: 'hidden',
                              scrollbarGutter: 'stable'
                            }}
                          >
                            {allCurrencies.map((currency) => (
                            <button
                                key={currency}
                              type="button"
                              onClick={() => {
                                  setDefaultCurrency(currency);
                                setIsDefaultCurrencyOpen(false);
                              }}
                              className="w-full text-left transition-colors"
                              style={{
                                display: 'flex',
                                padding: '8px',
                                alignItems: 'center',
                                gap: '8px',
                                alignSelf: 'stretch',
                                  borderRadius: '4px',
                                  background: defaultCurrency === currency ? '#F1F2F2' : '#FFF',
                                  flexShrink: 0
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#F1F2F2';
                              }}
                              onMouseLeave={(e) => {
                                  e.currentTarget.style.background = defaultCurrency === currency ? '#F1F2F2' : '#FFF';
                              }}
                            >
                                <span style={{ fontSize: '14px', color: '#121415' }}>{currency}</span>
                            </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                    </div>
                  )}
                </>
                )}
              </div>
            )}
            {/* Product Source card - appears when catalog type is selected, but not when sync from partner platform toggle is checked */}
            {!isCatalogTypeSelectionView && !isManuallyAddView && !isDataFeedView && catalogType && (catalogType !== 'auto' || catalogSubtype) && !syncFromPartnerPlatform && (
              <div 
                className="flex flex-col gap-4"
                      style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: collapsedCards.has('product-source') ? 0 : undefined }}>
                  <h2
                    style={{
                      color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                      fontFamily: 'TikTok Sans Display, sans-serif',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '28px',
                      letterSpacing: '0.3px',
                      margin: 0,
                      flex: '1 0 0'
                    }}
                  >
                    Product Source
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        setCollapsedCards(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has('product-source')) {
                            newSet.delete('product-source');
                          } else {
                            newSet.add('product-source');
                          }
                          return newSet;
                        });
                      }}
                      style={{
                        background: tokens.color.neutral.transparentFill,
                        cursor: 'pointer',
                        display: 'flex',
                        gap: tokens.spacing['2-5'],
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: tokens.spacing['0-5'],
                        border: 'none',
                        minWidth: '20px',
                        minHeight: '20px',
                      }}
                    >
                      {collapsedCards.has('product-source') ? (
                        <ArrowsChevronDown size="16" style={{ color: '#121415' }} />
                      ) : (
                        <ArrowsChevronUp size="16" style={{ color: '#121415' }} />
                      )}
                    </button>
                  </div>
                </div>
                {!collapsedCards.has('product-source') && (
                <>
                <div className="relative" ref={productSourceRef} style={{ width: '100%', maxWidth: '600px' }}>
                  {productSource && uploadedFiles.length > 0 && productSource === uploadedFiles[0].name ? (
                    <div
                      className="w-full border border-[#D3D4D5] bg-white flex items-center gap-2"
                      style={{
                        borderRadius: '4px',
                        borderWidth: '1px',
                        padding: '8px 12px',
                        minHeight: '40px'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: '24px',
                          height: '24px',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexShrink: 0,
                          borderRadius: '4px',
                          border: '1px solid #D3D4D5',
                          background: '#F2F3F3'
                        }}
                      >
                        {renderFileIcon(uploadedFiles[0].name)}
                      </div>
                      <span
                        style={{
                          flex: 1,
                          overflow: 'hidden',
                          color: '#121415',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        fontFamily: 'TikTok Sans, sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px'
                      }}
                    >
                        {uploadedFiles[0].name}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFiles([]);
                          setIsUploadSuccessful(false);
                          setProductSource('');
                          setPartnerPlatform('');
                          setIsShopifyConnected(false);
                          setUploadProgress(0);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '2px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M0.145719 0.161822C0.340649 -0.0337714 0.657231 -0.0343096 0.852825 0.16062L9.61769 8.89573C9.81328 9.09066 9.81382 9.40724 9.61889 9.60284C9.42396 9.79843 9.10738 9.79897 8.91178 9.60404L0.146921 0.868928C-0.0486726 0.673998 -0.0492108 0.357416 0.145719 0.161822Z" fill="#262627"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M0.161796 9.61892C-0.033798 9.42399 -0.0343362 9.1074 0.160594 8.91181L8.8957 0.146948C9.09064 -0.0486459 9.40722 -0.0491841 9.60281 0.145746C9.79841 0.340675 9.79894 0.657258 9.60401 0.852851L0.868902 9.61771C0.673972 9.81331 0.35739 9.81385 0.161796 9.61892Z" fill="#262627"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (!isProductSourceOpen && productSourceRef.current) {
                          const rect = productSourceRef.current.getBoundingClientRect();
                          const spaceBelow = window.innerHeight - rect.bottom;
                          const spaceAbove = rect.top;
                          const dropdownHeight = 400;
                          setProductSourceDropdownUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
                        }
                        setIsProductSourceOpen(!isProductSourceOpen);
                      }}
                      className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                      style={{
                        borderRadius: '4px',
                          borderWidth: '1px',
                          fontSize: '14px',
                          padding: '8px 12px',
                          color: productSource ? '#121415' : 'rgba(109, 110, 112, 1)'
                        }}
                      >
                        <span>{productSource || 'Select a product source'}</span>
                        <ChevronDown 
                          className={`transition-transform ${isProductSourceOpen ? 'rotate-180' : ''}`}
                          style={{ 
                            width: '20px', 
                            height: '20px',
                            strokeWidth: 1.5,
                            color: 'rgba(109, 110, 112, 1)'
                          }}
                        />
                      </button>
                  )}
                      {isProductSourceOpen && (
                        <div
                      className="absolute left-0 z-50"
                          style={{
                            width: '100%',
                            minWidth: '120px',
                            borderRadius: '8px',
                            background: '#FFF',
                            boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                        padding: '4px',
                        maxHeight: '400px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        ...(productSourceDropdownUp 
                          ? { bottom: '100%', marginBottom: '4px' }
                          : { top: '100%', marginTop: '4px' }
                        )
                      }}
                    >
                      {[
                        { title: 'Sync from website', description: 'Connect a pixel to automatically add and update products from your website.', value: 'Sync from website' },
                        { title: 'Manually add', description: 'Fill out a simple form for each product that you want to add to your catalog.', value: 'Manually add' },
                        { title: 'Data feed schedule', description: 'Upload products from your file. Updates run automatically on your schedule.', value: 'Data feed schedule' },
                        { title: 'Upload file', description: 'Use a template to upload product files', value: 'Upload file' },
                        { title: 'Import from google', description: 'Use the google Merchant Center to import your product feeds.', value: 'Import from google' },
                        ...(catalogType === 'ecommerce' ? [{ title: 'Sync from a partner platform', description: 'Use a partner platform like Shopify or WooCommerce.', value: 'Sync from a partner platform' }] : [])
                      ].map((option) => (
                          <button
                          key={option.value}
                            type="button"
                            onClick={() => {
                            setProductSource(option.value);
                              setIsProductSourceOpen(false);
                            // Auto-initialize manually add products when selected (without navigating)
                            if (option.value === 'Manually add') {
                              initializeManuallyAddProducts();
                            }
                            // Clear partner platform if switching away from it
                            if (option.value !== 'Sync from a partner platform') {
                              setPartnerPlatform('');
                              setIsShopifyConnected(false);
                            }
                            // Reset business center and permissions when product source changes
                            setBusinessCenter('');
                            setDefaultLocation('');
                            setDefaultCurrency('');
                            setUserPermissions('');
                            setPermissionLevel('');
                            // Clear data connection if switching away from Sync from website
                            if (option.value !== 'Sync from website') {
                              setDataConnection('');
                            }
                            }}
                            className="w-full text-left transition-colors"
                            style={{
                              display: 'flex',
                              padding: '8px',
                              alignItems: 'center',
                              gap: '8px',
                              alignSelf: 'stretch',
                            borderRadius: '4px',
                            background: '#FFF',
                            flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#F1F2F2';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#FFF';
                            }}
                          >
                            <div className="flex flex-col items-start flex-1 min-w-0" style={{ gap: '2px' }}>
                              <div
                                style={{
                                  overflow: 'hidden',
                                  color: '#121415',
                                  textOverflow: 'ellipsis',
                                  fontFamily: 'TikTok Sans, sans-serif',
                                  fontSize: '14px',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  lineHeight: '20px',
                                  letterSpacing: '0.094px'
                                }}
                              >
                              {option.title}
                              </div>
                              <div
                                style={{
                                  overflow: 'hidden',
                                  color: '#6D6E70',
                                  textOverflow: 'ellipsis',
                                  fontFamily: 'TikTok Sans, sans-serif',
                                  fontSize: '12px',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  lineHeight: '16px',
                                  letterSpacing: '0.161px'
                                }}
                              >
                              {option.description}
                              </div>
                            </div>
                          </button>
                      ))}
                        </div>
                      )}
                    </div>
                </>
                )}
                  </div>
            )}
            {/* Manually Add card - appears when Manually add is selected as product source */}
            {!isCatalogTypeSelectionView && !isDataFeedView && productSource === 'Manually add' && (
              <div 
                className="flex flex-col"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%',
                  gap: '16px'
                }}
              >
                <h2
                  style={{
                    color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                    fontFamily: 'TikTok Sans Display, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    margin: 0
                  }}
                >
                  Manually Add
                </h2>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    height: '600px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Left Fixed Sidebar - Product List */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      width: '250px',
                      maxWidth: '500px',
                      flexShrink: 0,
                      background: '#FFFFFF',
                      height: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Product List Header */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '16px 12px 8px 12px',
                        flexShrink: 0
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '24px',
                          letterSpacing: '0.0304px',
                          color: '#121415',
                          margin: 0
                        }}
                      >
                        Product list
                      </h3>
                      <p
                        style={{
                          fontFamily: 'TikTok Sans, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                          letterSpacing: '0.0938px',
                          color: '#121415',
                          margin: 0
                        }}
                      >
                        Total × {products.length}
                      </p>
                </div>

                    {/* Product List Items - Scrollable */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        width: '100%',
                        flex: 1,
                        minHeight: 0,
                        overflowY: 'auto',
                        padding: '16px 12px'
                      }}
                    >
                      {products.map((product) => {
                        // Get the first uploaded image (main image) for the preview
                        // Priority: product.imageUrl > first uploaded image (if image is ready)
                        const productImages = product.images || [];
                        const productImageUrl = product.imageUrl || 
                          (productImages.length > 0 && !productImages[0].isUploading 
                            ? productImages[0].url 
                            : null);
                        
                        return (
                        <div
                          key={product.id}
                        >
                          <div
                            onClick={() => setSelectedProductId(product.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px',
                              cursor: 'pointer',
                              background: selectedProductId === product.id ? '#FFFFFF' : '#F8F8F9',
                              border: selectedProductId === product.id ? '1px solid #009995' : '1px solid transparent',
                              borderRadius: '4px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '4px',
                                  border: '1px solid #D3D4D5',
                                  background: '#F2F3F3',
                                  flexShrink: 0,
                                  overflow: 'hidden',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {productImageUrl ? (
                                  <img
                                    src={productImageUrl}
                                    alt={product.title || 'Product'}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      background: '#F2F3F3'
                                    }}
                                  />
                                )}
              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 }}>
                                {product.title ? (
                                  <p
                                    style={{
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: '20px',
                                      letterSpacing: '0.0938px',
                                      color: '#121415',
                                      margin: 0,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {product.title}
                                  </p>
                                ) : (
                                  <div
                                    style={{
                                      height: '14px',
                                      width: '80%',
                                      background: '#F1F2F2',
                                      borderRadius: '2px',
                                      margin: '3px 0'
                                    }}
                                  />
                                )}
                                {product.description ? (
                  <p
                    style={{
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '12px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: '16px',
                                      letterSpacing: '-0.12px',
                      color: '#6D6E70',
                                      margin: 0,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {product.description}
                                  </p>
                                ) : (
                                  <div
                                    style={{
                                      height: '12px',
                                      width: '60%',
                                      background: '#F1F2F2',
                                      borderRadius: '2px',
                                      margin: '2px 0'
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = products.findIndex(p => p.id === product.id);
                                const isSelected = selectedProductId === product.id;
                                
                                // Revoke URLs for images and videos before deleting
                                if (product.images) {
                                  product.images.forEach(img => URL.revokeObjectURL(img.url));
                                }
                                if (product.videos) {
                                  product.videos.forEach(vid => URL.revokeObjectURL(vid.url));
                                }
                                
                                // Filter out the deleted product
                                const updatedProducts = products.filter(p => p.id !== product.id);
                                setProducts(updatedProducts);
                                
                                // If the deleted product was selected, select the next product above (or below if no product above)
                                if (isSelected && updatedProducts.length > 0) {
                                  const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                                  setSelectedProductId(updatedProducts[nextIndex].id);
                                } else if (isSelected) {
                                  setSelectedProductId(null);
                                }
                                
                                // Clear main image when deleting a product
                                setMainImage(null);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginLeft: '8px'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L12 12M12 4L4 12" stroke="#87898B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={handleAddProduct}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          border: '1px solid #87898B',
                          background: '#F8F8F9',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ECECED';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#F8F8F9';
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 3.33333V12.6667" stroke="#262627" strokeWidth="1.33333" strokeLinecap="round"/>
                          <path d="M3.33333 8H12.6667" stroke="#262627" strokeWidth="1.33333" strokeLinecap="round"/>
                        </svg>
                        <span
                          style={{
                      fontFamily: 'TikTok Sans, sans-serif',
                      fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '20px',
                            letterSpacing: '0.0938px',
                            color: '#121415'
                          }}
                        >
                          Add product
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: '1px',
                      height: '100%',
                      background: '#D3D4D5',
                      flexShrink: 0,
                      position: 'sticky',
                      top: 0
                    }}
                  />

                  {/* Right Scrollable Product Details */}
                  <div
                    ref={tabContentScrollRef}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '606px',
                      padding: '0 12px',
                      flex: 1,
                      position: 'relative',
                      boxSizing: 'border-box',
                      overflowY: 'auto',
                      scrollbarGutter: 'stable'
                    }}
                  >
                    {selectedProductId ? (
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
                        {/* Sticky Tab Bar - at the top of the drawer */}
                        <div
                          style={{
                            background: '#FFFFFF',
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                            marginBottom: 0,
                            paddingTop: '16px',
                            paddingBottom: 0,
                            marginLeft: '-12px',
                            paddingLeft: '12px'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '24px',
                              borderBottom: '1px solid #D3D4D5'
                            }}
                          >
                            {[
                              { id: 'media', label: 'Media' },
                              { id: 'product-info', label: 'Product info' },
                              { id: 'location', label: 'Location' },
                              { id: 'pricing', label: 'Pricing' },
                              { id: 'additional-info', label: 'Additional info' }
                            ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                        <button
                                key={tab.id}
                          type="button"
                                onClick={() => {
                                  setActiveTab(tab.id as typeof activeTab);
                                  // Scroll to the corresponding section
                                  const refs: Record<string, React.RefObject<HTMLDivElement>> = {
                                    'media': mediaRef,
                                    'product-info': productInfoRef,
                                    'location': locationRef,
                                    'pricing': pricingRef,
                                    'additional-info': additionalInfoRef
                                  };
                                  const targetRef = refs[tab.id];
                                  if (targetRef?.current && tabContentScrollRef.current) {
                                    const scrollContainer = tabContentScrollRef.current;
                                    const targetElement = targetRef.current;
                                    
                                    // Set flag to prevent scroll detection from interfering
                                    isProgrammaticScrollRef.current = true;
                                    
                                    // Calculate scroll position more accurately
                                    const containerRect = scrollContainer.getBoundingClientRect();
                                    const targetRect = targetElement.getBoundingClientRect();
                                    const tabBarHeight = 54; // 36px tab + 16px padding + 2px border
                                    const spacing = 24;
                                    
                                    // Calculate the target scroll position
                                    const scrollPosition = scrollContainer.scrollTop + (targetRect.top - containerRect.top) - tabBarHeight - spacing;
                                    
                                    scrollContainer.scrollTo({
                                      top: Math.max(0, scrollPosition),
                                      behavior: 'smooth'
                                    });
                                    
                                    // Reset flag after smooth scroll completes (approximately 500ms for smooth scroll)
                                    setTimeout(() => {
                                      isProgrammaticScrollRef.current = false;
                                    }, 600);
                                  }
                                }}
                          style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  height: '36px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: 0,
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                                  position: 'relative',
                                  flexShrink: 0,
                                  width: 'auto'
                                }}
                            >
                              <span
                                style={{
                            fontFamily: 'TikTok Sans, sans-serif',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    letterSpacing: '0.0938px',
                                    color: isActive ? '#121415' : '#6D6E70',
                                    marginBottom: '2px'
                                  }}
                              >
                                {tab.label}
                              </span>
                              {isActive && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: '#009995'
                                  }}
                                />
                              )}
                              {!isActive && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'transparent'
                                  }}
                                />
                              )}
                            </button>
                          );
                        })}
                          </div>
                        </div>

                        {/* Media Section - Images and Videos */}
                        <div ref={mediaRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
                          {/* Media Section Header */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                              <p
                                style={{
                                  fontFamily: 'TikTok Sans Text, sans-serif',
                                  fontSize: '16px',
                                  fontStyle: 'normal',
                                  fontWeight: 500,
                                  lineHeight: '24px',
                                  letterSpacing: '0.0304px',
                                  color: '#000000',
                                  margin: 0
                                }}
                              >
                                Media
                              </p>
                              <p
                                style={{
                                  fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.094px',
                                  color: '#6D6E70',
                                  margin: 0
                                }}
                              >
                                Upload images or videos related to your product.
                              </p>
                            </div>
                            {/* Dropdown Button - only show when there are uploaded items */}
                            {(getProductImages(selectedProductId).length > 0 || getProductVideos(selectedProductId).length > 0) && (
                              <div style={{ position: 'relative', flexShrink: 0 }} data-dropdown-container>
                              <button
                                type="button"
                                onClick={() => setIsMediaUploadDropdownOpen(!isMediaUploadDropdownOpen)}
                                style={{
                                  background: tokens.color.neutral.surface1,
                                  border: `1px solid ${tokens.color.neutral.fill}`,
                                  borderRadius: '4px',
                                  height: '36px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  cursor: 'pointer',
                                  padding: '0 12px',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = tokens.color.neutral.surface2;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = tokens.color.neutral.surface1;
                                }}
                              >
                                <p
                                  style={{
                                    fontFamily: 'TikTok Sans Text, sans-serif',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: '20px',
                                    letterSpacing: '0.0938px',
                                    color: tokens.color.neutral.highOnSurface,
                                    margin: 0,
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  Add media
                                </p>
                                <svg 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 16 16" 
                                  fill="none" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  style={{ 
                                    flexShrink: 0,
                                    transform: isMediaUploadDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s'
                                  }}
                                >
                                  <path d="M4 6L8 10L12 6" stroke={tokens.color.neutral.highOnSurface} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                      </button>
                              {isMediaUploadDropdownOpen && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '4px',
                                    background: tokens.color.neutral.surface,
                                    border: `1px solid ${tokens.color.neutral.fillLow}`,
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000,
                                    minWidth: '160px',
                                    overflow: 'hidden'
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsMediaUploadDropdownOpen(false);
                                      mediaFileInputRef.current?.click();
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      background: 'transparent',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      fontFamily: 'TikTok Sans Text, sans-serif',
                                      fontSize: '14px',
                                      fontWeight: 400,
                                      lineHeight: '20px',
                                      color: tokens.color.neutral.highOnSurface
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = tokens.color.neutral.surface2;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent';
                                    }}
                                  >
                                    Add from file
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsMediaUploadDropdownOpen(false);
                                      setIsAddFromUrlPopoverOpen(true);
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      background: 'transparent',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      fontFamily: 'TikTok Sans Text, sans-serif',
                                      fontSize: '14px',
                                      fontWeight: 400,
                                      lineHeight: '20px',
                                      color: tokens.color.neutral.highOnSurface
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = tokens.color.neutral.surface2;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'transparent';
                                    }}
                                  >
                                    Add from URL
                                  </button>
                                </div>
                              )}
                              {/* Popover positioned outside dropdown */}
                              {isAddFromUrlPopoverOpen && (
                                <div
                                  ref={addFromUrlPopoverRef}
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '4px',
                                    background: tokens.color.neutral.surface,
                                    border: `1px solid ${tokens.color.neutral.fillLow}`,
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1001,
                                    padding: '12px',
                                    minWidth: '280px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px'
                                  }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Input media URL"
                                    value={mediaUrlInput}
                                    onChange={(e) => setMediaUrlInput(e.target.value)}
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      border: `1px solid ${tokens.color.neutral.fillLow}`,
                                      borderRadius: '4px',
                                      fontFamily: 'TikTok Sans Text, sans-serif',
                                      fontSize: '14px',
                                      lineHeight: '20px',
                                      color: tokens.color.neutral.highOnSurface,
                                      outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                      e.target.style.borderColor = tokens.color.primary.fill;
                                      e.target.style.boxShadow = `0 0 0 1px ${tokens.color.primary.fill}`;
                                    }}
                                    onBlur={(e) => {
                                      e.target.style.borderColor = tokens.color.neutral.fillLow;
                                      e.target.style.boxShadow = 'none';
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        // Handle URL submission
                                        setIsAddFromUrlPopoverOpen(false);
                                        setMediaUrlInput('');
                                      } else if (e.key === 'Escape') {
                                        setIsAddFromUrlPopoverOpen(false);
                                        setMediaUrlInput('');
                                      }
                                    }}
                                  />
                                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsAddFromUrlPopoverOpen(false);
                                        setMediaUrlInput('');
                                      }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        padding: 0,
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = tokens.color.neutral.surface2;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                      }}
                                    >
                                      <SymbolsCloseCloseSmall 
                                        size="16"
                                        style={{ color: tokens.color.neutral.highOnSurface }}
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        // Handle URL submission
                                        if (mediaUrlInput.trim() && selectedProductId) {
                                          try {
                                            // Fetch the URL
                                            const response = await fetch(mediaUrlInput.trim());
                                            if (!response.ok) {
                                              throw new Error('Failed to fetch URL');
                                            }
                                            
                                            // Get content type from response
                                            const contentType = response.headers.get('content-type') || '';
                                            const blob = await response.blob();
                                            
                                            // Determine file type and extension
                                            let isImage = false;
                                            let isVideo = false;
                                            let fileExtension = '';
                                            
                                            if (contentType.startsWith('image/')) {
                                              isImage = true;
                                              fileExtension = contentType.split('/')[1] || 'jpg';
                                            } else if (contentType.startsWith('video/')) {
                                              isVideo = true;
                                              fileExtension = contentType.split('/')[1] || 'mp4';
                                            } else {
                                              // Try to determine from URL extension
                                              const urlLower = mediaUrlInput.toLowerCase();
                                              const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
                                              const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv'];
                                              
                                              if (imageExtensions.some(ext => urlLower.includes(ext))) {
                                                isImage = true;
                                                fileExtension = urlLower.split('.').pop() || 'jpg';
                                              } else if (videoExtensions.some(ext => urlLower.includes(ext))) {
                                                isVideo = true;
                                                fileExtension = urlLower.split('.').pop() || 'mp4';
                                              } else {
                                                // Default to image if can't determine
                                                isImage = true;
                                                fileExtension = 'jpg';
                                              }
                                            }
                                            
                                            // Create File object from blob
                                            const fileName = `media-${Date.now()}.${fileExtension}`;
                                            const file = new File([blob], fileName, { type: contentType || (isImage ? 'image/jpeg' : 'video/mp4') });
                                            
                                            // Create object URL for preview
                                            const url = URL.createObjectURL(file);
                                            const fileId = `${Date.now()}-${Math.random()}`;
                                            
                                            if (isImage) {
                                              const newImage = { file, url, progress: 0, isUploading: true, id: fileId };
                                              updateProductImages(selectedProductId, (prev) => [...prev, newImage]);
                                              
                                              // Simulate upload progress
                                              const duration = 1000;
                                              const interval = 16;
                                              const steps = duration / interval;
                                              let currentStep = 0;
                                              
                                              const updateProgress = () => {
                                                currentStep++;
                                                const progress = Math.min(100, (currentStep / steps) * 100);
                                                const isComplete = progress >= 100;
                                                
                                                updateProductImages(selectedProductId, (prev) => {
                                                  const imageExists = prev.some(img => img.id === fileId);
                                                  if (!imageExists) return prev;
                                                  
                                                  const updated = prev.map(img => 
                                                    img.id === fileId ? { ...img, progress: isComplete ? 100 : progress, isUploading: !isComplete } : img
                                                  );
                                                  
                                                  if (isComplete && updated.length > 0 && updated[0] && !updated[0].isUploading) {
                                                    const firstImageUrl = updated[0].url;
                                                    setProducts(prevProducts => 
                                                      prevProducts.map(p => 
                                                        p.id === selectedProductId 
                                                          ? { ...p, imageUrl: firstImageUrl }
                                                          : p
                                                      )
                                                    );
                                                  }
                                                  
                                                  return updated;
                                                });
                                                
                                                if (!isComplete) {
                                                  setTimeout(updateProgress, interval);
                                                }
                                              };
                                              
                                              setTimeout(updateProgress, interval);
                                            } else if (isVideo) {
                                              const newVideo = { file, url, progress: 0, isUploading: true, id: fileId };
                                              updateProductVideos(selectedProductId, (prev) => [...prev, newVideo]);
                                              
                                              // Simulate upload progress
                                              const duration = 1000;
                                              const interval = 16;
                                              const steps = duration / interval;
                                              let currentStep = 0;
                                              
                                              const updateProgress = () => {
                                                currentStep++;
                                                const progress = Math.min(100, (currentStep / steps) * 100);
                                                const isComplete = progress >= 100;
                                                
                                                updateProductVideos(selectedProductId, (prev) => {
                                                  const videoExists = prev.some(vid => vid.id === fileId);
                                                  if (!videoExists) return prev;
                                                  
                                                  return prev.map(vid => 
                                                    vid.id === fileId ? { ...vid, progress: isComplete ? 100 : progress, isUploading: !isComplete } : vid
                                                  );
                                                });
                                                
                                                if (!isComplete) {
                                                  setTimeout(updateProgress, interval);
                                                }
                                              };
                                              
                                              setTimeout(updateProgress, interval);
                                            }
                                            
                                            setIsAddFromUrlPopoverOpen(false);
                                            setMediaUrlInput('');
                                          } catch (error) {
                                            console.error('Error fetching URL:', error);
                                            // You could show an error message to the user here
                                            alert('Failed to fetch media from URL. Please check the URL and try again.');
                                          }
                                        }
                                      }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '32px',
                                        height: '32px',
                                        padding: 0,
                                        background: tokens.color.primary.fill,
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = tokens.color.primary.onSurface;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = tokens.color.primary.fill;
                                      }}
                                    >
                                      <SymbolsCheckCheckMark 
                                        size="16"
                                        style={{ color: tokens.color.primary.surface }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Show uploader if no images or videos */}
                        {(!getProductImages(selectedProductId).length && !getProductVideos(selectedProductId).length) ? (
                          <div
                            style={{
                              width: '100%',
                              height: '180px',
                              border: `1px dashed ${isDragging ? '#009995' : '#D3D4D5'}`,
                              borderRadius: '4px',
                              background: uploadBackground,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'border-color 0.2s, background-color 0.2s',
                              marginBottom: '24px'
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDragOver(e);
                            }}
                            onDragLeave={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDragLeave(e);
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleMediaDrop(e);
                            }}
                            onMouseEnter={(e) => {
                              if (!isDragging) {
                                e.currentTarget.style.borderColor = '#009995';
                                e.currentTarget.style.background = '#F0FDFC';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isDragging) {
                                e.currentTarget.style.borderColor = '#D3D4D5';
                                e.currentTarget.style.background = uploadBackground;
                              }
                            }}
                            onClick={() => {
                              mediaFileInputRef.current?.click();
                            }}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M17 8L12 3L7 8" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 3V15" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans, sans-serif',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '20px',
                                letterSpacing: '0.0938px',
                                color: '#6D6E70',
                                margin: 0,
                                textAlign: 'center'
                              }}
                            >
                              <span>Drop files here, or </span>
                              <span style={{ color: '#017976' }}>click to upload</span>
                            </p>
                          </div>
                        ) : (
                          <>
                            {/* Images Section - only show if there are images */}
                            {getProductImages(selectedProductId).length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 500,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.highOnSurface,
                                          margin: 0
                                        }}
                                      >
                                        Product images
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start' }}>
                                    {/* Uploaded Image Thumbnails */}
                                    {getProductImages(selectedProductId).map((image, index) => (
                              <div 
                                key={image.id || index} 
                                style={{ 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  width: '100px', 
                                  position: 'relative',
                                  opacity: draggedImageIndex === index ? 0.5 : 1,
                                  transition: 'opacity 0.2s'
                                }}
                                draggable={!image.isUploading}
                                onDragStart={(e) => {
                                  setDraggedImageIndex(index);
                                  e.dataTransfer.effectAllowed = 'move';
                                  e.dataTransfer.setData('text/html', index.toString());
                                }}
                                onDragEnd={() => {
                                  setDraggedImageIndex(null);
                                  setDragOverIndex(null);
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  e.dataTransfer.dropEffect = 'move';
                                  if (draggedImageIndex !== null && draggedImageIndex !== index) {
                                    setDragOverIndex(index);
                                  }
                                }}
                                onDragLeave={() => {
                                  setDragOverIndex(null);
                                }}
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const draggedIndex = draggedImageIndex;
                                  const dropIndex = index;
                                  
                                  if (draggedIndex !== null && draggedIndex !== dropIndex && selectedProductId) {
                                    // Update both images array and imageUrl in a single state update
                                    setProducts(prevProducts => {
                                      return prevProducts.map(p => {
                                        if (p.id === selectedProductId) {
                                          const currentImages = p.images || [];
                                          const newImages = [...currentImages];
                                          const [draggedImage] = newImages.splice(draggedIndex, 1);
                                          newImages.splice(dropIndex, 0, draggedImage);
                                          
                                          // Update imageUrl to match the first image (if it exists and is not uploading)
                                          const newImageUrl = newImages.length > 0 && newImages[0] && !newImages[0].isUploading
                                            ? newImages[0].url
                                            : undefined;
                                          
                                          return {
                                            ...p,
                                            images: newImages,
                                            imageUrl: newImageUrl
                                          };
                                        }
                                        return p;
                                      });
                                    });
                                  }
                                  setDraggedImageIndex(null);
                                  setDragOverIndex(null);
                                }}
                              >
                                <div
                                  style={{
                                    aspectRatio: '1/1',
                                    border: `1px solid ${dragOverIndex === index ? tokens.color.primary.fill : tokens.color.neutral.fillLow}`,
                                    borderRadius: '4px',
                                    width: '100%',
                                    height: '100px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: tokens.color.neutral.surface1,
                                    transition: 'border-color 0.2s'
                                  }}
                                  onMouseEnter={() => setHoveredImageId(image.id || `${index}`)}
                                  onMouseLeave={() => setHoveredImageId(null)}
                                >
                                  {image.isUploading ? (
                                    <>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.onSurface,
                                          margin: 0,
                                          textAlign: 'center',
                                          zIndex: 1,
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)'
                                        }}
                                      >
                                        {Math.round(image.progress)}%
                                      </p>
                                      {/* Progress Bar */}
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: '0px',
                                          left: '0px',
                                          width: '100%',
                                          height: '8px',
                                          backgroundColor: '#ECECED',
                                          borderRadius: '0 0 4px 4px',
                                          overflow: 'hidden',
                                          zIndex: 10,
                                          display: 'block',
                                          pointerEvents: 'none'
                                        }}
                                        data-testid="progress-bar-container"
                                      >
                                        <div
                                          style={{
                                            width: `${image.progress || 0}%`,
                                            height: '100%',
                                            backgroundColor: '#009995',
                                            borderRadius: '0 0 4px 4px',
                                            transition: 'width 0.05s linear',
                                            display: 'block',
                                            boxSizing: 'border-box'
                                          }}
                                          data-testid="progress-bar-fill"
                                          data-progress={image.progress}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={image.url}
                                        alt={`Uploaded image ${index + 1}`}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover'
                                        }}
                                      />
                                      {/* Main Tag - only on first image (index 0), hidden only when that image is being dragged */}
                                      {index === 0 && draggedImageIndex !== 0 && (
                                        <div
                                          style={{
                                            position: 'absolute',
                                            left: '6px',
                                            top: '7px',
                                            background: tokens.color.primary.surface3,
                                            borderRadius: '4px',
                                            padding: '2px 6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            zIndex: 3
                                          }}
                                        >
                                          <p
                                            style={{
                                              fontFamily: 'TikTok Sans Text, sans-serif',
                                              fontSize: '12px',
                                              fontStyle: 'normal',
                                              fontWeight: 500,
                                              lineHeight: '16px',
                                              letterSpacing: '0.1608px',
                                              color: tokens.color.primary.onSurface,
                                              margin: 0,
                                              whiteSpace: 'nowrap'
                                            }}
                                          >
                                            Main
                                          </p>
                                        </div>
                                      )}
                                      {/* Hover Overlay */}
                                      {hoveredImageId === (image.id || `${index}`) && !image.isUploading && (
                                        <>
                                          <div
                                            style={{
                                              position: 'absolute',
                                              top: '0',
                                              left: '0',
                                              width: '100%',
                                              height: '100%',
                                              backgroundColor: '#262627',
                                              opacity: 0.5,
                                              borderRadius: '4px',
                                              zIndex: 2,
                                              pointerEvents: 'none'
                                            }}
                                          />
                                          {/* Grab Handle Button */}
                                          <button
                                            type="button"
                                            style={{
                                              position: 'absolute',
                                              top: '6px',
                                              right: '6px',
                                              width: '24px',
                                              height: '24px',
                                              background: tokens.color.neutral.surface1,
                                              border: `1px solid ${tokens.color.neutral.fill}`,
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'grab',
                                              zIndex: 3,
                                              padding: 0,
                                              transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = '#EAEAEA';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = tokens.color.neutral.surface1;
                                            }}
                                            onMouseDown={(e) => {
                                              e.currentTarget.style.cursor = 'grabbing';
                                            }}
                                            onMouseUp={(e) => {
                                              e.currentTarget.style.cursor = 'grab';
                                            }}
                                            onDragStart={(e) => {
                                              // Allow drag to propagate to parent
                                              e.stopPropagation();
                                            }}
                                            onClick={(e) => {
                                              // Prevent click from interfering with drag
                                              e.stopPropagation();
                                            }}
                                          >
                                            <FormattingMoveDragItem size="14" style={{ color: tokens.color.neutral.highOnSurface }} />
                                          </button>
                                          {/* Delete Button */}
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (!selectedProductId) return;
                                              
                                              updateProductImages(selectedProductId, (prev) => {
                                                // Revoke the URL to free memory
                                                URL.revokeObjectURL(image.url);
                                                // Filter out the image being deleted
                                                const updated = image.id
                                                  ? prev.filter(img => img.id !== image.id)
                                                  : prev.filter((_, i) => i !== index);
                                                
                                                // If all images are deleted, clear the product's imageUrl
                                                if (updated.length === 0) {
                                                  setProducts(prevProducts =>
                                                    prevProducts.map(p =>
                                                      p.id === selectedProductId
                                                        ? { ...p, imageUrl: undefined }
                                                        : p
                                                    )
                                                  );
                                                }
                                                
                                                return updated;
                                              });
                                            }}
                                            style={{
                                              position: 'absolute',
                                              bottom: '6px',
                                              right: '6px',
                                              width: '24px',
                                              height: '24px',
                                              background: tokens.color.neutral.surface1,
                                              border: `1px solid ${tokens.color.neutral.fill}`,
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'pointer',
                                              zIndex: 3,
                                              padding: 0,
                                              transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = '#EAEAEA';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = tokens.color.neutral.surface1;
                                            }}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                              <path d="M6.74854 7.6626C7.16275 7.6626 7.49854 7.99838 7.49854 8.4126V12.6909C7.49844 13.1051 7.16269 13.4409 6.74854 13.4409C6.33448 13.4408 5.99863 13.105 5.99854 12.6909V8.4126C5.99854 7.99846 6.33443 7.66272 6.74854 7.6626Z" fill="#121415"/>
                                              <path d="M9.25635 7.66162C9.67023 7.66183 10.0061 7.99775 10.0063 8.41162V12.6899C10.0063 13.104 9.67039 13.4397 9.25635 13.4399C8.84213 13.4399 8.50635 13.1042 8.50635 12.6899V8.41162C8.5066 7.99762 8.84229 7.66162 9.25635 7.66162Z" fill="#121415"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M9.03662 0.214355C9.25366 0.241692 9.44961 0.363466 9.5708 0.549316L10.5737 2.0874C10.6265 2.16836 10.6608 2.25595 10.6792 2.34521H13.2642C13.818 2.34521 14.2671 2.79428 14.2671 3.34814V5.00146L14.2622 5.104C14.2139 5.57579 13.8386 5.95082 13.3667 5.99854L13.2642 6.00439H12.9194L12.1011 14.8442L12.0874 14.9429C11.9971 15.431 11.5872 15.7915 11.103 15.7915H4.89697L4.80127 15.7876C4.3595 15.7438 3.99691 15.3986 3.9126 14.9429L3.89893 14.8442L3.08057 6.00439H2.73584L2.6333 5.99854C2.16153 5.95064 1.78602 5.57567 1.73779 5.104L1.73291 5.00146V3.34814C1.73291 2.82888 2.12758 2.40143 2.6333 2.3501L2.73584 2.34521H5.32178C5.34022 2.25603 5.37355 2.1683 5.42627 2.0874L6.4292 0.549316L6.48486 0.473145C6.62626 0.306395 6.83538 0.208561 7.05713 0.208496H8.94287L9.03662 0.214355ZM5.354 14.2915H10.646L11.4136 6.01123H4.58643L5.354 14.2915ZM3.23291 4.50439H12.7671V3.84521H3.23291V4.50439ZM7.04834 2.34521H8.95166L8.53662 1.7085H7.46338L7.04834 2.34521Z" fill="#121415"/>
                                            </svg>
                                          </button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                                <p
                                  style={{
                                  fontFamily: 'TikTok Sans, sans-serif',
                                  fontSize: '12px',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  lineHeight: '16px',
                                    letterSpacing: '0.1608px',
                                    color: tokens.color.neutral.highOnSurface,
                                    margin: 0,
                                    marginTop: '4px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%'
                                  }}
                                >
                                  {image.file.name}
                                </p>
                              </div>
                                    ))}
                            </div>
                                </div>
                              </div>
                            )}

                            {/* Videos Section - only show if there are videos */}
                            {getProductVideos(selectedProductId).length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 500,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.highOnSurface,
                                          margin: 0
                                        }}
                                      >
                                        Videos
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'flex-start' }}>
                                    {/* Uploaded Video Thumbnails */}
                                    {getProductVideos(selectedProductId).map((video, index) => (
                              <div key={video.id || index} style={{ display: 'flex', flexDirection: 'column', width: '100px' }}>
                                <div
                                  style={{
                                    width: '100px',
                                    height: '100px',
                                    border: `1px solid ${tokens.color.neutral.fillLow}`,
                                    borderRadius: '4px',
                                    background: tokens.color.neutral.surface1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                  }}
                                  onMouseEnter={() => setHoveredVideoId(video.id || `${index}`)}
                                  onMouseLeave={() => setHoveredVideoId(null)}
                                >
                                  {video.isUploading === true ? (
                                    <>
                                      <p
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '14px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: '20px',
                                          letterSpacing: '0.0938px',
                                          color: tokens.color.neutral.onSurface,
                                          margin: 0,
                                          textAlign: 'center',
                                          zIndex: 1
                                        }}
                                      >
                                        {Math.round(video.progress)}%
                                      </p>
                                      {/* Progress Bar */}
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: '0px',
                                          left: '0px',
                                          width: '100%',
                                          height: '8px',
                                          backgroundColor: '#ECECED',
                                          borderRadius: '0 0 4px 4px',
                                          overflow: 'hidden',
                                          zIndex: 10,
                                          display: 'block',
                                          pointerEvents: 'none'
                                        }}
                                        data-testid="progress-bar-container"
                                      >
                                        <div
                                          style={{
                                            width: `${video.progress || 0}%`,
                                            height: '100%',
                                            backgroundColor: '#009995',
                                            borderRadius: '0 0 4px 4px',
                                            transition: 'width 0.05s linear',
                                            display: 'block',
                                            boxSizing: 'border-box'
                                          }}
                                          data-testid="progress-bar-fill"
                                          data-progress={video.progress}
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <video
                                        src={video.url}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover'
                                        }}
                                      />
                                      {/* Hover Overlay */}
                                      {hoveredVideoId === (video.id || `${index}`) && !video.isUploading && (
                                        <>
                                          <div
                                            style={{
                                              position: 'absolute',
                                              top: '0',
                                              left: '0',
                                              width: '100%',
                                              height: '100%',
                                              backgroundColor: '#262627',
                                              opacity: 0.5,
                                              borderRadius: '4px',
                                              zIndex: 2,
                                              pointerEvents: 'none'
                                            }}
                                          />
                                          {/* Delete Button */}
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (!selectedProductId) return;
                                              
                                              updateProductVideos(selectedProductId, (prev) => {
                                                // Revoke the URL to free memory
                                                URL.revokeObjectURL(video.url);
                                                // Filter out the video being deleted
                                                return video.id
                                                  ? prev.filter(vid => vid.id !== video.id)
                                                  : prev.filter((_, i) => i !== index);
                                              });
                                            }}
                                            style={{
                                              position: 'absolute',
                                              bottom: '6px',
                                              right: '6px',
                                              width: '24px',
                                              height: '24px',
                                              background: tokens.color.neutral.surface1,
                                              border: `1px solid ${tokens.color.neutral.fill}`,
                                              borderRadius: '4px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              cursor: 'pointer',
                                              zIndex: 3,
                                              padding: 0,
                                              transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.background = '#EAEAEA';
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.background = tokens.color.neutral.surface1;
                                            }}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                              <path d="M6.74854 7.6626C7.16275 7.6626 7.49854 7.99838 7.49854 8.4126V12.6909C7.49844 13.1051 7.16269 13.4409 6.74854 13.4409C6.33448 13.4408 5.99863 13.105 5.99854 12.6909V8.4126C5.99854 7.99846 6.33443 7.66272 6.74854 7.6626Z" fill="#121415"/>
                                              <path d="M9.25635 7.66162C9.67023 7.66183 10.0061 7.99775 10.0063 8.41162V12.6899C10.0063 13.104 9.67039 13.4397 9.25635 13.4399C8.84213 13.4399 8.50635 13.1042 8.50635 12.6899V8.41162C8.5066 7.99762 8.84229 7.66162 9.25635 7.66162Z" fill="#121415"/>
                                              <path fillRule="evenodd" clipRule="evenodd" d="M9.03662 0.214355C9.25366 0.241692 9.44961 0.363466 9.5708 0.549316L10.5737 2.0874C10.6265 2.16836 10.6608 2.25595 10.6792 2.34521H13.2642C13.818 2.34521 14.2671 2.79428 14.2671 3.34814V5.00146L14.2622 5.104C14.2139 5.57579 13.8386 5.95082 13.3667 5.99854L13.2642 6.00439H12.9194L12.1011 14.8442L12.0874 14.9429C11.9971 15.431 11.5872 15.7915 11.103 15.7915H4.89697L4.80127 15.7876C4.3595 15.7438 3.99691 15.3986 3.9126 14.9429L3.89893 14.8442L3.08057 6.00439H2.73584L2.6333 5.99854C2.16153 5.95064 1.78602 5.57567 1.73779 5.104L1.73291 5.00146V3.34814C1.73291 2.82888 2.12758 2.40143 2.6333 2.3501L2.73584 2.34521H5.32178C5.34022 2.25603 5.37355 2.1683 5.42627 2.0874L6.4292 0.549316L6.48486 0.473145C6.62626 0.306395 6.83538 0.208561 7.05713 0.208496H8.94287L9.03662 0.214355ZM5.354 14.2915H10.646L11.4136 6.01123H4.58643L5.354 14.2915ZM3.23291 4.50439H12.7671V3.84521H3.23291V4.50439ZM7.04834 2.34521H8.95166L8.53662 1.7085H7.46338L7.04834 2.34521Z" fill="#121415"/>
                                            </svg>
                          </button>
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                                <p
                                  style={{
                                    fontFamily: 'TikTok Sans, sans-serif',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '16px',
                                    letterSpacing: '0.1608px',
                                    color: tokens.color.neutral.highOnSurface,
                                    margin: 0,
                                    marginTop: '4px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%'
                                  }}
                                >
                                  {video.file.name}
                                </p>
                              </div>
                                    ))}
                                  </div>
                                </div>
                      </div>
                    )}
                          </>
                        )}
                        {/* Hidden file input - always available for dropdown */}
                        <input
                          ref={mediaFileInputRef}
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleMediaFileChange}
                          style={{ display: 'none' }}
                        />
                  </div>

                      {/* Divider Line */}
                      <div style={{
                        height: '1px',
                        background: '#D3D4D5',
                        width: '100%',
                        marginTop: (!getProductImages(selectedProductId).length && !getProductVideos(selectedProductId).length) ? '0px' : '24px'
                      }} />

                      {/* Tab Content */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '24px', 
                          paddingTop: '24px', 
                          paddingBottom: '24px'
                        }}
                      >
                        <style>{`
                          input::placeholder,
                          textarea::placeholder {
                            color: rgba(109, 110, 112, 1);
                          }
                        `}</style>
                        
                        {/* Product Info Tab */}
                        <div ref={productInfoRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Product info
                            </p>
                            {[
                              'Hotel ID (SKU ID)',
                              'Hotel Name',
                              'Link',
                              'Brand',
                              'Description'
                            ].map((fieldName) => {
                              const fieldKey = getFieldKey(fieldName);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={fieldName} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <label
                                    style={{
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: 500,
                                      lineHeight: '20px',
                                      letterSpacing: '0.0938px',
                                      color: '#121415'
                                    }}
                                  >
                                    {fieldName}
                                  </label>
                                  {fieldName === 'Description' ? (
                                    <textarea
                                      className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                      style={{
                                        width: '100%',
                                        minHeight: '104px',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        resize: 'vertical'
                                      }}
                                      placeholder=""
                                      value={fieldValue as string}
                                      onChange={(e) => {
                                        updateProductField(fieldKey, e.target.value);
                                      }}
                                    />
                                  ) : (
                                    <input
                                      type="text"
                                      className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                      style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px'
                                      }}
                                      placeholder={fieldName === 'Link' ? 'http://' : ''}
                                      value={fieldValue as string}
                                      onChange={(e) => {
                                        updateProductField(fieldKey, e.target.value);
                                      }}
                                    />
                                  )}
                </div>
                              );
                            })}
                          </div>

                        {/* Divider Line */}
                        <div style={{
                          height: '1px',
                          background: '#D3D4D5',
                          width: '100%'
                        }} />

                        {/* Location Tab */}
                        <div ref={locationRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Location
                            </p>
                            {[
                              { name: 'Latitude', optional: false },
                              { name: 'Longitude', optional: false },
                              { name: 'Neighborhood', optional: false },
                              { name: 'Address', optional: false },
                              { name: 'City', optional: false },
                              { name: 'Country', optional: false },
                              { name: 'Region', optional: true },
                              { name: 'Postal code', optional: true },
                              { name: 'Secondary Address', optional: true },
                              { name: 'Tertiary Address', optional: true }
                            ].map((field) => {
                              const fieldKey = getFieldKey(field.name);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <label
                                      style={{
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        letterSpacing: '0.0938px',
                                        color: '#121415'
                                      }}
                                    >
                                      {field.name}
                                    </label>
                                    {field.optional && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#87898B' }} />
                                        <span
                                          style={{
                                            fontFamily: 'TikTok Sans, sans-serif',
                                            fontSize: '12px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '16px',
                                            letterSpacing: '0.1608px',
                                            color: '#87898B'
                                          }}
                                        >
                                          Optional
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      borderWidth: '1px',
                                      borderRadius: '4px',
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px'
                                    }}
                                    placeholder=""
                                    value={fieldValue as string}
                                    onChange={(e) => {
                                      updateProductField(fieldKey, e.target.value);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>

                        {/* Divider Line */}
                        <div style={{
                          height: '1px',
                          background: '#D3D4D5',
                          width: '100%'
                        }} />

                        {/* Pricing Tab */}
                        <div ref={pricingRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Pricing
                            </p>
                            {[
                              { name: 'Base price', optional: false },
                              { name: 'Lowest Base Price', optional: true },
                              { name: 'Sale Price', optional: true }
                            ].map((field) => {
                              const fieldKey = getFieldKey(field.name);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <label
                                      style={{
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        letterSpacing: '0.0938px',
                                        color: '#121415'
                                      }}
                                    >
                                      {field.name}
                                    </label>
                                    {field.optional && (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#87898B' }} />
                                        <span
                                          style={{
                                            fontFamily: 'TikTok Sans, sans-serif',
                                            fontSize: '12px',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            lineHeight: '16px',
                                            letterSpacing: '0.1608px',
                                            color: '#87898B'
                                          }}
                                        >
                                          Optional
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      borderWidth: '1px',
                                      borderRadius: '4px',
                                      fontFamily: 'TikTok Sans, sans-serif',
                                      fontSize: '14px'
                                    }}
                                    placeholder=""
                                    value={fieldValue as string}
                                    onChange={(e) => {
                                      updateProductField(fieldKey, e.target.value);
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>

                        {/* Divider Line */}
                        <div style={{
                          height: '1px',
                          background: '#D3D4D5',
                          width: '100%'
                        }} />

                        {/* Additional Info Tab */}
                        <div ref={additionalInfoRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p
                              style={{
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '0.0304px',
                                color: '#000000',
                                margin: 0
                              }}
                            >
                              Additional info
                            </p>
                            {[
                              { name: 'Category', isDropdown: true },
                              { name: 'Priority', isDropdown: true },
                              { name: 'Room Type', isDropdown: true },
                              { name: 'Loyalty Program', isDropdown: false },
                              { name: 'Margin Level', isDropdown: false },
                              { name: 'Star Rating', isDropdown: true },
                              { name: 'Guest Rating System', isDropdown: true },
                              { name: 'Number of Raters', isDropdown: false },
                              { name: 'Guest Rating Score', isDropdown: false },
                              { name: 'Guest Rating Max Score', isDropdown: false },
                              { name: 'Custom Label 0', isDropdown: false },
                              { name: 'Custom Label 1', isDropdown: false },
                              { name: 'Custom Label 2', isDropdown: false },
                              { name: 'Custom Label 3', isDropdown: false },
                              { name: 'Custom Label 4', isDropdown: false },
                              { name: 'Internal Label 0', isDropdown: false },
                              { name: 'Internal Label 1', isDropdown: false }
                            ].map((field) => {
                              const fieldKey = getFieldKey(field.name);
                              const fieldValue = selectedProduct?.[fieldKey] || '';
                              
                              return (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <label
                                      style={{
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: '20px',
                                        letterSpacing: '0.0938px',
                                        color: '#121415'
                                      }}
                                    >
                                      {field.name}
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#87898B' }} />
                                      <span
                                        style={{
                                          fontFamily: 'TikTok Sans, sans-serif',
                                          fontSize: '12px',
                                          fontStyle: 'normal',
                                          fontWeight: 500,
                                          lineHeight: '16px',
                                          letterSpacing: '0.1608px',
                                          color: '#87898B'
                                        }}
                                      >
                                        Optional
                                      </span>
                                    </div>
                                  </div>
                                  {field.isDropdown ? (
                                    <div
                                      className="border border-[#D3D4D5] bg-white focus-within:outline-none focus-within:ring-1 focus-within:ring-[#009995] focus-within:border-transparent"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <span style={{ flex: 1, color: fieldValue ? '#121415' : 'rgba(109, 110, 112, 1)', fontFamily: 'TikTok Sans, sans-serif', fontSize: '14px' }}>
                                        {fieldValue || 'Select'}
                                      </span>
                                      <ChevronDown style={{ width: '20px', height: '20px', strokeWidth: 1.5, color: 'rgba(109, 110, 112, 1)' }} />
                                    </div>
                                  ) : (
                                    <input
                                      type="text"
                                      className="border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                                      style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderWidth: '1px',
                                        borderRadius: '4px',
                                        fontFamily: 'TikTok Sans, sans-serif',
                                        fontSize: '14px'
                                      }}
                                      placeholder=""
                                      value={fieldValue as string}
                                      onChange={(e) => {
                                        updateProductField(fieldKey, e.target.value);
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#6D6E70',
                        fontFamily: 'TikTok Sans, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      Select a product from the list to edit
                    </div>
                  )}
                  </div>
                </div>
              </div>
            )}
            {/* Partner platform card - appears when sync from partner platform is checked for ecommerce */}
            {!isCatalogTypeSelectionView && !isManuallyAddView && !isDataFeedView && catalogType === 'ecommerce' && syncFromPartnerPlatform && (
              <div 
                className="flex flex-col gap-4"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%'
                }}
              >
                <h2
                  style={{
                    color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                    fontFamily: 'TikTok Sans Display, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    margin: 0
                  }}
                >
                  Partner platform
                </h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
                  {/* Shopify tile */}
                  <div
                    onClick={() => setPartnerPlatform('Shopify')}
                    style={{
                      width: '200px',
                      height: '100px',
                      background: partnerPlatform === 'Shopify' ? '#FFFFFF' : '#F8F8F9',
                      borderRadius: '4px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      position: 'relative',
                      cursor: 'pointer',
                      border: partnerPlatform === 'Shopify' ? '1px solid #009995' : '1px solid transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (partnerPlatform !== 'Shopify') {
                        e.currentTarget.style.background = '#F1F2F2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (partnerPlatform !== 'Shopify') {
                        e.currentTarget.style.background = '#F8F8F9';
                      }
                    }}
                  >
                    {/* Radio button in top right */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: partnerPlatform === 'Shopify' ? 'none' : '2px solid #D3D4D5',
                        background: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {partnerPlatform === 'Shopify' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                        </svg>
                      )}
                </div>
                    {/* Shopify logo */}
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      height: '28px'
                    }}>
                      <svg width="98" height="28" viewBox="0 0 98 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_635_2941)">
                          <path d="M11.0629 0.979037C11.2587 0.979037 11.3566 1.07694 11.5524 1.17484C10.3776 1.66435 9.2028 2.93708 8.61539 5.67834L6.46154 6.26575C7.14685 4.30771 8.51748 0.979037 11.0629 0.979037ZM12.1399 1.95806C12.3357 2.54547 12.5315 3.23079 12.5315 4.30771C12.5315 4.40561 12.5315 4.40561 12.5315 4.50351L9.69231 5.28673C10.2797 3.23079 11.2587 2.34967 12.1399 1.95806ZM14.6853 3.7203L13.4126 4.1119C13.4126 4.014 13.4126 3.9161 13.4126 3.8182C13.4126 2.93708 13.3147 2.25176 13.1189 1.66435C13.8042 1.86016 14.3916 2.74127 14.6853 3.7203ZM21.049 5.28673C21.049 5.18883 20.951 5.09093 20.8531 5.09093C20.6573 5.09093 18.6014 4.89512 18.6014 4.89512C18.6014 4.89512 17.1329 3.42659 16.9371 3.32869C16.7413 3.13288 16.4476 3.23079 16.3497 3.23079C16.3497 3.23079 16.0559 3.32869 15.5664 3.52449C15.0769 2.15386 14.1958 0.881135 12.7273 0.881135H12.6294C12.2378 0.293723 11.6503 0.0979184 11.1608 0.0979184C7.63636 1.62646e-05 5.97203 4.40561 5.38462 6.65736C4.6014 6.85316 3.81818 7.14687 2.93706 7.44058C2.15385 7.63638 2.15385 7.73428 2.05594 8.4196C1.95804 8.90911 0 24.3776 0 24.3776L15.5664 27.3147L23.986 25.4546C23.986 25.4546 21.049 5.48253 21.049 5.28673Z" fill="#8DB849"/>
                          <path d="M20.7552 5.09085C20.6573 5.09085 18.6014 4.89505 18.6014 4.89505C18.6014 4.89505 17.1328 3.42652 16.937 3.32862C16.8391 3.23071 16.8391 3.23071 16.7412 3.23071L15.5664 27.3146L23.986 25.4545C23.986 25.4545 21.0489 5.48246 21.0489 5.28666C21.0489 5.18875 20.8531 5.09085 20.7552 5.09085Z" fill="#5A863E"/>
                          <path d="M12.7272 9.79017L11.6503 12.923C11.6503 12.923 10.7692 12.4335 9.59434 12.4335C7.93001 12.4335 7.83211 13.4126 7.83211 13.7063C7.83211 15.0769 11.5524 15.6643 11.5524 18.993C11.5524 21.6363 9.88805 23.3007 7.6363 23.3007C4.99294 23.3007 3.62231 21.6363 3.62231 21.6363L4.30763 19.2867C4.30763 19.2867 5.67826 20.4615 6.85308 20.4615C7.6363 20.4615 7.93001 19.8741 7.93001 19.3846C7.93001 17.5244 4.89504 17.4265 4.89504 14.3916C4.89504 11.8461 6.75518 9.39857 10.3776 9.39857C12.0419 9.30066 12.7272 9.79017 12.7272 9.79017Z" fill="#FFFFFE"/>
                          <path d="M33.8741 15.5665C32.993 15.077 32.6014 14.6853 32.6014 14.1958C32.6014 13.5105 33.1888 13.1189 34.1678 13.1189C35.2448 13.1189 36.2238 13.6084 36.2238 13.6084L37.007 11.2588C37.007 11.2588 36.3217 10.6714 34.2657 10.6714C31.3287 10.6714 29.3706 12.3357 29.3706 14.6853C29.3706 16.056 30.3497 17.035 31.5245 17.7203C32.5035 18.3077 32.8951 18.6993 32.8951 19.2867C32.8951 19.8742 32.4056 20.4616 31.4266 20.4616C30.0559 20.4616 28.6853 19.7763 28.6853 19.7763L27.9021 22.1259C27.9021 22.1259 29.0769 22.9091 31.1329 22.9091C34.0699 22.9091 36.2238 21.4406 36.2238 18.7972C36.2238 17.3287 35.1469 16.2518 33.8741 15.5665ZM45.7203 10.5735C44.2518 10.5735 43.0769 11.2588 42.1958 12.3357L43.4685 5.67835H40.1399L36.9091 22.6154H40.2378L41.3147 16.8392C41.7063 14.6853 42.8811 13.3147 43.958 13.3147C44.7413 13.3147 45.035 13.8042 45.035 14.5874C45.035 15.077 45.035 15.5665 44.9371 16.056L43.6643 22.7133H46.993L48.2657 15.8602C48.3636 15.1749 48.4615 14.2937 48.4615 13.7063C48.4615 11.7483 47.4825 10.5735 45.7203 10.5735ZM54.2378 20.2658C53.0629 20.2658 52.6713 19.2867 52.6713 18.1119C52.6713 16.2518 53.6504 13.1189 55.4126 13.1189C56.5874 13.1189 56.979 14.0979 56.979 15.077C56.979 17.2308 56 20.2658 54.2378 20.2658ZM55.9021 10.5735C51.8881 10.5735 49.2448 14.1958 49.2448 18.2098C49.2448 20.7553 50.8112 22.8112 53.8462 22.8112C57.7622 22.8112 60.4056 19.2867 60.4056 15.1749C60.4056 12.8252 59.035 10.5735 55.9021 10.5735ZM65.6923 20.3637C64.8112 20.3637 64.3217 19.8742 64.3217 19.8742L64.9091 16.7413C65.3007 14.6853 66.3776 13.3147 67.5525 13.3147C68.5315 13.3147 68.9231 14.2937 68.9231 15.1749C68.8252 17.3287 67.5525 20.3637 65.6923 20.3637ZM68.9231 10.5735C66.6713 10.5735 65.3986 12.5315 65.3986 12.5315L65.5944 10.7693H62.6573C62.5594 11.9441 62.2657 13.8042 61.972 15.1749L59.6224 27.3147H62.9511L63.8322 22.4196H63.9301C63.9301 22.4196 64.6154 22.8112 65.8881 22.8112C69.8042 22.8112 72.3497 18.7972 72.3497 14.7832C72.3497 12.6294 71.3706 10.5735 68.9231 10.5735ZM77.049 5.87415C75.972 5.87415 75.1888 6.75527 75.1888 7.8322C75.1888 8.81122 75.7762 9.49653 76.7553 9.49653C77.8322 9.49653 78.7133 8.81122 78.7133 7.53849C78.7133 6.55947 78.028 5.87415 77.049 5.87415ZM72.4476 22.6154H75.7762L78.028 10.8672H74.6993L72.4476 22.6154ZM86.4476 10.8672H84.0979L84.1958 10.2797C84.3916 9.10492 85.0769 8.1259 86.1539 8.1259C86.7413 8.1259 87.2308 8.32171 87.2308 8.32171L87.9161 5.67835C87.9161 5.67835 87.3287 5.38464 86.1539 5.38464C84.979 5.38464 83.8042 5.67835 82.9231 6.46157C81.7483 7.44059 81.2587 8.81122 80.965 10.1818L80.8671 10.7693H79.3007L78.8112 13.3147H80.3776L78.6154 22.6154H81.9441L83.7063 13.3147H85.9581L86.4476 10.8672ZM94.3776 10.8672C94.3776 10.8672 92.3217 16.056 91.3427 18.8951C91.2448 18.014 90.5594 10.8672 90.5594 10.8672H87.035L88.993 21.6364C88.993 21.8322 88.993 22.028 88.8951 22.2238C88.5035 23.007 87.8182 23.6923 87.1329 24.1818C86.5455 24.6714 85.7622 24.9651 85.2727 25.1609L86.1539 28C86.8392 27.9021 88.2098 27.3147 89.3846 26.2378C90.8532 24.8672 92.3217 22.6154 93.6923 19.6783L97.7063 10.9651L94.3776 10.8672Z" fill="#1A1919"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_635_2941">
                            <rect width="97.9021" height="28" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
              </div>
            </div>
                  
                  {/* WooCommerce tile */}
                  <div
                    onClick={() => setPartnerPlatform('WooCommerce')}
                    style={{
                      width: '200px',
                      height: '100px',
                      background: partnerPlatform === 'WooCommerce' ? '#FFFFFF' : '#F8F8F9',
                      borderRadius: '4px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      position: 'relative',
                      cursor: 'pointer',
                      border: partnerPlatform === 'WooCommerce' ? '1px solid #009995' : '1px solid transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (partnerPlatform !== 'WooCommerce') {
                        e.currentTarget.style.background = '#F1F2F2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (partnerPlatform !== 'WooCommerce') {
                        e.currentTarget.style.background = '#F8F8F9';
                      }
                    }}
                  >
                    {/* Radio button in top right */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: partnerPlatform === 'WooCommerce' ? 'none' : '2px solid #D3D4D5',
                        background: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {partnerPlatform === 'WooCommerce' && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10" cy="10" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                        </svg>
                      )}
                    </div>
                    {/* WooCommerce logo */}
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      height: '28px'
                    }}>
                      <svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90765 2.24622H43.8543C44.4096 2.24622 44.9595 2.34146 45.4725 2.52652C45.9855 2.71158 46.4516 2.98282 46.8442 3.32474C47.2368 3.66667 47.5481 4.07258 47.7605 4.51929C47.9728 4.966 48.082 5.44476 48.0818 5.92822V18.2C48.0818 18.6832 47.9724 19.1618 47.7599 19.6082C47.5475 20.0546 47.236 20.4603 46.8434 20.8019C46.4509 21.1435 45.9848 21.4145 45.4719 21.5993C44.959 21.7841 44.4094 21.8791 43.8543 21.8789H30.6037L32.4172 25.76L24.4125 21.8789H6.90229C5.78233 21.8776 4.70871 21.4896 3.91711 20.7998C3.12551 20.1101 2.68065 19.175 2.68018 18.2V5.92822C2.68018 4.95196 3.12551 4.01566 3.91827 3.3252C4.71102 2.63473 5.78629 2.24663 6.90765 2.24622Z" fill="#7D57A4"/>
                        <path d="M4.96537 5.58043C5.1052 5.42829 5.28168 5.30472 5.48235 5.21844C5.68303 5.13216 5.903 5.08528 6.12676 5.08109C7.06898 5.02406 7.60978 5.41087 7.74914 6.24154C8.33044 9.61087 8.95282 12.471 9.61631 14.822L13.683 8.08954C14.051 7.48184 14.5162 7.16035 15.0784 7.12509C15.8932 7.07532 16.4024 7.52695 16.6061 8.47998C16.9888 10.3646 17.577 12.2132 18.3625 14.0007C18.8509 9.90021 19.6662 6.93584 20.8086 5.10754C20.9188 4.90248 21.0912 4.72749 21.3072 4.6014C21.5231 4.47531 21.7745 4.4029 22.0343 4.39198C22.4572 4.36172 22.877 4.47611 23.2046 4.71087C23.3718 4.82079 23.5092 4.96138 23.6071 5.12266C23.705 5.28395 23.761 5.462 23.771 5.64421C23.8009 5.91314 23.7388 6.18376 23.5923 6.42198C22.8681 7.59176 22.2725 9.53673 21.8056 12.2569C21.3446 14.8827 21.1743 16.9365 21.2946 18.4184C21.3368 18.7817 21.2619 19.1479 21.0784 19.4762C20.9893 19.6419 20.8504 19.7836 20.6765 19.8862C20.5026 19.9889 20.3001 20.0488 20.0903 20.0595C19.6007 20.0906 19.1129 19.89 18.6216 19.4606C16.8968 17.9206 15.5269 15.6293 14.512 12.5867C13.3209 14.6607 12.4275 16.2121 11.8319 17.2409C10.742 19.0661 9.80809 20.002 9.03025 20.0486C8.52519 20.0798 8.09518 19.7106 7.74021 18.9411C6.78727 16.8286 5.76524 12.7417 4.67413 6.68021C4.631 6.48937 4.63466 6.29276 4.68485 6.10324C4.73503 5.91372 4.83063 5.73556 4.96537 5.58043Z" fill="white"/>
                        <path d="M44.8484 8.11808C44.5418 7.63638 44.1171 7.21939 43.6045 6.89676C43.0919 6.57414 42.5039 6.3538 41.8824 6.25141C41.551 6.19043 41.2133 6.15916 40.8746 6.15808C39.0974 6.15808 37.6454 6.96334 36.5185 8.57386C35.5589 9.94342 35.0594 11.5197 35.0766 13.1239C35.0766 14.3683 35.3744 15.4349 35.97 16.3236C36.2762 16.8059 36.7011 17.2232 37.2141 17.5459C37.7271 17.8686 38.3157 18.0886 38.9378 18.1903C39.2683 18.2526 39.6055 18.2844 39.9437 18.2852C41.7388 18.2852 43.1903 17.4799 44.2981 15.8694C45.2576 14.4901 45.7575 12.9055 45.7418 11.293C45.7418 10.0485 45.444 8.99023 44.8484 8.11808ZM42.5077 12.5996C42.254 13.6574 41.7835 14.4544 41.0962 14.9905C40.5518 15.4167 40.0527 15.5905 39.5989 15.5116C39.1451 15.4328 38.7812 15.0844 38.5072 14.4663C38.2973 13.9975 38.1865 13.4995 38.1802 12.9963C38.1785 12.5982 38.224 12.201 38.316 11.811C38.4929 11.1209 38.8257 10.4684 39.2951 9.89141C39.9122 9.10223 40.5566 8.7709 41.2284 8.89741C41.6823 8.97727 42.0456 9.32467 42.3183 9.93964C42.5276 10.408 42.6377 10.9055 42.6435 11.4081C42.6459 11.8083 42.6003 12.2076 42.5077 12.5996Z" fill="white"/>
                        <path d="M33.2197 8.11808C32.9132 7.63638 32.4885 7.21939 31.9759 6.89676C31.4632 6.57414 30.8752 6.3538 30.2537 6.25141C29.9224 6.19043 29.5847 6.15916 29.246 6.15808C27.4676 6.15808 26.0161 6.96334 24.8917 8.57386C23.9307 9.94299 23.4305 11.5194 23.4479 13.1239C23.4479 14.3683 23.7457 15.4349 24.3413 16.3236C24.6471 16.8062 25.0718 17.2238 25.5849 17.5466C26.098 17.8693 26.6869 18.0892 27.3091 18.1903C27.6397 18.2526 27.9769 18.2844 28.3151 18.2852C30.1114 18.2852 31.5634 17.4799 32.6712 15.8694C33.6341 14.4908 34.1382 12.9064 34.1274 11.293C34.1274 10.0485 33.8296 8.99023 33.234 8.11808H33.2197ZM30.8791 12.5996C30.6254 13.6595 30.1537 14.4575 29.464 14.9936C28.9184 15.4199 28.4193 15.5936 27.9667 15.5147C27.514 15.4359 27.1513 15.0865 26.8785 14.4663C26.6686 13.9975 26.5578 13.4995 26.5516 12.9963C26.5498 12.5982 26.5953 12.201 26.6873 11.811C26.8658 11.1213 27.1985 10.4691 27.6665 9.89141C28.2811 9.1043 28.9256 8.77401 29.5998 8.90053C30.0536 8.98038 30.4163 9.32778 30.6879 9.94275C30.8977 10.4111 31.0084 10.9086 31.0149 11.4112C31.0167 11.8093 30.9712 12.2066 30.8791 12.5965V12.5996Z" fill="white"/>
                        <path d="M52.7762 7.97997C51.541 9.04915 50.9233 10.404 50.9233 12.0446C50.9233 13.8149 51.5356 15.2444 52.7601 16.3333C53.9847 17.4222 55.5862 17.9646 57.5647 17.9604C58.2201 17.9465 58.8707 17.8581 59.4998 17.6975V15.0889C58.9524 15.2397 58.3835 15.323 57.8095 15.3362C56.8268 15.3362 56.0406 15.0489 55.451 14.4744C54.8614 13.8999 54.5671 13.1195 54.5683 12.1333C54.5683 11.2176 54.8608 10.4626 55.4456 9.86841C55.7128 9.58464 56.0502 9.35719 56.4327 9.2031C56.8151 9.049 57.2327 8.97226 57.6541 8.97863C58.2787 8.9825 58.8997 9.06101 59.4998 9.21197V6.59086C58.8377 6.44418 58.1567 6.37255 57.4736 6.37775C55.5808 6.37775 54.015 6.91182 52.7762 7.97997ZM65.6552 6.37775C63.9435 6.37775 62.6064 6.87345 61.6439 7.86486C60.6814 8.85626 60.205 10.2386 60.2145 12.012C60.2145 13.9346 60.691 15.4052 61.6439 16.4235C62.5968 17.4419 63.9822 17.9516 65.7999 17.9526C67.5569 17.9526 68.9101 17.4429 69.8594 16.4235C70.8088 15.4041 71.2865 13.974 71.2924 12.1333C71.2924 10.2884 70.81 8.86871 69.8451 7.87419C68.8803 6.87967 67.4836 6.38086 65.6552 6.37775ZM67.1257 14.7777C66.9724 14.9952 66.7554 15.1732 66.497 15.2935C66.2386 15.4138 65.948 15.472 65.6552 15.4622C65.3781 15.4693 65.1042 15.4091 64.8644 15.2882C64.6245 15.1673 64.4281 14.9905 64.2972 14.7777C63.9863 14.3235 63.8309 13.4146 63.8309 12.0509C63.8309 9.92804 64.4461 8.86663 65.6766 8.86663C66.9869 8.86663 67.6421 9.94049 67.6421 12.0882C67.6385 13.4218 67.4664 14.3183 67.1257 14.7777ZM80.471 6.68886L79.8063 9.15908C79.6336 9.79167 79.4722 10.4398 79.3221 11.1035L78.9505 12.8146C78.5931 11.1066 78.1089 9.06626 77.4978 6.69352H73.1828L71.5622 17.6913H74.7945L75.6735 10.1126L77.8802 17.6913H80.1905L82.2953 10.1111L83.2083 17.6742H86.5871L84.8718 6.68886H80.471ZM95.9301 6.68886L95.2654 9.15908C95.0927 9.79167 94.9313 10.4398 94.7812 11.1035L94.4095 12.8146C94.0522 11.1066 93.5674 9.06626 92.9551 6.69352H88.6419L87.0159 17.6804H90.2482L91.1255 10.1017L93.3339 17.6804H95.6424L97.7543 10.1111L98.6674 17.6742H102.046L100.334 6.68886H95.9301ZM106.42 13.3311H109.458V11.0444H106.42V9.02219H109.911V6.68886H103.007V17.6866H109.935V15.3331H106.42V13.3311ZM119.547 11.5966C120.011 10.9564 120.178 10.1874 120.017 9.44387C119.856 8.70037 119.378 8.03739 118.679 7.58797C117.749 6.98856 116.48 6.68886 114.873 6.68886H110.896V17.6866H114.31V12.6715H114.366L117.125 17.6804H120.73L118.004 12.7213C118.641 12.496 119.18 12.1027 119.547 11.5966ZM114.31 11.4193V8.80752C115.119 8.82412 115.699 8.94234 116.049 9.16219C116.399 9.38204 116.574 9.745 116.574 10.2511C116.574 11.0081 115.82 11.3975 114.31 11.4193ZM122.097 7.97997C120.858 9.04915 120.239 10.404 120.239 12.0446C120.239 13.8149 120.852 15.2418 122.079 16.3255C123.306 17.4092 124.908 17.9516 126.884 17.9526C127.541 17.9418 128.194 17.856 128.826 17.6975V15.0889C128.279 15.2397 127.71 15.323 127.136 15.3362C126.152 15.3362 125.365 15.0489 124.776 14.4744C124.186 13.8999 123.89 13.1195 123.887 12.1333C123.887 11.2176 124.181 10.4626 124.767 9.86841C125.034 9.58464 125.371 9.35719 125.754 9.2031C126.136 9.049 126.554 8.97226 126.975 8.97863C127.601 8.98217 128.224 9.06068 128.826 9.21197V6.59086C128.162 6.44378 127.479 6.37215 126.795 6.37775C124.902 6.37775 123.336 6.91182 122.097 7.97997ZM133.175 15.3331V13.3311H136.213V11.0444H133.175V9.02219H136.666V6.68886H129.761V17.6866H136.688V15.3331H133.175Z" fill="black"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Show all partners tile */}
                  <div
                    style={{
                      width: '200px',
                      height: '100px',
                      background: '#FFFFFF',
                      borderRadius: '4px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F1F2F2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FFFFFF';
                    }}
                  >
                    <div style={{ 
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#009995',
                      textAlign: 'center'
                    }}>
                      Show all partners (10)
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isCatalogTypeSelectionView && !isManuallyAddView && !isDataFeedView && productSource === 'Data feed schedule' && (
              <div 
                className="flex flex-col"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%',
                  gap: '16px'
                }}
              >
                <h2
                  style={{
                    color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                    fontFamily: 'TikTok Sans Display, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    margin: 0
                  }}
                >
                  {productSource}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', maxWidth: '600px' }}>
                  <p
                    style={{
                      color: '#6D6E70',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px',
                      margin: 0
                    }}
                  >
                    Check out the standard template and make sure the file you upload matches the template.
                  </p>
                  <a
                    href="#"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#017976',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px',
                      textDecoration: 'none'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.26123 2.70361C7.26123 2.2894 7.59702 1.95361 8.01123 1.95361C8.42544 1.95361 8.76123 2.2894 8.76123 2.70361L8.76123 9.46327L11.4697 6.75483C11.7626 6.46193 12.2374 6.46193 12.5303 6.75483C12.8232 7.04772 12.8232 7.52259 12.5303 7.81549L8.63919 11.7066C8.50525 11.9112 8.27402 12.0464 8.01123 12.0464C7.80126 12.0464 7.61145 11.9601 7.47531 11.8211L7.46967 11.8155C7.44336 11.7892 7.41942 11.7614 7.39783 11.7324L3.4809 7.81549C3.18801 7.52259 3.18801 7.04772 3.4809 6.75483C3.77379 6.46193 4.24867 6.46193 4.54156 6.75483L7.26123 9.47449L7.26123 2.70361Z" fill="#017976"/>
                      <path d="M3.25 11.2964C3.25 10.8822 2.91421 10.5464 2.5 10.5464C2.08579 10.5464 1.75 10.8822 1.75 11.2964V14.0464H14.25V11.2964C14.25 10.8822 13.9142 10.5464 13.5 10.5464C13.0858 10.5464 12.75 10.8822 12.75 11.2964V12.5464H3.25V11.2964Z" fill="#017976"/>
                    </svg>
                    <span>Download template</span>
                  </a>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px'
                    }}
                  >
                    Data feed name
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <label 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => setDataFeedProductSourceType('existing')}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: dataFeedProductSourceType === 'existing' ? 'none' : '2px solid #D3D4D5',
                          background: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative'
                        }}
                      >
                        {dataFeedProductSourceType === 'existing' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <circle cx="10" cy="10" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontFamily: 'TikTok Sans Text, sans-serif', fontSize: '14px', color: '#121415' }}>Upload to existing product source</span>
                    </label>
                    <label 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer' 
                      }}
                      onClick={() => setDataFeedProductSourceType('new')}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: dataFeedProductSourceType === 'new' ? 'none' : '2px solid #D3D4D5',
                          background: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative'
                        }}
                      >
                        {dataFeedProductSourceType === 'new' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <circle cx="10" cy="10" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontFamily: 'TikTok Sans Text, sans-serif', fontSize: '14px', color: '#121415' }}>Create new product source</span>
                    </label>
                    {dataFeedProductSourceType === 'new' && (
                  <input
                    type="text"
                        className="data-feed-input border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                    style={{
                          width: '100%',
                      borderWidth: '1px',
                      fontSize: '14px',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          marginTop: '8px'
                        }}
                        placeholder="Enter a name for your product source"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%' }}>
                    <label 
                      className="text-[#121415]"
                      style={{
                        fontVariantNumeric: 'lining-nums tabular-nums',
                        fontFamily: 'TikTok Sans Text, sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '20px',
                        letterSpacing: '0.0938px'
                      }}
                    >
                      Data Feed URL
                    </label>
                    <p
                      style={{
                        color: '#6D6E70',
                        fontFamily: 'TikTok Sans Text, sans-serif',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '16px',
                        letterSpacing: '0.1608px',
                        margin: 0
                      }}
                    >
                      Add the URL of your file, starting with http, https, ftp, or sftp. Files can be up to 8GB and in a CSV format.
                    </p>
                  </div>
                  <input
                    type="text"
                    className="data-feed-input border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                    style={{
                      width: '100%',
                      borderWidth: '1px',
                      fontSize: '14px',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      marginTop: '8px'
                    }}
                    placeholder="https://thebulletin.org/doomsday-clock/2025-statement/"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%' }}>
                    <label 
                      className="text-[#121415]"
                      style={{
                        fontVariantNumeric: 'lining-nums tabular-nums',
                        fontFamily: 'TikTok Sans Text, sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: '20px',
                        letterSpacing: '0.0938px'
                      }}
                    >
                      Data feed name
                    </label>
                    <p
                      style={{
                        color: '#6D6E70',
                        fontFamily: 'TikTok Sans Text, sans-serif',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '16px',
                        letterSpacing: '0.1608px',
                        margin: 0
                      }}
                    >
                      The upload schedule must be set to "Daily" if the data feed exceeds 15 GB in size.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '8px' }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '2px', 
                      background: 'rgba(38, 38, 39, 0.15)',
                      padding: '2px',
                      borderRadius: '4px',
                      width: 'fit-content'
                    }}>
                      <button
                        type="button"
                        onClick={() => setScheduleInterval('hourly')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '2px',
                          border: 'none',
                          background: scheduleInterval === 'hourly' ? '#FFFFFF' : 'transparent',
                          color: scheduleInterval === 'hourly' ? '#017976' : '#121415',
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Hourly
                      </button>
                      <button
                        type="button"
                        onClick={() => setScheduleInterval('daily')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '2px',
                          border: 'none',
                          background: scheduleInterval === 'daily' ? '#FFFFFF' : 'transparent',
                          color: scheduleInterval === 'daily' ? '#017976' : '#121415',
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                      >
                        Daily
                        <div style={{ 
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '1px',
                          height: '16px',
                          background: '#87898B',
                          borderRadius: '1px'
                        }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setScheduleInterval('weekly')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '2px',
                          border: 'none',
                          background: scheduleInterval === 'weekly' ? '#FFFFFF' : 'transparent',
                          color: scheduleInterval === 'weekly' ? '#017976' : '#121415',
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                      >
                        Weekly
                        <div style={{ 
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '1px',
                          height: '16px',
                          background: '#87898B',
                          borderRadius: '1px'
                        }} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setScheduleInterval('monthly')}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '2px',
                          border: 'none',
                          background: scheduleInterval === 'monthly' ? '#FFFFFF' : 'transparent',
                          color: scheduleInterval === 'monthly' ? '#017976' : '#121415',
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Monthly
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label
                          style={{
                            fontFamily: 'TikTok Sans Text, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#121415',
                            lineHeight: '20px'
                          }}
                        >
                          Repeat
                        </label>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <select
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              paddingRight: '32px',
                              border: '1px solid #D3D4D5',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontFamily: 'TikTok Sans Text, sans-serif',
                              color: '#121415',
                              appearance: 'none',
                              background: '#FFFFFF'
                            }}
                            defaultValue="every-hour"
                          >
                            <option value="every-hour">Every hour</option>
                          </select>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none'
                            }}
                          >
                            <path d="M4 6L8 10L12 6" stroke="#6D6E70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <label
                          style={{
                            fontFamily: 'TikTok Sans Text, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#121415',
                            lineHeight: '20px'
                          }}
                        >
                          From
                        </label>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <input
                            type="text"
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              paddingRight: '80px',
                              border: '1px solid #D3D4D5',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontFamily: 'TikTok Sans Text, sans-serif',
                              color: '#121415'
                            }}
                            defaultValue="12:00"
                          />
                          <div style={{ 
                            position: 'absolute',
                            right: '32px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <button
                              type="button"
                              style={{
                                padding: '2px 4px',
                                border: 'none',
                                background: 'transparent',
                                color: '#121415',
                                fontFamily: 'TikTok Sans Text, sans-serif',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              UTC+08:00
                            </button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              style={{
                                pointerEvents: 'none'
                              }}
                            >
                              <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM8 13.5C5.23858 13.5 3 11.2614 3 8.5C3 5.73858 5.23858 3.5 8 3.5C10.7614 3.5 13 5.73858 13 8.5C13 11.2614 10.7614 13.5 8 13.5Z" fill="#87898B"/>
                              <path d="M8 5V8.5L10.5 11" stroke="#87898B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px'
                    }}
                  >
                    Update method
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                    <label 
                      style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        cursor: 'pointer', 
                        padding: '12px', 
                        border: updateMethod === 'update' ? '1px solid #009995' : '1px solid #D3D4D5', 
                        borderRadius: '4px', 
                        background: updateMethod === 'update' ? '#F0FDFC' : '#FFFFFF' 
                      }}
                      onClick={() => setUpdateMethod('update')}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: updateMethod === 'update' ? 'none' : '2px solid #D3D4D5',
                          background: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative',
                          marginTop: '2px'
                        }}
                      >
                        {updateMethod === 'update' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <circle cx="10" cy="10" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                          </svg>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <span style={{ fontFamily: 'TikTok Sans Text, sans-serif', fontSize: '14px', fontWeight: 500, color: '#121415' }}>Update your data feed</span>
                        <span style={{ fontFamily: 'TikTok Sans Text, sans-serif', fontSize: '12px', fontWeight: 400, color: '#6D6E70', lineHeight: '16px' }}>
                          Upload a file to add new items to your data feed or update existing items. Existing items which are not in your new data feed will not be deleted.
                        </span>
                      </div>
                    </label>
                    <label 
                      style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        cursor: 'pointer', 
                        padding: '12px', 
                        border: updateMethod === 'replace' ? '1px solid #009995' : '1px solid #D3D4D5', 
                        borderRadius: '4px', 
                        background: updateMethod === 'replace' ? '#F0FDFC' : '#FFFFFF' 
                      }}
                      onClick={() => setUpdateMethod('replace')}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: updateMethod === 'replace' ? 'none' : '2px solid #D3D4D5',
                          background: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative',
                          marginTop: '2px'
                        }}
                      >
                        {updateMethod === 'replace' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <circle cx="10" cy="10" r="5" fill="#FFF" stroke="#009995" strokeWidth="6" />
                          </svg>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                        <span style={{ fontFamily: 'TikTok Sans Text, sans-serif', fontSize: '14px', fontWeight: 500, color: '#121415' }}>Replace your data feed</span>
                        <span style={{ fontFamily: 'TikTok Sans Text, sans-serif', fontSize: '12px', fontWeight: 400, color: '#6D6E70', lineHeight: '16px' }}>
                          Upload a file to add new items to your data feed or update existing items. Existing items which are not in your new data feed will be deleted.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                  <style>{`
                    .data-feed-input::placeholder {
                      color: rgba(109, 110, 112, 1);
                    }
                  `}</style>
                </div>
            )}
            {!isCatalogTypeSelectionView && !isManuallyAddView && !isDataFeedView && productSource === 'Sync from website' && (
              <div 
                className="flex flex-col"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%',
                  gap: '16px'
                }}
              >
                <h2
                  style={{
                    color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                    fontFamily: 'TikTok Sans Display, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    margin: 0
                  }}
                >
                  {productSource}
                </h2>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px'
                    }}
                  >
                    Select a data connection
                  </label>
                  <div className="relative" ref={dataConnectionRef} style={{ width: '100%' }}>
                    <button
                      type="button"
                      onClick={() => setIsDataConnectionOpen(!isDataConnectionOpen)}
                      className="w-full border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent text-left flex items-center justify-between"
                      style={{
                        borderRadius: '4px',
                        borderWidth: '1px',
                        fontSize: '14px',
                        padding: '8px 12px',
                        color: dataConnection ? '#121415' : 'rgba(169, 171, 172, 1)'
                      }}
                    >
                      <span>{dataConnection || 'Select a pixel'}</span>
                      <ChevronDown 
                        className={`transition-transform ${isDataConnectionOpen ? 'rotate-180' : ''}`}
                        style={{ 
                          width: '16px', 
                          height: '16px',
                          strokeWidth: 1.5,
                          color: 'rgba(109, 110, 112, 1)',
                          flexShrink: 0
                        }}
                      />
                    </button>
                    {isDataConnectionOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 z-50"
                    style={{
                      display: 'flex',
                          width: '100%',
                          minWidth: '120px',
                      flexDirection: 'column',
                          alignItems: 'flex-start',
                          borderRadius: '8px',
                          background: '#FFF',
                          boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.12)',
                          padding: '4px',
                          maxHeight: '400px',
                          overflowY: 'auto',
                          overflowX: 'hidden'
                        }}
                      >
                        {(() => {
                          // Generate 3 random pixel options
                          const pixels = [];
                          for (let i = 0; i < 3; i++) {
                            const randomNum = Math.floor(Math.random() * 1000000);
                            pixels.push(`pixel_${randomNum}`);
                          }
                          return pixels;
                        })().map((pixel) => (
                          <button
                            key={pixel}
                            type="button"
                            onClick={() => {
                              setDataConnection(pixel);
                              setIsDataConnectionOpen(false);
                            }}
                            className="w-full text-left transition-colors"
                            style={{
                              display: 'flex',
                              padding: '8px',
                      alignItems: 'center',
                      gap: '8px',
                      alignSelf: 'stretch',
                      borderRadius: '4px',
                              background: '#FFF'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#F1F2F2';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#FFF';
                            }}
                          >
                            <span style={{ fontSize: '14px', color: '#121415' }}>{pixel}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {!isCatalogTypeSelectionView && !isManuallyAddView && !isDataFeedView && productSource === 'Upload file' && (
              <div 
                className="flex flex-col"
                style={{
                  background: tokens.color.neutral.surface,
                  borderRadius: '8px',
                  padding: '24px',
                  width: '100%',
                  gap: '16px'
                }}
              >
                <h2
                  style={{
                    color: 'var(--ks-color-neutral-highOnSurface, #121415)',
                    fontFamily: 'TikTok Sans Display, sans-serif',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    margin: 0
                  }}
                >
                  {productSource}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', maxWidth: '600px' }}>
                  <p
                        style={{
                          color: '#6D6E70',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                      letterSpacing: '0.0938px',
                      margin: 0
                    }}
                  >
                    Check out the standard template and make sure the file you upload matches the template.
                  </p>
                  <a
                    href="#"
                        style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                          color: '#017976',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '14px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '20px',
                      letterSpacing: '0.0938px',
                      textDecoration: 'none'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.26123 2.70361C7.26123 2.2894 7.59702 1.95361 8.01123 1.95361C8.42544 1.95361 8.76123 2.2894 8.76123 2.70361L8.76123 9.46327L11.4697 6.75483C11.7626 6.46193 12.2374 6.46193 12.5303 6.75483C12.8232 7.04772 12.8232 7.52259 12.5303 7.81549L8.63919 11.7066C8.50525 11.9112 8.27402 12.0464 8.01123 12.0464C7.80126 12.0464 7.61145 11.9601 7.47531 11.8211L7.46967 11.8155C7.44336 11.7892 7.41942 11.7614 7.39783 11.7324L3.4809 7.81549C3.18801 7.52259 3.18801 7.04772 3.4809 6.75483C3.77379 6.46193 4.24867 6.46193 4.54156 6.75483L7.26123 9.47449L7.26123 2.70361Z" fill="#017976"/>
                      <path d="M3.25 11.2964C3.25 10.8822 2.91421 10.5464 2.5 10.5464C2.08579 10.5464 1.75 10.8822 1.75 11.2964V14.0464H14.25V11.2964C14.25 10.8822 13.9142 10.5464 13.5 10.5464C13.0858 10.5464 12.75 10.8822 12.75 11.2964V12.5464H3.25V11.2964Z" fill="#017976"/>
                    </svg>
                    <span>Download template</span>
                  </a>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px'
                    }}
                  >
                    Data feed name
                  </label>
                  <input
                    type="text"
                    className="data-feed-input border border-[#D3D4D5] bg-white focus:outline-none focus:ring-1 focus:ring-[#009995] focus:border-transparent"
                    style={{
                      width: '100%',
                      borderWidth: '1px',
                      fontSize: '14px',
                      padding: '8px 12px',
                      borderRadius: '4px'
                    }}
                    placeholder="Name your data feed"
                    value={dataFeedName}
                    onChange={(e) => setDataFeedName(e.target.value)}
                  />
                  <style>{`
                    .data-feed-input::placeholder {
                      color: rgba(109, 110, 112, 1);
                    }
                  `}</style>
                </div>
                <div className="flex flex-col items-start gap-2 self-stretch" style={{ width: '100%', maxWidth: '600px' }}>
                  <label 
                    className="text-[#121415]"
                    style={{
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      fontFamily: 'TikTok Sans Text, sans-serif',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '20px',
                      letterSpacing: '0.0938px'
                    }}
                  >
                    Upload
                  </label>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '600px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '160px',
                        border: `1px dashed ${isDragging ? '#009995' : '#D3D4D5'}`,
                        borderRadius: '4px',
                        background: uploadBackground,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'border-color 0.2s, background-color 0.2s'
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDragOver(e);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDragLeave(e);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDrop(e);
                      }}
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                    >
                      {uploadedFiles.length > 0 && uploadedFiles[0].type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(uploadedFiles[0])}
                          alt="Uploaded file"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 8L12 3L7 8" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3V15" stroke="#87898B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p
                            style={{
                              fontFamily: 'TikTok Sans Text, sans-serif',
                              fontSize: '14px',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              lineHeight: '20px',
                              letterSpacing: '0.0938px',
                              color: '#6D6E70',
                              margin: 0,
                              textAlign: 'center'
                            }}
                          >
                            <span>Drop files here, or </span>
                            <span style={{ color: '#017976' }}>click to upload</span>
                          </p>
                        </>
                      )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                    {uploadedFiles.length === 0 && (
                      <p
                        style={{
                          fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '12px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '16px',
                          letterSpacing: '0.1608px',
                          color: '#6D6E70',
                          margin: 0
                        }}
                      >
                        Image format:.JPG/.PNG; File size: Up to 5MB
                      </p>
                    )}
                    {uploadedFiles.length > 0 && isUploading && (
                  <div
                    style={{
                      display: 'flex',
                          height: '4px',
                          width: '100%',
                          alignItems: 'center',
                          borderRadius: '9999px',
                          background: '#ECECED',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${uploadProgress}%`,
                            borderRadius: '9999px',
                            background: '#009995',
                            transition: 'width 0.1s linear'
                          }}
                        />
                      </div>
                    )}
                    {uploadedFiles.length > 0 && (isUploading || isUploadSuccessful) && (
                      <div
                        style={{
                          display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                          padding: '8px',
                      borderRadius: '8px',
                      background: '#F8F8F9'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: '24px',
                        height: '24px',
                            justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0,
                            borderRadius: '4px',
                        border: '1px solid #D3D4D5',
                        background: '#F2F3F3'
                      }}
                    >
                          {renderFileIcon(uploadedFiles[0].name)}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: '1 0 0',
                        minWidth: 0
                      }}
                    >
                      <span
                        style={{
                          overflow: 'hidden',
                          color: '#121415',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                              fontFamily: 'TikTok Sans Text, sans-serif',
                          fontSize: '12px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '16px',
                          letterSpacing: '0.161px'
                        }}
                      >
                            {uploadedFiles[0].name}
                      </span>
                    </div>
                        {isUploadSuccessful && (
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <div
                              style={{
                                width: '13px',
                                height: '13px',
                                borderRadius: '13px',
                                background: '#99E4A2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                <path d="M0.75 4.49706L3.00549 6.61055L6.75 0.75" stroke="#052D0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        )}
                    <button
                      type="button"
                          onClick={handleCancelUpload}
                      style={{
                        background: 'transparent',
                        border: 'none',
                            padding: '2px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.145719 0.161822C0.340649 -0.0337714 0.657231 -0.0343096 0.852825 0.16062L9.61769 8.89573C9.81328 9.09066 9.81382 9.40724 9.61889 9.60284C9.42396 9.79843 9.10738 9.79897 8.91178 9.60404L0.146921 0.868928C-0.0486726 0.673998 -0.0492108 0.357416 0.145719 0.161822Z" fill="#262627"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.161796 9.61892C-0.033798 9.42399 -0.0343362 9.1074 0.160594 8.91181L8.8957 0.146948C9.09064 -0.0486459 9.40722 -0.0491841 9.60281 0.145746C9.79841 0.340675 9.79894 0.657258 9.60401 0.852851L0.868902 9.61771C0.673972 9.81331 0.35739 9.81385 0.161796 9.61892Z" fill="#262627"/>
                      </svg>
                    </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Footer - 76px high, full width */}
          {isCatalogTypeSelectionView ? (
            <div className="w-full h-[76px] bg-white flex items-center justify-end gap-2 px-6">
              <button
                onClick={handleClose}
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 border border-[#87898B] bg-[#F8F8F9] hover:bg-[#ECECED] transition-colors text-[#121415] font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (catalogType && (catalogType !== 'auto' || catalogSubtype) && (catalogType !== 'financial-services' || financialServicesSubtype)) {
                    setIsCatalogTypeSelectionView(false);
                  }
                }}
                disabled={!catalogType || (catalogType === 'auto' && !catalogSubtype) || (catalogType === 'financial-services' && !financialServicesSubtype)}
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 bg-[#009995] hover:bg-[#008882] disabled:bg-[#D3D4D5] disabled:cursor-not-allowed transition-colors text-white font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Continue
              </button>
            </div>
          ) : !isManuallyAddView && !isDataFeedView ? (
            <div className="w-full h-[76px] bg-white flex items-center justify-end gap-2 px-6">
              <button
                onClick={handleClose}
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 border border-[#87898B] bg-[#F8F8F9] hover:bg-[#ECECED] transition-colors text-[#121415] font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Cancel
              </button>
              <button
                disabled={
                  !catalogName || 
                  !catalogType || 
                  !businessCenter || 
                  !defaultLocation || 
                  !defaultCurrency || 
                  (
                    !syncFromPartnerPlatform && !productSource
                  ) || 
                  (
                    syncFromPartnerPlatform && !partnerPlatform
                  ) ||
                  (
                    productSource === 'Sync from a partner platform' && (!partnerPlatform || (partnerPlatform === 'Shopify' && !isShopifyConnected))
                  )
                }
                onClick={() => {
                  // If it's the Shopify connection button, open the Shopify app store
                  if (syncFromPartnerPlatform && partnerPlatform === 'Shopify') {
                    window.open('https://apps.shopify.com/tiktok', '_blank');
                    return;
                  }
                  
                  if (catalogName && businessCenter && catalogType && onCreate) {
                    // Generate 10-digit random ID
                    const randomId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
                    onCreate({
                      name: catalogName,
                      catalogId: randomId,
                      owner: businessCenter,
                      catalogType: catalogType
                    });
                    handleClose();
                  }
                }}
                className={`flex h-9 px-4 py-2 justify-center items-center gap-1 transition-colors text-white font-medium text-sm ${
                  catalogName && 
                  catalogType && 
                  businessCenter && 
                  defaultLocation && 
                  defaultCurrency && 
                  (
                    (syncFromPartnerPlatform && partnerPlatform) || 
                    (productSource && productSource !== 'Sync from a partner platform') ||
                    (productSource === 'Sync from a partner platform' && partnerPlatform && (partnerPlatform !== 'Shopify' || isShopifyConnected))
                  )
                    ? 'bg-[#009995] hover:bg-[#008882] cursor-pointer'
                    : 'bg-[#C3E9E7] cursor-not-allowed opacity-60'
                }`}
                title={
                  catalogName && 
                  catalogType && 
                  businessCenter && 
                  defaultLocation && 
                  defaultCurrency && 
                  (
                    (syncFromPartnerPlatform && partnerPlatform) || 
                    (productSource && productSource !== 'Sync from a partner platform') ||
                    (productSource === 'Sync from a partner platform' && partnerPlatform && (partnerPlatform !== 'Shopify' || isShopifyConnected))
                  )
                    ? (syncFromPartnerPlatform && partnerPlatform ? `Connect to ${partnerPlatform.charAt(0).toUpperCase() + partnerPlatform.slice(1).toLowerCase()}` : 'Create catalog')
                    : 'Create catalog (disabled)'
                }
                style={{ borderRadius: '4px' }}
              >
                {syncFromPartnerPlatform && partnerPlatform ? (
                  <>
                    <ExternalLink style={{ width: '16px', height: '16px', strokeWidth: 2 }} />
                    <span>Connect to {partnerPlatform.charAt(0).toUpperCase() + partnerPlatform.slice(1).toLowerCase()}</span>
                  </>
                ) : (
                  'Create catalog'
                )}
              </button>
            </div>
          ) : isDataFeedView ? (
            <div className="w-full h-[76px] bg-white flex items-center justify-end gap-2 px-6">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 border border-[#87898B] bg-[#F8F8F9] hover:bg-[#ECECED] transition-colors text-[#121415] font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 bg-[#009995] hover:bg-[#008882] transition-colors text-white font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Create data feed
              </button>
            </div>
          ) : isManuallyAddView ? (
            <div className="w-full h-[76px] bg-white flex items-center justify-end gap-2 px-6">
              <button
                onClick={handleBack}
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 border border-[#87898B] bg-[#F8F8F9] hover:bg-[#ECECED] transition-colors text-[#121415] font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Back
              </button>
              <button
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 bg-[#009995] hover:bg-[#008882] transition-colors text-white font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="w-full h-[76px] bg-white flex items-center justify-end gap-2 px-6">
              <button
                onClick={handleBack}
                className="flex h-9 px-4 py-2 justify-center items-center gap-1 border border-[#87898B] bg-[#F8F8F9] hover:bg-[#ECECED] transition-colors text-[#121415] font-medium text-sm"
                style={{ borderRadius: '4px' }}
              >
                Back
              </button>
              <button
                disabled={!isUploadSuccessful}
                onClick={() => {
                  if (isUploadSuccessful && uploadedFiles.length > 0) {
                    setProductSource(uploadedFiles[0].name);
                  }
                }}
                className={`flex h-9 px-4 py-2 justify-center items-center gap-1 transition-colors text-white font-medium text-sm ${
                  isUploadSuccessful
                    ? 'bg-[#009995] hover:bg-[#008882] cursor-pointer'
                    : 'bg-[#C3E9E7] cursor-not-allowed opacity-60'
                }`}
                style={{ borderRadius: '4px' }}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

