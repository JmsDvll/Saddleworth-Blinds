# Saddleworth Blinds Website

A professional website for Saddleworth Blinds, showcasing window treatments and services. This is a modern, responsive website built with HTML5, CSS3, and JavaScript, featuring an extensive product catalog and online booking system.

## 🌐 Live Website
Visit the live website at: **https://jmsdvll.github.io/Saddleworth-Blinds/**

## 📋 Features

### Product Pages
- **Roller Blinds** - Modern roller blind solutions
- **Roman Blinds** - Elegant fabric window treatments
- **Venetian Blinds** - Classic wooden and aluminum blinds
- **Vertical Blinds** - Perfect for large windows and sliding doors
- **Perfect Fit Blinds** - No-drill installation options
- **Vision Blinds** - Contemporary pleated blinds
- **Shutters** - Premium window shutters
- **Curtains** - Traditional and modern curtain solutions

### Core Functionality
- ✅ Online booking system with appointment scheduling
- ✅ Contact forms and business information
- ✅ Mobile-responsive design for all devices
- ✅ SEO optimized with sitemap and meta tags
- ✅ Professional business presentation
- ✅ Image optimization system
- ✅ Automatic deployment via GitHub Pages and webhooks

## 🚀 Deployment

### GitHub Pages
This website is automatically deployed via GitHub Pages from the `main` branch.

### Production Server (Webhook Deployment)
The website also supports automatic deployment to a production server using GitHub webhooks:
- **Webhook Script**: `webhook-deploy.php` handles automatic deployments
- **Configuration**: Uses `webhook-config.php` for secure token management
- **Logging**: All deployments are logged to `deploy.log`

## 🔧 Development Setup

### Prerequisites
- Python 3.x (for image optimization)
- Pillow library: `pip install Pillow>=10.0.0`

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/jmsdvll/Saddleworth-Blinds.git
   cd Saddleworth-Blinds
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run locally:
   - **Option 1**: Open `index.html` directly in your browser
   - **Option 2**: Use a local web server:
     ```bash
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000`

### Image Optimization
The project includes an automated image optimization system:

```bash
# Run the image optimization script
python optimize_images.py

# Or use the batch file (Windows)
optimize_images.bat
```

The script processes images from multiple source directories and creates optimized versions in multiple sizes (400px, 800px, 1600px) in both JPG and WebP formats.

## 📁 Project Structure

```
Saddleworth-Blinds/
├── index.html                 # Main homepage
├── *.html                     # Product pages
├── css/
│   └── styles.css            # Main stylesheet (77KB)
├── js/
│   └── main.js               # Main JavaScript (36KB)
├── images/
│   ├── optimized/            # Optimized web images
│   └── [various]/            # Source image directories
├── optimize_images.py        # Image optimization script
├── webhook-deploy.php        # Production deployment script
├── requirements.txt          # Python dependencies
├── robots.txt               # SEO configuration
├── sitemap.xml              # Site structure for search engines
└── .htaccess                # Apache server configuration
```

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Responsive Design**: Mobile-first approach
- **Image Processing**: Python with Pillow library
- **Hosting**: GitHub Pages (staging) + Production server
- **Deployment**: GitHub webhooks for automatic deployment
- **SEO**: Optimized meta tags, sitemap, and robots.txt

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- HTTPS enforced on production
- Secure webhook deployment with signature verification
- Input validation on all forms
- XSS protection implemented

## 📞 Support

For technical support or questions about the website, please contact the development team or refer to the deployment logs for troubleshooting.

## 📄 License

This project is proprietary software for Saddleworth Blinds. All rights reserved.