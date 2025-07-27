# Creditly Global - Deployment Guide

## 🌐 Domain Configuration

### Primary Domain
- **Main URL**: https://creditlyglobal.com
- **WWW URL**: https://www.creditlyglobal.com
- **API URL**: https://api.creditlyglobal.com

## 🚀 Deployment Steps

### 1. Prerequisites
- Node.js 18+ installed
- Vercel CLI installed: `npm install -g vercel`
- Domain ownership verified

### 2. Automatic Deployment
```bash
# Run the deployment script
./deploy.sh
```

### 3. Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

### 4. Domain Configuration in Vercel
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Domains
4. Add custom domain: `creditlyglobal.com`
5. Add subdomain: `www.creditlyglobal.com`
6. Configure DNS records as instructed

## 🔧 Configuration Files

### vercel.json
```json
{
  "name": "creditly-global",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Environment Variables
```bash
NODE_ENV=production
VITE_APP_URL=https://creditlyglobal.com
VITE_API_URL=https://api.creditlyglobal.com
```

## 📋 DNS Configuration

### Required DNS Records
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔒 Security Headers

The application includes security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📱 Features Deployed

### Landing Page
- Modern glass morphism design
- Italian content for fiscal credits
- Responsive design
- SEO optimized

### Available Credit Types
1. **Superbonus 110%** - €110.000 max
2. **Crediti IVA** - €50.000 max
3. **Crediti PA** - €75.000 max
4. **Crediti Formazione** - €30.000 max
5. **Crediti R&D** - €100.000 max
6. **Crediti Export** - €60.000 max

## 🎯 Performance Optimization

### Build Optimization
- Vite build with tree shaking
- Asset compression
- Code splitting
- Lazy loading

### Caching Strategy
- Static assets: 1 year cache
- HTML: No cache for updates
- API responses: Configurable cache

## 🔍 Monitoring

### Analytics
- Google Analytics integration
- Vercel Analytics
- Performance monitoring

### Error Tracking
- Vercel error tracking
- Console error logging
- User feedback collection

## 🚨 Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version and dependencies
2. **Domain not working**: Verify DNS configuration
3. **SSL issues**: Vercel handles SSL automatically
4. **Performance issues**: Check bundle size and optimize

### Support
- Vercel Support: https://vercel.com/support
- Project Issues: Create GitHub issue
- Emergency: Contact development team

## 📈 Post-Deployment Checklist

- [ ] Domain is accessible
- [ ] SSL certificate is active
- [ ] All pages load correctly
- [ ] Forms are working
- [ ] Analytics are tracking
- [ ] Performance is optimal
- [ ] Mobile responsiveness
- [ ] SEO meta tags
- [ ] Social media previews
- [ ] Error pages configured

## 🎉 Success!

Once deployed, Creditly Global will be live at:
- **Main Site**: https://creditlyglobal.com
- **Landing Page**: Modern, professional design
- **Services**: Fiscal credit management
- **Support**: Italian market focused 