SkillNest - EdTech Learning Platform

A comprehensive online learning platform that connects students with quality educational content and instructors.
Live Demo
Backend API: https://skill-nest-backend.vercel.app
Frontend: Add your frontend URL here
Features
For Students:

User registration and profile management
Browse and enroll in courses
Secure payment processing
File upload for assignments
Contact support system

For Instructors:

Create and manage courses
Student enrollment tracking
Revenue management
Course analytics

For Administrators:

Complete platform management
User role management
Payment oversight
Platform analytics

Tech Stack
Backend:

Node.js
Express.js
Database (MongoDB/PostgreSQL/MySQL)
Cloudinary (File Storage)
JWT Authentication
Payment Gateway Integration

Deployment:

Vercel
CORS enabled
File upload support

Installation
Prerequisites:

Node.js (v18 or higher)
npm or yarn
Database setup
Cloudinary account

Setup Steps:

Clone the repository

git clone https://github.com/yourusername/skillnest-backend.git
cd skillnest-backend

Install dependencies

npm install

Create .env file and add your configuration
Start the server

npm start

API will be available at http://localhost:4000

Environment Variables
Create a .env file with the following:
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL=your_database_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentication
JWT_SECRET=your_jwt_secret

# Payment
PAYMENT_SECRET_KEY=your_payment_secret_key
API Endpoints
Authentication:

POST /api/v1/auth/register - User registration
POST /api/v1/auth/login - User login
POST /api/v1/auth/logout - User logout

User Management:

GET /api/v1/user/profile - Get user profile
PUT /api/v1/user/profile - Update profile
DELETE /api/v1/user/profile - Delete account

Course Management:

GET /api/v1/course - Get all courses
GET /api/v1/course/:id - Get specific course
POST /api/v1/course - Create course
PUT /api/v1/course/:id - Update course
DELETE /api/v1/course/:id - Delete course

Payments:

POST /api/v1/payment/create - Create payment
POST /api/v1/payment/verify - Verify payment
GET /api/v1/payment/history - Payment history

Contact:

POST /api/v1/contact - Send message
GET /api/v1/contact - Get messages (admin)

Project Structure
skillnest-backend/
├── routes/
│   ├── User.js
│   ├── Profile.js
│   ├── Course.js
│   ├── Payments.js
│   └── ContactUs.js
├── config/
│   ├── database.js
│   └── cloudinary.js
├── middleware/
├── models/
├── controllers/
├── server.js
└── package.json
Deployment
The application is deployed on Vercel. To deploy your own:

Connect your GitHub repository to Vercel
Set environment variables in Vercel dashboard
Deploy automatically on git push

Contributing

Fork the repository
Create feature branch
Commit changes
Push to branch
Open Pull Request

License
This project is licensed under the MIT License.
Contact
For support or questions, contact: your-email@example.com

Made with ❤️ for education
