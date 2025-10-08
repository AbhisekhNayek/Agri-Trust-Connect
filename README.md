# 🌾 AgriTrust Connect

<div align="center">

![AgriTrust Connect Logo](https://img.shields.io/badge/AgriTrust-Connect-green?style=for-the-badge&logo=leaf)

**Building Trust in Agriculture Through Blockchain Technology**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🚀 Demo](#-demo) • [📖 Documentation](#-documentation) • [🎯 Features](#-features) • [🛠️ Installation](#-installation)

</div>

---

## 🎯 Overview

AgriTrust Connect is a revolutionary agricultural supply chain platform that connects farmers, buyers, suppliers, and logistics providers through transparent blockchain-powered transactions. Built with modern web technologies, it ensures complete traceability from farm to table.

### ✨ Key Highlights

- 🔐 **Blockchain Security** - Immutable records for data integrity
- 🌍 **Real-time Tracking** - Monitor products throughout the supply chain
- 👥 **Multi-Stakeholder** - Seamless connection between all parties
- 📊 **Advanced Analytics** - Data-driven insights for better decisions
- 🎨 **Modern UI/UX** - Beautiful, responsive interface with dark mode

---

## 🎯 Features

### 🌟 For Farmers
- 📋 **Claim Management** - File and track insurance claims with AI assistance
- 🌦️ **Weather Forecasts** - Real-time weather updates and alerts
- 📸 **Photo Evidence** - Upload and verify damage with GPS
- 📈 **Analytics Dashboard** - Track farm performance metrics
- 🚜 **Equipment Tracking** - Manage farm equipment and maintenance

### 🛒 For Buyers
- ✅ **Product Verification** - Complete traceability and authenticity
- 🔍 **Quality Assurance** - Verified product information
- 📦 **Order Tracking** - Real-time delivery updates
- ⭐ **Rating System** - Review and rate transactions

### 🚚 For Logistics
- 🗺️ **Route Optimization** - Efficient delivery planning
- 📍 **GPS Tracking** - Live location tracking
- 📊 **Performance Metrics** - Delivery success rates

### 🏢 For Suppliers
- 📦 **Inventory Management** - Track product availability
- 💰 **Transaction History** - Complete financial records
- 🤝 **Network Growth** - Connect with more stakeholders

---

## 🛠️ Tech Stack

### Frontend
- ⚡ **Next.js 14** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Smooth animations
- 🧩 **shadcn/ui** - Beautiful UI components
- 📘 **TypeScript** - Type-safe development

### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🍃 **MongoDB** - NoSQL database
- 🔗 **Mongoose** - MongoDB ODM
- 🔐 **JWT** - Authentication tokens
- 🔒 **bcryptjs** - Password hashing

### DevOps
- 📦 **npm** - Package manager
- 🐙 **Git** - Version control
- 🚀 **Vercel** - Deployment (recommended)

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- 📗 **Node.js** 18.0 or higher
- 📘 **npm** or **yarn**
- 🍃 **MongoDB** (local or Atlas)
- 🔧 **Git**

### 🚀 Quick Start

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/agritrust-connect.git
cd agritrust-connect
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/agritrust_connect

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4️⃣ **Start the development server**
```bash
npm run dev
```

5️⃣ **Open your browser**
```
http://localhost:3000
```

---

## 🗂️ Project Structure

```
agritrust-connect/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 (auth)/              # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   ├── 📂 (marketing)/         # Marketing pages
│   │   │   ├── page.tsx           # Home
│   │   │   ├── about/
│   │   │   ├── pricing/
│   │   │   └── contact/
│   │   ├── 📂 api/                 # API routes
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   └── products/
│   │   └── 📂 dashboard/           # Dashboard pages
│   ├── 📂 components/
│   │   ├── ui/                     # UI components
│   │   ├── layout/                 # Layout components
│   │   └── forms/                  # Form components
│   ├── 📂 lib/
│   │   ├── db/                     # Database connections
│   │   ├── auth/                   # Auth utilities
│   │   └── validations/            # Validation schemas
│   ├── 📂 models/                  # MongoDB models
│   ├── 📂 middleware/              # Middleware functions
│   └── 📂 types/                   # TypeScript types
├── 📄 .env.example
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## 🔐 Authentication

AgriTrust Connect uses **JWT-based authentication** with the following features:

- 🔑 **Access Tokens** - Short-lived (15 minutes)
- 🔄 **Refresh Tokens** - Long-lived (7 days)
- 🍪 **HTTP-only Cookies** - Secure token storage
- 🛡️ **Role-based Access** - Farmer, Buyer, Supplier, Logistics, Admin
- 🔒 **Password Hashing** - bcrypt with 12 salt rounds

### User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| 🌾 **Farmer** | Primary producers | Own products, claims |
| 🛒 **Buyer** | Purchase products | Order history, tracking |
| 📦 **Supplier** | Provide inputs | Inventory, transactions |
| 🚚 **Logistics** | Deliver products | Routes, deliveries |
| 👑 **Admin** | System administrator | Full access |

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user
```json
{
  "fullName": "John Farmer",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+1234567890",
  "role": "farmer"
}
```

#### POST `/api/auth/login`
Authenticate user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### POST `/api/auth/logout`
Logout user (clears tokens)

#### POST `/api/auth/refresh-token`
Get new access token

### User Endpoints

#### GET `/api/user/profile` 🔒
Get current user profile (protected)

#### PUT `/api/user/profile` 🔒
Update user profile (protected)

---

## 🎨 UI Components

AgriTrust Connect uses **shadcn/ui** components with custom styling:

- 🎴 **Cards** - Information containers
- 🔘 **Buttons** - Interactive elements
- 📝 **Forms** - Input fields and validation
- 📊 **Charts** - Data visualization
- 🎭 **Modals** - Popup dialogs
- 🎯 **Badges** - Status indicators

---

## 🧪 Testing

Run tests with:
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🚀 Deployment

### Vercel (Recommended)

1️⃣ **Push to GitHub**
```bash
git push origin main
```

2️⃣ **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables
- Deploy!

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

### Code Style
- ✅ Use TypeScript
- ✅ Follow ESLint rules
- ✅ Write meaningful commit messages
- ✅ Add comments for complex logic
- ✅ Update documentation

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- 📝 Clear description
- 🔄 Steps to reproduce
- 💻 Expected vs actual behavior
- 🖼️ Screenshots (if applicable)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ by the AgriTrust Team

- 🧑‍💻 **Lead Developer** - [@yourusername](https://github.com/yourusername)
- 🎨 **UI/UX Designer** - [@yourusername](https://github.com/yourusername)
- 📊 **Data Analyst** - [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

Special thanks to:
- 🌾 Farmers who inspired this project
- 🛠️ Open source community
- 📚 Next.js and MongoDB teams
- 🎨 shadcn for amazing UI components

---

## 📞 Contact

Have questions? Reach out!

- 📧 **Email**: support@agritrust.com
- 🐦 **Twitter**: [@AgriTrustConnect](https://twitter.com/agritrust)
- 💬 **Discord**: [Join our community](https://discord.gg/agritrust)
- 🌐 **Website**: [agritrustdemo.com](https://agritrust.com)

---


<div align="center">

**⭐ Star us on GitHub — it motivates us a lot!**

Made with 💚 for farmers worldwide

[⬆ Back to Top](#-agritrust-connect)

</div>