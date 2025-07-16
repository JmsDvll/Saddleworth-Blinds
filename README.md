# Sunshine Blinds Saddleworth - Lead Generation Website

A professional lead generation website for Sunshine Blinds Saddleworth, designed to capture and convert window treatment inquiries into qualified leads.

## 🎯 Business Purpose
This website serves as the primary lead generation tool for Sunshine Blinds Saddleworth, a window blinds specialist serving the Saddleworth area (Uppermill, Diggle, Delph, Greenfield, Dobcross, Lydgate). The site is optimized to capture leads through multiple conversion points and guide visitors toward booking free home consultations.

## 🌐 Live Website
Visit the live website at: **https://saddleworthblinds.co.uk/**

## 📊 Lead Generation Features

### Primary Conversion Points
- **Free Quote Booking Form** - Multi-step form capturing detailed customer information
- **Contact Form** - Quick message form for general inquiries
- **Phone Number Prominence** - Direct call-to-action (01457 597091)
- **Appointment Booking System** - Streamlined process for home consultations

### Lead Capture Elements
- **Product Showcase Pages** - Detailed pages for each blind type with conversion CTAs
- **Local SEO Optimization** - Targeting Saddleworth-area keywords
- **Customer Reviews Integration** - Social proof with 4.9/5 rating from 127 reviews
- **Free Consultation Offers** - No-obligation home visits as primary lead magnet
- **Mobile-Responsive Design** - Optimized for mobile users (majority of local searches)

### Lead Qualification Features
- **Address Collection** - Service area validation
- **Window Count Assessment** - Project scope qualification
- **Product Interest Tracking** - Blind type preferences
- **Contact Information Validation** - Multiple contact methods

## 🏗️ Technical Architecture

### Frontend Stack
- **HTML5** - Semantic markup for SEO
- **CSS3** - Responsive design with modern styling
- **JavaScript** - Form validation and user interaction
- **Schema.org Markup** - Rich snippets for local business

### SEO & Performance
- **Local SEO Optimization** - Targeting Saddleworth-area keywords
- **Structured Data** - LocalBusiness schema markup
- **Mobile-First Design** - Responsive across all devices
- **Fast Loading** - Optimized images and assets
- **Meta Tags** - Comprehensive SEO meta information

### Deployment
- **Webhook Auto-Deploy System** - Automatic deployment via GitHub webhooks
- **Server Repository Clone** - Direct deployment to production server
- **PHP Webhook Handler** - Secure webhook processing with signature verification
- **Custom Domain** - Live at saddleworthblinds.co.uk
- **SSL Certificate** - Secure HTTPS hosting

## 📁 Project Structure
```
├── index.html              # Homepage with lead capture CTAs
├── book-appointment.html   # Primary lead generation form
├── contact.html           # Secondary contact form
├── [product-pages]/       # Individual blind type pages
├── css/                   # Stylesheets
├── js/                    # JavaScript functionality
├── images/                # Optimized product images
├── webhook-deploy.php     # GitHub webhook deployment handler
├── webhook-config.php     # Webhook configuration (not in repo)
├── deploy.log            # Deployment logs
└── sitemap.xml           # SEO sitemap
```

## 🚀 Development & Deployment

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Or serve with a local web server: `python -m http.server 8000`

### Webhook Deployment System
The website uses an automated deployment system that triggers on every commit to the main branch:

- **GitHub Webhook** - Triggers deployment on push to main branch
- **PHP Webhook Handler** - `webhook-deploy.php` processes deployment requests
- **Server Repository** - Direct deployment to production server
- **Conflict Resolution** - Automatic stash and reset to prevent deployment conflicts
- **Deployment Logging** - All deployments logged to `deploy.log`

### Development Workflow
1. Make changes to HTML, CSS, or JavaScript files
2. Commit and push to main branch
3. Webhook automatically deploys to saddleworthblinds.co.uk
4. Changes are live within seconds

### Webhook Configuration
- **Webhook URL**: `https://saddleworthblinds.co.uk/webhook-deploy.php`
- **Secret Token**: Configured in `webhook-config.php` (not committed to repo)
- **Branch**: Main branch only
- **Events**: Push events only

## 📈 Lead Generation Strategy

### Target Audience
- Homeowners in Saddleworth area
- Property developers and landlords
- Interior designers and contractors
- Commercial property managers

### Conversion Funnel
1. **Awareness** - Local SEO and product pages
2. **Interest** - Detailed product information and reviews
3. **Consideration** - Free consultation offers
4. **Action** - Booking forms and phone calls

### Key Performance Indicators
- Form submission rates
- Phone call volume
- Page load times
- Mobile conversion rates
- Local search rankings

## 🔧 Maintenance & Updates

### Regular Tasks
- Monitor form submissions and lead quality
- Update product information and pricing
- Optimize images for performance
- Review and update local SEO content
- Test conversion flows across devices

### Content Management
- Product page updates
- Customer testimonial additions
- Service area expansion
- Seasonal promotions
- Blog content (future enhancement)

## 📞 Business Contact
- **Phone**: 01457 597091
- **Email**: sales@saddleworthblinds.co.uk
- **Service Area**: Saddleworth, Uppermill, Diggle, Delph, Greenfield, Dobcross, Lydgate
- **Showroom**: Shaw, Greater Manchester

---

*This website is designed and optimized specifically for lead generation in the window blinds industry, with a focus on converting local search traffic into qualified home consultation bookings.*