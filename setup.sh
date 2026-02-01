#!/bin/bash

# Task Management App - Quick Setup Script
# This script helps automate the setup process

echo "🚀 Task Management App - Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your database credentials."
else
    echo "✅ .env file exists"
fi

echo ""
echo "======================================"
echo "📋 Next Steps:"
echo "======================================"
echo ""
echo "1. Start XAMPP and run MySQL"
echo "2. Create database:"
echo "   - Open phpMyAdmin (http://localhost/phpmyadmin)"
echo "   - Go to SQL tab"
echo "   - Run the SQL from: database/schema.sql"
echo ""
echo "3. Update .env file with your database credentials"
echo ""
echo "4. Start the application:"
echo "   npm start"
echo ""
echo "5. Open browser to: http://localhost:3000"
echo ""
echo "======================================"
echo "✅ Setup script completed!"
echo "======================================"
