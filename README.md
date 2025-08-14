🚀 Live Demo

Backend API: https://skill-nest-backend.vercel.app
Frontend: [Add your frontend URL here]

📋 Table of Contents

Features
Tech Stack
Installation
Environment Variables
API Endpoints
Project Structure
Contributing
License

✨ Features
For Students

👤 User registration and profile management
📚 Browse and enroll in courses
💳 Secure payment processing
📁 File upload for assignments and projects
📞 Contact support system

For Instructors

📖 Create and manage courses
👥 Student enrollment tracking
💰 Revenue management through integrated payments
📊 Course analytics and performance metrics

For Administrators

🔧 Complete platform management
👮 User role management
💼 Payment and transaction oversight
📈 Platform-wide analytics

🛠 Tech Stack
Backend

Runtime: Node.js
Framework: Express.js
Database: [Your Database - MongoDB/PostgreSQL/MySQL]
File Storage: Cloudinary
Authentication: [JWT/Passport/Your Auth Method]
Payment: [Stripe/Razorpay/Your Payment Gateway]

DevOps & Deployment

Hosting: Vercel
Environment: dotenv
File Upload: express-fileupload
CORS: cors middleware

🚀 Installation
Prerequisites

Node.js (v18 or higher)
npm or yarn
[Database] (MongoDB/PostgreSQL/MySQL)
Cloudinary account
Payment gateway account

Local Setup

Clone the repository
bashgit clone https://github.com/yourusername/skillnest-backend.git
cd skillnest-backend

Install dependencies
bashnpm install

Setup environment variables
bashcp .env.example .env
# Edit .env with your configuration

Start the development server
bashnpm run dev

Access the API
http://localhost:4000


🔧 Environment Variables
Create a .env file in the root directory:
env# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DATABASE_URL=your_database_connection_string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentication
JWT_SECRET=your_jwt_secret

# Payment Gateway
PAYMENT_SECRET_KEY=your_payment_secret_key

# Email Configuration (if applicable)
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
📡 API Endpoints
Authentication Routes
POST /api/v1/auth/register    - User registration
POST /api/v1/auth/login       - User login
POST /api/v1/auth/logout      - User logout
User Management
GET    /api/v1/user/profile   - Get user profile
PUT    /api/v1/user/profile   - Update user profile
DELETE /api/v1/user/profile   - Delete user account
Course Management
GET    /api/v1/course         - Get all courses
GET    /api/v1/course/:id     - Get specific course
POST   /api/v1/course         - Create new course
PUT    /api/v1/course/:id     - Update course
DELETE /api/v1/course/:id     - Delete course
Payment Routes
POST /api/v1/payment/create   - Create payment intent
POST /api/v1/payment/verify   - Verify payment
GET  /api/v1/payment/history  - Get payment history
Contact & Support
POST /api/v1/contact          - Send contact message
GET  /api/v1/contact          - Get contact messages (admin)
