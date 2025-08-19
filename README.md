# File Converter

A modern, clean file format converter web application built with Node.js, Express, and vanilla JavaScript.

## Features

- 🎨 Modern, OpenAI-inspired design
- 📁 Drag-and-drop file upload
- 🔄 Support for 200+ file formats across 9 categories
- ⚡ Real-time format detection
- 📱 Responsive design
- 🚀 Fast and lightweight

## Supported Formats

### Video (25+ formats)
MP4, AVI, MOV, WMV, FLV, MKV, WEBM, OGV, 3GP, M4V, MPG, MPEG, VOB, TS, M2TS, MTS, ASF, RM, RMVB, SWF, F4V, DV, MXF, GXF, R3D, BRK2, Y4M

### Audio (20+ formats)
MP3, WAV, FLAC, AAC, OGG, WMA, M4A, AIFF, AC3, DTS, PCM, ALAC, APE, TTA, MKA, AU, AMR, 3GA, CAF, SD2, VOC, PVF, YUV, OPUS

### Image (30+ formats)
JPG, JPEG, PNG, BMP, GIF, TIFF, WEBP, SVG, HEIC, HEIF, AVIF, JXL, APNG, ICO, CUR, ANI, TGA, PCX, PSD, XCF, DDS, HDR, EXR, CR2, NEF, ARW, DNG, ORF, RW2, RAF, PEF, 3FR, DCR, KDC, MRW, SRW, X3F

### Document (25+ formats)
PDF, DOCX, DOC, RTF, ODT, PAGES, WPS, TXT, HTML, EPUB, MOBI, AZW3, FB2, LIT, PDB, TCR, PPTX, PPT, ODP, KEY, XLSX, XLS, CSV, ODS, NUMBERS, TSV, DBF, JSON, XML, SQL, MD, TEX, PS, EPS

### Archive (15+ formats)
ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ, LZMA, CAB, ISO, DMG, IMG, BIN, NRG, MDF, CUE

### Data (15+ formats)
CSV, TSV, XLSX, JSON, XML, YAML, SQL, SQLITE, PARQUET, AVRO, ORC, FEATHER, INI, CONF, TOML, ENV, ICS, VCS, VCF, LDIF

### Vector (15+ formats)
SVG, AI, EPS, PDF, CDR, WMF, EMF, DXF, DWG, STEP, IGES, STL, SKP, 3DS, OBJ, PLY, GLTF

### Web (10+ formats)
HTML, XHTML, XML, MHTML, HTM, CSS, SCSS, SASS, LESS, JS, TS, COFFEE, WEBP, AVIF

### System (10+ formats)
EXE, MSI, DMG, PKG, DEB, RPM, APK, DLL, SO, DYLIB, REG, PLIST

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Development

### Development mode (with auto-restart)
```bash
npm run dev
```

### Static file serving (alternative)
```bash
npm run serve
```

## API Endpoints

- `GET /` - Serve the main application
- `POST /upload` - Upload a file
- `POST /convert` - Convert a file (simulated)
- `GET /download/:filename` - Download a converted file
- `GET /health` - Health check endpoint

## Project Structure

```
converter/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js Express server
├── package.json        # Node.js dependencies
├── .gitignore          # Git ignore rules
├── README.md           # This file
└── uploads/            # Uploaded files (created automatically)
```

## Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)

### File Upload Limits
- Maximum file size: 100MB
- Supported formats: All file types

## Features

### Frontend
- Modern, responsive design
- Drag-and-drop file upload
- Real-time format detection
- Smart format selection
- Loading animations
- Download functionality

### Backend
- Express.js server
- File upload handling with Multer
- CORS enabled
- Static file serving
- Simulated conversion process
- File download endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on the repository.
