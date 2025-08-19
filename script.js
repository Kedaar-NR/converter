// File format categories and their extensions
const formatCategories = {
    'Video': [
        'MP4', 'AVI', 'MOV', 'WMV', 'FLV', 'MKV', 'WEBM', 'OGV', '3GP', 'M4V',
        'MPG', 'MPEG', 'VOB', 'TS', 'M2TS', 'MTS', 'ASF', 'RM', 'RMVB',
        'SWF', 'F4V', 'DV', 'MXF', 'GXF', 'R3D', 'BRK2', 'Y4M'
    ],
    'Audio': [
        'MP3', 'WAV', 'FLAC', 'AAC', 'OGG', 'WMA', 'M4A', 'AIFF',
        'AC3', 'DTS', 'PCM', 'ALAC', 'APE', 'TTA', 'MKA', 'AU',
        'AMR', '3GA', 'CAF', 'SD2', 'VOC', 'PVF', 'YUV', 'OPUS'
    ],
    'Image': [
        'JPG', 'JPEG', 'PNG', 'BMP', 'GIF', 'TIFF', 'WEBP', 'SVG',
        'HEIC', 'HEIF', 'AVIF', 'JXL', 'APNG', 'ICO', 'CUR', 'ANI',
        'TGA', 'PCX', 'PSD', 'XCF', 'DDS', 'HDR', 'EXR',
        'CR2', 'NEF', 'ARW', 'DNG', 'ORF', 'RW2', 'RAF', 'PEF',
        '3FR', 'DCR', 'KDC', 'MRW', 'SRW', 'X3F'
    ],
    'Document': [
        'PDF', 'DOCX', 'DOC', 'RTF', 'ODT', 'PAGES', 'WPS', 'TXT',
        'HTML', 'EPUB', 'MOBI', 'AZW3', 'FB2', 'LIT', 'PDB', 'TCR',
        'PPTX', 'PPT', 'ODP', 'KEY', 'XLSX', 'XLS', 'CSV', 'ODS', 'NUMBERS',
        'TSV', 'DBF', 'JSON', 'XML', 'SQL', 'MD', 'TEX', 'PS', 'EPS'
    ],
    'Archive': [
        'ZIP', 'RAR', '7Z', 'TAR', 'GZ', 'BZ2', 'XZ', 'LZMA',
        'CAB', 'ISO', 'DMG', 'IMG', 'BIN', 'NRG', 'MDF', 'CUE'
    ],
    'Data': [
        'CSV', 'TSV', 'XLSX', 'JSON', 'XML', 'YAML', 'SQL',
        'SQLITE', 'PARQUET', 'AVRO', 'ORC', 'FEATHER',
        'INI', 'CONF', 'TOML', 'ENV', 'ICS', 'VCS', 'VCF', 'LDIF'
    ],
    'Vector': [
        'SVG', 'AI', 'EPS', 'PDF', 'CDR', 'WMF', 'EMF',
        'DXF', 'DWG', 'STEP', 'IGES', 'STL', 'SKP',
        '3DS', 'OBJ', 'PLY', 'GLTF'
    ],
    'Web': [
        'HTML', 'XHTML', 'XML', 'MHTML', 'HTM',
        'CSS', 'SCSS', 'SASS', 'LESS',
        'JS', 'TS', 'COFFEE', 'WEBP', 'AVIF'
    ],
    'System': [
        'EXE', 'MSI', 'DMG', 'PKG', 'DEB', 'RPM', 'APK',
        'DLL', 'SO', 'DYLIB', 'REG', 'PLIST'
    ]
};

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeFile = document.getElementById('removeFile');
const fromFormat = document.getElementById('fromFormat');
const toFormat = document.getElementById('toFormat');
const convertBtn = document.getElementById('convertBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const downloadSection = document.getElementById('downloadSection');
const downloadBtn = document.getElementById('downloadBtn');

let currentFile = null;
let convertedFile = null;

// Initialize the application
function init() {
    setupEventListeners();
    populateFormatOptions();
}

// Setup event listeners
function setupEventListeners() {
    // File upload area
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // File input
    fileInput.addEventListener('change', handleFileSelect);
    
    // Remove file button
    removeFile.addEventListener('click', removeCurrentFile);
    
    // Format selection
    fromFormat.addEventListener('change', updateToFormatOptions);
    toFormat.addEventListener('change', updateConvertButton);
    
    // Convert button
    convertBtn.addEventListener('click', convertFile);
    
    // Download button
    downloadBtn.addEventListener('click', downloadFile);
}

// Handle drag and drop events
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// Process the selected file
function handleFile(file) {
    currentFile = file;
    
    // Display file info
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.style.display = 'block';
    
    // Detect file format
    const detectedFormat = detectFileFormat(file.name);
    populateFromFormat(detectedFormat);
    
    // Enable format selection
    fromFormat.disabled = false;
    toFormat.disabled = false;
    
    // Update convert button
    updateConvertButton();
}

// Remove current file
function removeCurrentFile() {
    currentFile = null;
    convertedFile = null;
    
    // Reset UI
    fileInfo.style.display = 'none';
    fileInput.value = '';
    fromFormat.value = '';
    toFormat.value = '';
    fromFormat.disabled = true;
    toFormat.disabled = true;
    convertBtn.disabled = true;
    downloadSection.style.display = 'none';
    
    // Reset format options
    populateFormatOptions();
}

// Detect file format from filename
function detectFileFormat(filename) {
    const extension = filename.split('.').pop().toUpperCase();
    return extension;
}

// Format file size for display
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Populate format options
function populateFormatOptions() {
    // Clear existing options
    fromFormat.innerHTML = '<option value="">Select format...</option>';
    toFormat.innerHTML = '<option value="">Select format...</option>';
    
    // Add all formats
    Object.keys(formatCategories).forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        formatCategories[category].forEach(format => {
            const option = document.createElement('option');
            option.value = format;
            option.textContent = format;
            optgroup.appendChild(option);
        });
        
        toFormat.appendChild(optgroup.cloneNode(true));
    });
}

// Populate from format with detected format
function populateFromFormat(detectedFormat) {
    fromFormat.innerHTML = '<option value="">Select format...</option>';
    
    Object.keys(formatCategories).forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        formatCategories[category].forEach(format => {
            const option = document.createElement('option');
            option.value = format;
            option.textContent = format;
            if (format === detectedFormat) {
                option.selected = true;
            }
            optgroup.appendChild(option);
        });
        
        fromFormat.appendChild(optgroup);
    });
}

// Update to format options based on from format
function updateToFormatOptions() {
    const selectedFromFormat = fromFormat.value;
    
    // Clear to format
    toFormat.innerHTML = '<option value="">Select format...</option>';
    
    if (selectedFromFormat) {
        // Find the category of the selected format
        let sourceCategory = null;
        for (const [category, formats] of Object.entries(formatCategories)) {
            if (formats.includes(selectedFromFormat)) {
                sourceCategory = category;
                break;
            }
        }
        
        if (sourceCategory) {
            // Add formats from the same category
            const optgroup = document.createElement('optgroup');
            optgroup.label = sourceCategory;
            
            formatCategories[sourceCategory].forEach(format => {
                if (format !== selectedFromFormat) {
                    const option = document.createElement('option');
                    option.value = format;
                    option.textContent = format;
                    optgroup.appendChild(option);
                }
            });
            
            toFormat.appendChild(optgroup);
        }
    }
    
    updateConvertButton();
}

// Update convert button state
function updateConvertButton() {
    const hasFile = currentFile !== null;
    const hasFromFormat = fromFormat.value !== '';
    const hasToFormat = toFormat.value !== '';
    
    convertBtn.disabled = !(hasFile && hasFromFormat && hasToFormat);
}

// Convert file (simulation)
async function convertFile() {
    if (!currentFile || !fromFormat.value || !toFormat.value) return;
    
    // Show loading state
    convertBtn.disabled = true;
    loadingSpinner.style.display = 'block';
    document.querySelector('.btn-text').textContent = 'Converting...';
    
    // Simulate conversion process
    await simulateConversion();
    
    // Create converted file
    convertedFile = createConvertedFile();
    
    // Show download section
    downloadSection.style.display = 'block';
    
    // Reset convert button
    convertBtn.disabled = false;
    loadingSpinner.style.display = 'none';
    document.querySelector('.btn-text').textContent = 'Convert File';
}

// Simulate conversion process
function simulateConversion() {
    return new Promise(resolve => {
        // Random conversion time between 2-5 seconds
        const conversionTime = Math.random() * 3000 + 2000;
        
        setTimeout(() => {
            resolve();
        }, conversionTime);
    });
}

// Create converted file
function createConvertedFile() {
    const originalName = currentFile.name;
    const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.'));
    const newExtension = toFormat.value.toLowerCase();
    const newFileName = `${nameWithoutExtension}.${newExtension}`;
    
    // Create a new file with the same content but different name
    return new File([currentFile], newFileName, {
        type: getMimeType(newExtension)
    });
}

// Get MIME type for file extension
function getMimeType(extension) {
    const mimeTypes = {
        'mp4': 'video/mp4',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime',
        'wmv': 'video/x-ms-wmv',
        'flv': 'video/x-flv',
        'mkv': 'video/x-matroska',
        'webm': 'video/webm',
        'ogv': 'video/ogg',
        '3gp': 'video/3gpp',
        'm4v': 'video/x-m4v',
        'mpg': 'video/mpeg',
        'mpeg': 'video/mpeg',
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'flac': 'audio/flac',
        'aac': 'audio/aac',
        'ogg': 'audio/ogg',
        'wma': 'audio/x-ms-wma',
        'm4a': 'audio/mp4',
        'aiff': 'audio/aiff',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'bmp': 'image/bmp',
        'gif': 'image/gif',
        'tiff': 'image/tiff',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'pdf': 'application/pdf',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'doc': 'application/msword',
        'rtf': 'application/rtf',
        'txt': 'text/plain',
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'json': 'application/json',
        'xml': 'application/xml',
        'zip': 'application/zip',
        'rar': 'application/vnd.rar',
        '7z': 'application/x-7z-compressed',
        'tar': 'application/x-tar',
        'gz': 'application/gzip'
    };
    
    return mimeTypes[extension] || 'application/octet-stream';
}

// Download converted file
function downloadFile() {
    if (!convertedFile) return;
    
    const url = URL.createObjectURL(convertedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
