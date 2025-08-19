const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Keep original filename
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileInfo = {
            originalName: req.file.originalname,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: req.file.path
        };

        res.json({
            success: true,
            file: fileInfo
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// File conversion endpoint (simulated)
app.post('/convert', (req, res) => {
    try {
        const { fromFormat, toFormat, filename } = req.body;
        
        // Simulate conversion process
        setTimeout(() => {
            const convertedFilename = filename.replace(/\.[^/.]+$/, `.${toFormat.toLowerCase()}`);
            
            res.json({
                success: true,
                convertedFile: {
                    originalName: filename,
                    convertedName: convertedFilename,
                    fromFormat: fromFormat,
                    toFormat: toFormat
                }
            });
        }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
        
    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).json({ error: 'Conversion failed' });
    }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'uploads', filename);
        
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Download failed' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 File Converter server running on http://localhost:${PORT}`);
    console.log(`📁 Static files served from: ${__dirname}`);
    console.log(`📤 Upload directory: ${path.join(__dirname, 'uploads')}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    process.exit(0);
});
