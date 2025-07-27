#!/bin/bash

# Creditly Global Deployment Script
# Deploy to Vercel with custom domain

echo "🚀 Starting Creditly Global deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod --config vercel-deploy.json

# Check deployment status
if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
    echo "🌍 Your app is now live at: https://creditlyglobal.com"
    echo "📱 You can also access it at: https://www.creditlyglobal.com"
else
    echo "❌ Deployment failed!"
    exit 1
fi

echo "🎉 Creditly Global is now live!"
echo "🔗 Main URL: https://creditlyglobal.com"
echo "🔗 WWW URL: https://www.creditlyglobal.com" 