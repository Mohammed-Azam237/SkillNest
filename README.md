
# SkillNest - EdTech Learning Platform

SkillNest is a fully functional EdTech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

## 🚀 Live Demo

**Backend API**: [https://skill-nest-backend.vercel.app] 
**Frontend**: [https://skill-nest-coral.vercel.app/]

## 📖 Introduction

SkillNest aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

## 🏗️ System Architecture

The SkillNest EdTech platform consists of three main components:
- **Frontend**: Built with ReactJS for dynamic and responsive user interfaces
- **Backend**: Built with NodeJS and ExpressJS providing RESTful APIs
- **Database**: MongoDB for flexible and scalable data storage

The platform follows a client-server architecture with the frontend serving as the client and the backend and database serving as the server.

## ✨ Features

### For Students
- **Homepage**: Brief introduction to the platform with links to course list and user details
- **Course List**: Browse all available courses with descriptions and ratings
- **Wishlist**: View courses added to wishlist
- **Cart Checkout**: Complete course purchases securely
- **Course Content**: Access course materials including videos and documents
- **User Profile**: Manage account details and preferences
- **Progress Tracking**: Track learning progress and course completion

### For Instructors
- **Dashboard**: Overview of courses with ratings and feedback
- **Course Analytics**: Detailed insights including views, enrollments, and metrics
- **Course Management**: Create, update, and delete courses
- **Content Management**: Upload and organize course materials
- **Student Management**: View enrolled students and their progress
- **Revenue Tracking**: Monitor earnings and payment analytics

### For Administrators
- **Platform Management**: Overall platform oversight and control
- **User Management**: Manage students and instructor accounts
- **Content Moderation**: Review and approve course content
- **Analytics Dashboard**: Platform-wide statistics and insights

## 🛠️ Tech Stack

### Frontend
- **ReactJS**: For building dynamic user interfaces
- **Redux**: For state management
- **Tailwind CSS**: For responsive styling
- **Axios**: For API communications

### Backend
- **Node.js**: Primary runtime environment
- **Express.js**: Web application framework
- **JWT**: For authentication and authorization
- **Bcrypt**: For password hashing
- **Mongoose**: MongoDB object modeling

### Database & Storage
- **MongoDB**: NoSQL database for data storage
- **Cloudinary**: Cloud-based media management
- **Razorpay**: Payment gateway integration

## 📊 Database Schema

### Student Schema
- Name, Email, Password
- Enrolled courses and progress
- Wishlist and purchase history
- Profile information

### Instructor Schema
- Name, Email, Password
- Created courses and analytics
- Revenue and payout details
- Profile and credentials

### Course Schema
- Course title, description, category
- Instructor details and pricing
- Media content and materials
- Ratings and reviews

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Razorpay account (for payments)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/skill-nest-backend.git
cd skill-nest-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

4. **Start the development server**
```bash
npm run dev
```

The server will be running on `http://localhost:4000`

## 🌐 API Endpoints

### Authentication Routes
```
POST /api/v1/auth/signup          - User registration
POST /api/v1/auth/login           - User login
POST /api/v1/auth/sendotp         - Send OTP for verification
POST /api/v1/auth/changepassword  - Change user password
```

### Profile Routes
```
GET    /api/v1/profile/getUserDetails      - Get user profile
PUT    /api/v1/profile/updateProfile       - Update user profile
DELETE /api/v1/profile/deleteProfile       - Delete user account
PUT    /api/v1/profile/updateDisplayPicture - Update profile picture
```

### Course Routes
```
GET    /api/v1/course/getAllCourses        - Get all courses
GET    /api/v1/course/getCourseDetails     - Get specific course details
POST   /api/v1/course/createCourse         - Create new course
PUT    /api/v1/course/editCourse           - Edit existing course
DELETE /api/v1/course/deleteCourse         - Delete course
```

### Category Routes
```
GET    /api/v1/course/showAllCategories    - Get all categories
POST   /api/v1/course/createCategory       - Create new category
GET    /api/v1/course/categoryPageDetails  - Get category page details
```

### Section & SubSection Routes
```
POST   /api/v1/course/addSection           - Add course section
PUT    /api/v1/course/updateSection        - Update course section
DELETE /api/v1/course/deleteSection        - Delete course section
POST   /api/v1/course/addSubSection        - Add course subsection
PUT    /api/v1/course/updateSubSection     - Update course subsection
DELETE /api/v1/course/deleteSubSection     - Delete course subsection
```

### Payment Routes
```
POST   /api/v1/payment/capturePayment      - Capture payment
POST   /api/v1/payment/verifySignature     - Verify payment signature
```

### Rating & Review Routes
```
POST   /api/v1/course/createRating         - Create course rating
GET    /api/v1/course/getAverageRating     - Get average rating
GET    /api/v1/course/getReviews           - Get all reviews
```

## 📁 Project Structure

```
skillnest-backend/
├── config/
│   ├── database.js              # Database connection
│   └── cloudinary.js            # Cloudinary configuration
├── controllers/
│   ├── Auth.js                  # Authentication logic
│   ├── Course.js                # Course management
│   ├── Payments.js              # Payment processing
│   ├── Profile.js               # User profile management
│   └── RatingAndReview.js       # Reviews and ratings
├── middleware/
│   ├── auth.js                  # Authentication middleware
│   └── multer.js                # File upload middleware
├── models/
│   ├── User.js                  # User schema
│   ├── Course.js                # Course schema
│   ├── Section.js               # Course section schema
│   ├── SubSection.js            # Course subsection schema
│   ├── Category.js              # Category schema
│   ├── RatingAndReview.js       # Review schema
│   └── CourseProgress.js        # Progress tracking schema
├── routes/
│   ├── User.js                  # User routes
│   ├── Course.js                # Course routes
│   ├── Payments.js              # Payment routes
│   └── Profile.js               # Profile routes
├── utils/
│   ├── mailSender.js            # Email utility
│   ├── imageUploader.js         # Image upload utility
│   └── secToDuration.js         # Time conversion utility
├── .env
├── server.js                    # Main server file
└── package.json
```

## 🔐 Authentication & Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **OTP Verification**: Email-based OTP for account verification
- **Role-based Access**: Different permissions for students, instructors, and admins
- **Secure File Upload**: Cloudinary integration for safe media storage

## 💳 Payment Integration

The platform uses Razorpay for secure payment processing:
- Course purchases and enrollments
- Secure payment verification
- Automated enrollment after successful payment
- Payment history and receipts

## 📱 Media Management

StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.

Features include:
- Automatic video optimization
- Image compression and formatting
- Secure media delivery
- CDN integration for fast loading

## 🚀 Deployment

### Deploy to Vercel

1. **Prepare for deployment**
```bash
npm run build
```

2. **Install Vercel CLI**
```bash
npm i -g vercel
```

3. **Deploy**
```bash
vercel --prod
```

4. **Set Environment Variables**
Add all environment variables in Vercel dashboard

## 🧪 API Testing

Use tools like Postman or Thunder Client to test the APIs:

1. **Import the API collection**
2. **Set environment variables**
3. **Test authentication endpoints first**
4. **Use JWT token for protected routes**







## 🙏 Acknowledgments

- Thanks to all contributors and the open-source community
- Inspiration from leading EdTech platforms
- Special thanks to the MERN stack community

---

**Made with ❤️ for accessible education**

> Empowering learners and educators worldwide through technology