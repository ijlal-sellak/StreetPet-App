<p align="center">
  <img src="https://img.icons8.com/color/96/000000/dog.png" width="80">
</p>

<h1 align="center">🐾 StreetPet - Pet Adoption Platform</h1>

<p align="center">
  <strong>Connecting loving homes with pets in need</strong><br>
  <span>A full-stack pet adoption platform built with Node.js, PostgreSQL, React, and Tailwind CSS</span>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/ijlal-sellak/StreetPet-App?style=for-the-badge&color=4ECDC4">
  <img src="https://img.shields.io/github/forks/ijlal-sellak/StreetPet-App?style=for-the-badge&color=4ECDC4">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/node.js-18+-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/PostgreSQL-14+-blue?style=for-the-badge&logo=postgresql">
</p>

---

##  Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [🗄️ Database Setup](#️-database-setup)
- [▶️ Running the Application](#️-running-the-application)
- [🔌 API Documentation](#-api-documentation)
- [👥 User Roles](#-user-roles)
- [👑 Creating an Admin](#-creating-an-admin)
- [🐛 Troubleshooting](#-troubleshooting)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

<p>
  <strong>StreetPet</strong> is a comprehensive pet adoption platform designed to help shelters and rescue organizations manage pet listings and streamline the adoption process. The platform provides separate interfaces for regular users and administrators, ensuring a smooth experience for both adopters and shelter staff.
</p>

<table>
  <tr>
    <td width="50%">
      <h3>🐶 For Adopters</h3>
      <ul>
        <li>Browse and search available pets</li>
        <li>Submit adoption applications</li>
        <li>Track application status</li>
        <li>Manage personal profile</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🏢 For Shelters</h3>
      <ul>
        <li>Manage pet listings</li>
        <li>Process adoption requests</li>
        <li>View analytics dashboard</li>
        <li>Manage user accounts</li>
      </ul>
    </td>
  </tr>
</table>

**Live Demo:** [https://streetpet-demo.example.com](https://streetpet-demo.example.com) *(Coming soon)*

---

## ✨ Features

### 👥 User Features
| Feature | Description |
|---------|-------------|
| **User Registration & Login** | Secure account creation with password hashing |
| **Browse Pets** | View all available pets with filters (species, age, size, location) |
| **Pet Details** | Detailed information including photos, description, and health status |
| **Adoption Application** | Submit adoption requests with personalized messages |
| **User Profile** | Manage personal information and view adoption history |
| **Adoption Status Tracking** | Track the progress of adoption applications |

### 👑 Admin Features
| Feature | Description |
|---------|-------------|
| **Admin Dashboard** | Overview of platform statistics |
| **Pet Management** | Add, edit, delete, and manage pet listings |
| **Adoption Management** | Approve, reject, or process adoption requests |
| **User Management** | View and manage user accounts |
| **Role Management** | Grant or revoke admin privileges |

### 🔒 Security Features
- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Protected API routes
- ✅ CSRF protection
- ✅ Input validation and sanitization

### 🎨 UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern, clean interface with Tailwind CSS
- ✅ Real-time form validation
- ✅ Loading states and error handling
- ✅ Accessible components

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th width="33%">Backend</th>
    <th width="33%">Frontend</th>
    <th width="34%">Development Tools</th>
  </tr>
  <tr>
    <td>
      • Node.js<br>
      • Express.js<br>
      • PostgreSQL<br>
      • Drizzle ORM<br>
      • Passport.js<br>
      • bcrypt<br>
      • express-session
    </td>
    <td>
      • React 18<br>
      • TypeScript<br>
      • Vite<br>
      • Tailwind CSS<br>
      • TanStack Query<br>
      • Wouter<br>
      • Lucide React
    </td>
    <td>
      • Drizzle Kit<br>
      • tsx<br>
      • ESLint<br>
      • Prettier<br>
      • Git<br>
      • GitHub Actions
    </td>
  </tr>
</table>

---

## 📁 Project Structure
streetpet/
│
├── client/ # Frontend application
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # Page components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── lib/ # Utilities and configurations
│ │ ├── types/ # TypeScript type definitions
│ │ ├── App.tsx # Main application component
│ │ ├── main.tsx # Application entry point
│ │ └── index.css # Global styles
│ └── index.html # HTML template
│
├── server/ # Backend application
│ ├── auth.ts # Authentication configuration
│ ├── db.ts # Database connection setup
│ ├── index.ts # Server entry point
│ ├── routes.ts # API route registration
│ ├── storage.ts # Database operations interface
│ └── vite.ts # Vite integration
│
├── shared/ # Shared code
│ ├── schema.ts # Database schema definition
│ └── routes.ts # API route definitions
│
├── drizzle.config.ts # Drizzle ORM configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
├── package.json # Dependencies and scripts
├── .env.example # Environment variables example
└── README.md # Project documentation

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

<div align="center">

| Requirement | Version | Verification Command |
|-------------|---------|---------------------|
| **Node.js** | 18+ | `node --version` |
| **npm** | 9+ | `npm --version` |
| **PostgreSQL** | 14+ | `psql --version` |
| **Git** | 2.30+ | `git --version` |

</div>

---

## 🚀 Installation

### Step 1: Clone the repository


git clone https://github.com/YOUR_USERNAME/streetpet.git
cd streetpet

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:



| Requirement | Version | Verification Command |
|-------------|---------|---------------------|
| **Node.js** | 18+ | `node --version` |
| **npm** | 9+ | `npm --version` |
| **PostgreSQL** | 14+ | `psql --version` |
| **Git** | 2.30+ | `git --version` |



---

## 🚀 Installation

### Step 1: Clone the repository


git clone https://github.com/YOUR_USERNAME/StreetPet-App.git
cd streetpet

### Step 2: Install dependencies

npm install

###Step 3: Create the database

CREATE DATABASE streetpet_db;

### Step 4: Configure environment variables

cp .env.example .env

Open the .env file and update it with your configuration:

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/streetpet_db

# Server Configuration
PORT=3000

# Environment
NODE_ENV=development

# Session Secret (for production, use a strong random string)
SESSION_SECRET=your-session-secret-key

### Step 5: Initialize the database schema


npm run db:push

### Running the Application



npm run dev

### Service	URL

Frontend	http://localhost:3000
API	http://localhost:3000/api
