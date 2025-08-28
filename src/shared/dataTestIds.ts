const testIds = {
  // Base URLs
  url_base: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
  url_buckets: '/buckets',
  url_analytics: '/analytics',
  url_billing: '/billing',
  url_bucket_detail: '/bucket/',

  // General UI Elements
  buckets_page_titles:'buckets_page_title',
  buckets_page_desccription:'buckets_page_desccription',
  loading_indicator: 'loading-indicator',
  feedback_toast: 'feedback-toast',
  success_toast: 'success-toast',
  error_toast: 'error-toast',
  info_toast: 'info-toast',
  close_button: 'close-button',
  back_button: 'back-button',
  page_name: 'page-name',

  // Layout Components
  sidebar: 'sidebar',
  mobile_menu_btn: 'mobile-menu-btn',
  mobile_sidebar: 'mobile-sidebar',
  header: 'header',
  main_content: 'main-content',
  app_logo: 'app-logo',
  app_title: 'app-title',

  // Navigation
  nav_dashboard: 'nav-dashboard',
  nav_buckets: 'nav-buckets',
  nav_analytics: 'nav-analytics',
  nav_billing: 'nav-billing',

  // Page Containers
  buckets_page: 'buckets-page',
  analytics_page: 'analytics-page',
  billing_page: 'billing-page',
  bucket_detail_page: 'bucket-detail-page',
  not_found_page: 'not-found-page',

  // Buckets Page
  bucket_operations: 'bucket-operations',
  create_bucket_btn: 'create-bucket-btn',
  bucket_stats: 'bucket-stats',
  bucket_grid: 'bucket-grid',
  bucket_card: 'bucket-card',
  bucket_name: 'bucket-name',
  bucket_region: 'bucket-region',
  bucket_size: 'bucket-size',
  bucket_objects: 'bucket-objects',
  bucket_storage_class: 'bucket-storage-class',
  bucket_encryption: 'bucket-encryption',
  bucket_versioning: 'bucket-versioning',
  bucket_public: 'bucket-public',
  bucket_menu_btn: 'bucket-menu-btn',
  bucket_actions_menu: 'bucket-actions-menu',

  // Bucket Operations
  create_bucket_btns:'create_bucket_btn',
  select_all_checkbox: 'select-all-checkbox',
  bulk_actions: 'bulk-actions',
  bulk_delete_btn: 'bulk-delete-btn',
  delete_bucket_btn: 'delete-bucket-btn',
  bulk_make_public_btn: 'bulk-make-public-btn',
  bulk_make_private_btn: 'bulk-make-private-btn',
  bulk_toggle_versioning_btn: 'bulk-toggle-versioning-btn',
  bulk_toggle_encryption_btn: 'bulk-toggle-encryption-btn',
  total_buckets_text:'total_buckets_text',
  total_storage_text:'total_storage_text',
  total_objects_text:'total_objects_text',
  total_cost_text:'total_cost_text',

  // Search and Filters
  search_input: 'search-input',
  search_button: 'search-button',
  region_filter: 'region-filter',
  region_us_east_1: 'region-us-east-1',
  storage_class_filter: 'storage-class-filter',
  sort_dropdown: 'sort-dropdown',
  sort_by_name: 'sort-by-name',
  sort_by_size: 'sort-by-size',
  sort_by_created: 'sort-by-created',

  // Create Bucket Modal
  create_bucket_modal: 'create-bucket-modal',
  bucket_name_input: 'bucket-name-input',
  bucket_region_select: 'bucket-region-select',
  bucket_storage_class_select: 'bucket-storage-class-select',
  bucket_encryption_checkbox: 'bucket-encryption-checkbox',
  bucket_versioning_checkbox: 'bucket-versioning-checkbox',
  bucket_public_checkbox: 'bucket-public-checkbox',
  create_bucket_submit: 'create-bucket-submit',
  create_bucket_cancel: 'create-bucket-cancel',

  // Delete Confirmation
  confirm_delete_btn: 'confirm-delete-btn',
  confirm_bulk_delete: 'confirm-bulk-delete',
  cancel_delete_btn: 'cancel-delete-btn',

  // Bucket Detail Page
  bucket_detail_header: 'bucket-detail-header',
  bucket_detail_name: 'bucket-detail-name',
  bucket_detail_badges: 'bucket-detail-badges',
  bucket_detail_actions: 'bucket-detail-actions',
  bucket_detail_stats: 'bucket-detail-stats',
  bucket_detail_objects: 'bucket-detail-objects',

  // Objects Section
  objects_section: 'objects-section',
  objects_header: 'objects-header',
  upload_files_btn: 'upload-files-btn',
  create_folder_btn: 'create-folder-btn',
  objects_table: 'objects-table',
  object_row: 'object-row',
  object_name: 'object-name',
  object_size: 'object-size',
  object_type: 'object-type',
  object_modified: 'object-modified',
  object_storage_class: 'object-storage-class',
  object_actions: 'object-actions',
  object_menu_btn: 'object-menu-btn',

  // File Operations
  file_upload_modal: 'file-upload-modal',
  file_preview_modal: 'file-preview-modal',
  create_folder_modal: 'create-folder-modal',
  rename_file_modal: 'rename-file-modal',
  delete_file_alert: 'delete-file-alert',

  // Analytics Page
  analytics_header: 'analytics-header',
  analytics_period_selector: 'analytics-period-selector',
  export_report_btn: 'export-report-btn',
  analytics_alerts: 'analytics-alerts',
  analytics_metrics: 'analytics-metrics',
  analytics_charts: 'analytics-charts',
  analytics_tables: 'analytics-tables',

  // Analytics Metrics
  total_storage_metric: 'total-storage-metric',
  monthly_cost_metric: 'monthly-cost-metric',
  data_transfer_metric: 'data-transfer-metric',
  requests_metric: 'requests-metric',

  // Billing Page
  billing_header: 'billing-header',
  billing_overview: 'billing-overview',
  billing_cards: 'billing-cards',
  payment_methods: 'payment-methods',
  invoices: 'invoices',

  // Billing Cards
  current_month_card: 'current-month-card',
  storage_usage_card: 'storage-usage-card',
  upcoming_payment_card: 'upcoming-payment-card',

  // Payment Methods
  add_payment_method_btn: 'add-payment-method-btn',
  payment_method_card: 'payment-method-card',
  payment_method_type: 'payment-method-type',
  payment_method_last4: 'payment-method-last4',
  payment_method_expiry: 'payment-method-expiry',
  payment_method_default: 'payment-method-default',

  // Add Payment Method Modal
  add_payment_modal: 'add-payment-modal',
  card_number_input: 'card-number-input',
  expiry_date_input: 'expiry-date-input',
  cvv_input: 'cvv-input',
  cardholder_name_input: 'cardholder-name-input',
  save_payment_btn: 'save-payment-btn',

  // Invoices
  invoice_list: 'invoice-list',
  invoice_item: 'invoice-item',
  invoice_number: 'invoice-number',
  invoice_date: 'invoice-date',
  invoice_amount: 'invoice-amount',
  invoice_status: 'invoice-status',
  download_invoice_btn: 'download-invoice-btn',

  // User Menu
  user_menu: 'user-menu',
  user_avatar: 'user-avatar',
  user_name: 'user-name',
  user_email: 'user-email',
  profile_link: 'profile-link',
  settings_link: 'settings-link',
  logout_btn: 'logout-btn',

  // Notifications
  notification_bell: 'notification-bell',
  notification_count: 'notification-count',
  notification_modal: 'notification-modal',
  notification_list: 'notification-list',
  notification_item: 'notification-item',

  // Breadcrumbs
  breadcrumb_container: 'breadcrumb-container',
  breadcrumb_item: 'breadcrumb-item',
  breadcrumb_link: 'breadcrumb-link',

  // Responsive Elements
  mobile_search_btn: 'mobile-search-btn',
  mobile_search_modal: 'mobile-search-modal',
  mobile_filters: 'mobile-filters',
  mobile_sort: 'mobile-sort',

  // Empty States
  empty_state: 'empty-state',
  empty_state_image: 'empty-state-image',
  empty_state_title: 'empty-state-title',
  empty_state_description: 'empty-state-description',
  empty_state_action: 'empty-state-action',

  // Progress Indicators
  progress_bar: 'progress-bar',
  progress_percentage: 'progress-percentage',
  progress_label: 'progress-label',

  // Form Elements
  form_container: 'form-container',
  form_field: 'form-field',
  form_label: 'form-label',
  form_input: 'form-input',
  form_select: 'form-select',
  form_checkbox: 'form-checkbox',
  form_radio: 'form-radio',
  form_textarea: 'form-textarea',
  form_error: 'form-error',
  form_help: 'form-help',

  // Buttons
  primary_button: 'primary-button',
  secondary_button: 'secondary-button',
  outline_button: 'outline-button',
  ghost_button: 'ghost-button',
  danger_button: 'danger-button',
  success_button: 'success-button',

  // Icons
  icon_container: 'icon-container',
  icon_button: 'icon-button',

  // Tables
  table_container: 'table-container',
  table_header: 'table-header',
  table_body: 'table-body',
  table_row: 'table-row',
  table_cell: 'table-cell',
  table_sort: 'table-sort',
  table_filter: 'table-filter',

  // Modals and Dialogs
  modal_overlay: 'modal-overlay',
  modal_content: 'modal-content',
  modal_header: 'modal-header',
  modal_body: 'modal-body',
  modal_footer: 'modal-footer',
  modal_close: 'modal-close',

  // Alerts and Dialogs
  alert_dialog: 'alert-dialog',
  alert_dialog_overlay: 'alert-dialog-overlay',
  alert_dialog_content: 'alert-dialog-content',
  alert_dialog_header: 'alert-dialog-header',
  alert_dialog_body: 'alert-dialog-body',
  alert_dialog_footer: 'alert-dialog-footer',

  // Tooltips and Popovers
  tooltip: 'tooltip',
  popover: 'popover',
  popover_trigger: 'popover-trigger',
  popover_content: 'popover-content',

  // Dropdowns and Menus
  dropdown: 'dropdown',
  dropdown_trigger: 'dropdown-trigger',
  dropdown_menu: 'dropdown-menu',
  dropdown_item: 'dropdown-item',

  // Tabs
  tabs_container: 'tabs-container',
  tab_list: 'tab-list',
  tab: 'tab',
  tab_panel: 'tab-panel',

  // Accordion
  accordion: 'accordion',
  accordion_item: 'accordion-item',
  accordion_button: 'accordion-button',
  accordion_panel: 'accordion-panel',

  // Cards
  card: 'card',
  card_header: 'card-header',
  card_body: 'card-body',
  card_footer: 'card-footer',

  // Badges
  badge: 'badge',
  badge_container: 'badge-container',

  // Links
  link: 'link',
  external_link: 'external-link',

  // Images
  image: 'image',
  image_container: 'image-container',

  // Text Elements
  heading: 'heading',
  title: 'title',
  subtitle: 'subtitle',
  description: 'description',
  caption: 'caption',
  label: 'label',
  text: 'text',

  // Status Indicators
  status: 'status',
  status_indicator: 'status-indicator',
  status_text: 'status-text',

  // Loading States
  skeleton: 'skeleton',
  skeleton_text: 'skeleton-text',
  skeleton_image: 'skeleton-image',
  skeleton_button: 'skeleton-button',

  // Error States
  error_boundary: 'error-boundary',
  error_message: 'error-message',
  error_retry: 'error-retry',

  // Success States
  success_message: 'success-message',
  success_icon: 'success-icon',

  // Warning States
  warning_message: 'warning-message',
  warning_icon: 'warning-icon',

  // Info States
  info_message: 'info-message',
  info_icon: 'info-icon'
}

export { testIds }
