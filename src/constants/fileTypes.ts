/**
 * File type constants and configurations
 */

// File type categories
export const FILE_CATEGORIES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  AUDIO: 'audio',
  VIDEO: 'video',
  ARCHIVE: 'archive',
  CODE: 'code',
  TEXT: 'text',
  SPREADSHEET: 'spreadsheet',
  PRESENTATION: 'presentation',
  OTHER: 'other',
} as const;

export type FileCategory = typeof FILE_CATEGORIES[keyof typeof FILE_CATEGORIES];

// File extensions by category
export const FILE_EXTENSIONS = {
  [FILE_CATEGORIES.IMAGE]: [
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'tif',
    'heic', 'heif', 'avif', 'jxl', 'raw', 'cr2', 'nef', 'arw', 'dng'
  ],
  [FILE_CATEGORIES.DOCUMENT]: [
    'pdf', 'doc', 'docx', 'rtf', 'odt', 'pages', 'txt', 'md', 'tex', 'latex'
  ],
  [FILE_CATEGORIES.AUDIO]: [
    'mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a', 'opus', 'aiff', 'alac'
  ],
  [FILE_CATEGORIES.VIDEO]: [
    'mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp', 'ogv',
    'mpg', 'mpeg', 'ts', 'mts', 'm2ts'
  ],
  [FILE_CATEGORIES.ARCHIVE]: [
    'zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'lzma', 'cab', 'iso',
    'dmg', 'pkg', 'deb', 'rpm'
  ],
  [FILE_CATEGORIES.CODE]: [
    'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'sass', 'less', 'json',
    'xml', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf', 'sh', 'bash', 'zsh',
    'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt'
  ],
  [FILE_CATEGORIES.TEXT]: [
    'txt', 'md', 'markdown', 'rst', 'asciidoc', 'log',
    'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf'
  ],
  [FILE_CATEGORIES.SPREADSHEET]: [
    'xls', 'xlsx', 'ods', 'csv', 'tsv', 'numbers'
  ],
  [FILE_CATEGORIES.PRESENTATION]: [
    'ppt', 'pptx', 'odp', 'key', 'pdf'
  ],
} as const;

// MIME types mapping
export const MIME_TYPES: Record<string, string> = {
  // Images
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',
  'tiff': 'image/tiff',
  'tif': 'image/tiff',
  'heic': 'image/heic',
  'heif': 'image/heif',
  'avif': 'image/avif',
  'jxl': 'image/jxl',
  'raw': 'image/x-raw',
  'cr2': 'image/x-canon-cr2',
  'nef': 'image/x-nikon-nef',
  'arw': 'image/x-sony-arw',
  'dng': 'image/x-adobe-dng',

  // Documents
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'rtf': 'application/rtf',
  'odt': 'application/vnd.oasis.opendocument.text',
  'pages': 'application/x-iwork-pages-sffpages',
  'txt': 'text/plain',
  'md': 'text/markdown',
  'markdown': 'text/markdown',
  'tex': 'application/x-tex',
  'latex': 'application/x-latex',

  // Audio
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'flac': 'audio/flac',
  'aac': 'audio/aac',
  'ogg': 'audio/ogg',
  'wma': 'audio/x-ms-wma',
  'm4a': 'audio/mp4',
  'opus': 'audio/opus',
  'aiff': 'audio/aiff',
  'alac': 'audio/alac',

  // Video
  'mp4': 'video/mp4',
  'avi': 'video/x-msvideo',
  'mov': 'video/quicktime',
  'wmv': 'video/x-ms-wmv',
  'flv': 'video/x-flv',
  'webm': 'video/webm',
  'mkv': 'video/x-matroska',
  'm4v': 'video/x-m4v',
  '3gp': 'video/3gpp',
  'ogv': 'video/ogg',
  'mpg': 'video/mpeg',
  'mpeg': 'video/mpeg',
//   'ts': 'video/mp2t',
  'mts': 'video/mp2t',
  'm2ts': 'video/mp2t',

  // Archives
  'zip': 'application/zip',
  'rar': 'application/x-rar-compressed',
  '7z': 'application/x-7z-compressed',
  'tar': 'application/x-tar',
  'gz': 'application/gzip',
  'bz2': 'application/x-bzip2',
  'xz': 'application/x-xz',
  'lzma': 'application/x-lzma',
  'cab': 'application/vnd.ms-cab-compressed',
  'iso': 'application/x-iso9660-image',
  'dmg': 'application/x-apple-diskimage',
  'pkg': 'application/x-newton-compatible-pkg',
  'deb': 'application/vnd.debian.binary-package',
  'rpm': 'application/x-rpm',

  // Code
  'js': 'text/javascript',
  'ts': 'text/typescript',
  'jsx': 'text/jsx',
  'tsx': 'text/tsx',
  'html': 'text/html',
  'css': 'text/css',
  'scss': 'text/x-scss',
  'sass': 'text/x-sass',
  'less': 'text/x-less',
  'json': 'application/json',
  'xml': 'text/xml',
  'yaml': 'text/yaml',
  'yml': 'text/yaml',
  'toml': 'text/toml',
  'ini': 'text/plain',
  'cfg': 'text/plain',
  'conf': 'text/plain',
  'sh': 'text/x-sh',
  'bash': 'text/x-sh',
  'zsh': 'text/x-sh',
  'py': 'text/x-python',
  'java': 'text/x-java-source',
  'cpp': 'text/x-c++src',
  'c': 'text/x-csrc',
  'cs': 'text/x-csharp',
  'php': 'text/x-php',
  'rb': 'text/x-ruby',
  'go': 'text/x-go',
  'rs': 'text/x-rust',
  'swift': 'text/x-swift',
  'kt': 'text/x-kotlin',

  // Spreadsheets
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',
  'csv': 'text/csv',
  'tsv': 'text/tab-separated-values',
  'numbers': 'application/x-iwork-numbers-sffnumbers',

  // Presentations
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'odp': 'application/vnd.oasis.opendocument.presentation',
  'key': 'application/x-iwork-keynote-sffkey',
} as const;

// File type detection
export const getFileCategory = (filename: string): FileCategory => {
  const extension = filename.toLowerCase().split('.').pop() || '';
  
  for (const [category, extensions] of Object.entries(FILE_EXTENSIONS)) {
    if (extensions.includes(extension as never)) {
      return category as FileCategory;
    }
  }
  
  return FILE_CATEGORIES.OTHER;
};

// Get MIME type from filename
export const getMimeType = (filename: string): string => {
  const extension = filename.toLowerCase().split('.').pop() || '';
  return MIME_TYPES[extension] || 'application/octet-stream';
};

// Check if file is previewable
export const isPreviewable = (filename: string): boolean => {
  const category = getFileCategory(filename);
  return [
    FILE_CATEGORIES.IMAGE,
    FILE_CATEGORIES.TEXT,
    FILE_CATEGORIES.CODE,
    FILE_CATEGORIES.DOCUMENT,
    FILE_CATEGORIES.SPREADSHEET,
    FILE_CATEGORIES.PRESENTATION,
  ].includes(category as any);
};

// Check if file is editable
export const isEditable = (filename: string): boolean => {
  const category = getFileCategory(filename);
  return [
    FILE_CATEGORIES.TEXT,
    FILE_CATEGORIES.CODE,
    FILE_CATEGORIES.SPREADSHEET,
    FILE_CATEGORIES.PRESENTATION,
  ].includes(category as any);
};

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  PREVIEW: 10 * 1024 * 1024, // 10MB
  EDIT: 5 * 1024 * 1024,     // 5MB
  UPLOAD: 100 * 1024 * 1024, // 100MB
  MAX: 5 * 1024 * 1024 * 1024, // 5GB
} as const;

// File icon mapping
export const FILE_ICONS: Record<FileCategory, string> = {
  [FILE_CATEGORIES.IMAGE]: '🖼️',
  [FILE_CATEGORIES.DOCUMENT]: '📄',
  [FILE_CATEGORIES.AUDIO]: '🎵',
  [FILE_CATEGORIES.VIDEO]: '🎬',
  [FILE_CATEGORIES.ARCHIVE]: '📦',
  [FILE_CATEGORIES.CODE]: '💻',
  [FILE_CATEGORIES.TEXT]: '📝',
  [FILE_CATEGORIES.SPREADSHEET]: '📊',
  [FILE_CATEGORIES.PRESENTATION]: '📽️',
  [FILE_CATEGORIES.OTHER]: '📁',
} as const;

// File color mapping
export const FILE_COLORS: Record<FileCategory, string> = {
  [FILE_CATEGORIES.IMAGE]: '#4CAF50',
  [FILE_CATEGORIES.DOCUMENT]: '#2196F3',
  [FILE_CATEGORIES.AUDIO]: '#9C27B0',
  [FILE_CATEGORIES.VIDEO]: '#F44336',
  [FILE_CATEGORIES.ARCHIVE]: '#FF9800',
  [FILE_CATEGORIES.CODE]: '#607D8B',
  [FILE_CATEGORIES.TEXT]: '#795548',
  [FILE_CATEGORIES.SPREADSHEET]: '#4CAF50',
  [FILE_CATEGORIES.PRESENTATION]: '#E91E63',
  [FILE_CATEGORIES.OTHER]: '#9E9E9E',
} as const;
