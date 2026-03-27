# 

# \# 🐾 StreetPet - Pet Adoption Platform

# 

# A full-stack pet adoption platform that connects loving homes with pets in need. Built with Node.js, Express, PostgreSQL, React, and Tailwind CSS.

# 

# !\[StreetPet Banner](https://via.placeholder.com/1200x400/4ECDC4/FFFFFF?text=StreetPet+-+Adopt+a+Friend+Today)

# 

# \---

# 

# \## 📋 Table of Contents

# 

# \- \[Overview](#overview)

# \- \[Features](#features)

# \- \[Tech Stack](#tech-stack)

# \- \[Project Structure](#project-structure)

# \- \[Prerequisites](#prerequisites)

# \- \[Installation](#installation)

# \- \[Configuration](#configuration)

# \- \[Database Setup](#database-setup)

# \- \[Running the Application](#running-the-application)

# \- \[API Documentation](#api-documentation)

# \- \[User Roles](#user-roles)

# \- \[Creating an Admin](#creating-an-admin)

# \- \[Troubleshooting](#troubleshooting)

# \- \[Deployment](#deployment)

# \- \[Contributing](#contributing)

# \- \[License](#license)

# 

# \---

# 

# \## 🌟 Overview

# 

# StreetPet is a comprehensive pet adoption platform designed to help shelters and rescue organizations manage pet listings and streamline the adoption process. The platform provides separate interfaces for regular users and administrators, ensuring a smooth experience for both adopters and shelter staff.

# 

# \*\*Live Demo:\*\* \[https://streetpet-demo.example.com](https://streetpet-demo.example.com)

# 

# \---

# 

# \## ✨ Features

# 

# \### 👥 User Features

# \- \*\*User Registration \& Login\*\* - Secure account creation with password hashing

# \- \*\*Browse Pets\*\* - View all available pets with filters (species, age, size, location)

# \- \*\*Pet Details\*\* - Detailed information about each pet including photos, description, and health status

# \- \*\*Adoption Application\*\* - Submit adoption requests with personalized messages

# \- \*\*User Profile\*\* - Manage personal information and view adoption history

# \- \*\*Adoption Status Tracking\*\* - Track the progress of adoption applications

# 

# \### 👑 Admin Features

# \- \*\*Admin Dashboard\*\* - Overview of platform statistics

# \- \*\*Pet Management\*\* - Add, edit, delete, and manage pet listings

# \- \*\*Adoption Management\*\* - Approve, reject, or process adoption requests

# \- \*\*User Management\*\* - View and manage user accounts

# \- \*\*Role Management\*\* - Grant or revoke admin privileges

# 

# \### 🔒 Security Features

# \- Password hashing with bcrypt

# \- Session-based authentication

# \- Protected API routes

# \- CSRF protection

# \- Input validation and sanitization

# 

# \### 🎨 UI/UX Features

# \- Responsive design (mobile, tablet, desktop)

# \- Modern, clean interface with Tailwind CSS

# \- Real-time form validation

# \- Loading states and error handling

# \- Accessible components

# 

# \---

# 

# \## 🛠️ Tech Stack

# 

# \### Backend

# | Technology | Description |

# |------------|-------------|

# | \*\*Node.js\*\* | JavaScript runtime environment |

# | \*\*Express.js\*\* | Web application framework |

# | \*\*PostgreSQL\*\* | Relational database |

# | \*\*Drizzle ORM\*\* | TypeScript ORM for database operations |

# | \*\*Passport.js\*\* | Authentication middleware |

# | \*\*bcrypt\*\* | Password hashing library |

# | \*\*express-session\*\* | Session management |

# 

# \### Frontend

# | Technology | Description |

# |------------|-------------|

# | \*\*React\*\* | UI library |

# | \*\*Vite\*\* | Build tool and development server |

# | \*\*TypeScript\*\* | Type-safe JavaScript |

# | \*\*Tailwind CSS\*\* | Utility-first CSS framework |

# | \*\*TanStack Query\*\* | Data fetching and caching |

# | \*\*Wouter\*\* | Lightweight routing |

# | \*\*Lucide React\*\* | Icon library |

# 

# \### Development Tools

# | Tool | Description |

# |------|-------------|

# | \*\*Drizzle Kit\*\* | Database schema management |

# | \*\*tsx\*\* | TypeScript execution for Node.js |

# | \*\*ESLint\*\* | Code linting |

# | \*\*Prettier\*\* | Code formatting |

# 

# \---

# 

# \## 📁 Project Structure

# streetpet/

# │

# ├── client/ # Frontend application

# │ ├── src/

# │ │ ├── components/ # Reusable React components

# │ │ │ ├── Layout.tsx # Main layout wrapper

# │ │ │ ├── Navbar.tsx # Navigation bar

# │ │ │ ├── PetCard.tsx # Pet listing card

# │ │ │ ├── PetFilters.tsx # Filter sidebar

# │ │ │ ├── AdoptionForm.tsx # Adoption application form

# │ │ │ └── ProtectedRoute.tsx # Route protection wrapper

# │ │ │

# │ │ ├── pages/ # Page components

# │ │ │ ├── Home.tsx # Landing page with pet listings

# │ │ │ ├── Login.tsx # User login page

# │ │ │ ├── Register.tsx # User registration page

# │ │ │ ├── Profile.tsx # User profile and adoption history

# │ │ │ ├── PetDetails.tsx # Individual pet view

# │ │ │ └── Admin/ # Admin section

# │ │ │ ├── Dashboard.tsx # Admin dashboard

# │ │ │ ├── ManagePets.tsx # Pet management

# │ │ │ ├── ManageAdoptions.tsx # Adoption management

# │ │ │ └── ManageUsers.tsx # User management

# │ │ │

# │ │ ├── hooks/ # Custom React hooks

# │ │ │ ├── useAuth.ts # Authentication hook

# │ │ │ ├── usePets.ts # Pets data hook

# │ │ │ └── useAdoptions.ts # Adoptions data hook

# │ │ │

# │ │ ├── lib/ # Utilities and configurations

# │ │ │ ├── api.ts # API client configuration

# │ │ │ ├── constants.ts # Application constants

# │ │ │ └── utils.ts # Helper functions

# │ │ │

# │ │ ├── types/ # TypeScript type definitions

# │ │ │ └── index.ts # Shared types

# │ │ │

# │ │ ├── App.tsx # Main application component

# │ │ ├── main.tsx # Application entry point

# │ │ └── index.css # Global styles (Tailwind)

# │ │

# │ └── index.html # HTML template

# │

# ├── server/ # Backend application

# │ ├── auth.ts # Authentication configuration

# │ ├── db.ts # Database connection setup

# │ ├── index.ts # Server entry point

# │ ├── routes.ts # API route registration

# │ ├── storage.ts # Database operations interface

# │ └── vite.ts # Vite integration

# │

# ├── shared/ # Shared code between frontend and backend

# │ ├── schema.ts # Database schema definition

# │ └── routes.ts # API route definitions

# │

# ├── drizzle.config.ts # Drizzle ORM configuration

# ├── tailwind.config.js # Tailwind CSS configuration

# ├── tsconfig.json # TypeScript configuration

# ├── vite.config.ts # Vite configuration

# ├── package.json # Dependencies and scripts

# ├── .env.example # Environment variables example

# ├── .gitignore # Git ignore rules

# └── README.md # Project documentation

# 

# text

# 

# \---

# 

# \## 📦 Prerequisites

# 

# Before you begin, ensure you have the following installed:

# 

# \- \*\*Node.js\*\* (version 18 or higher)

# &#x20; ```bash

# &#x20; node --version  # Should output v18.0.0 or higher

# npm (comes with Node.js)

# 

# bash

# npm --version   # Should output 9.0.0 or higher

# PostgreSQL (version 14 or higher)

# 

# bash

# psql --version  # Should output psql (PostgreSQL) 14.0 or higher

# Git (for version control)

# 

# bash

# git --version   # Should output 2.30.0 or higher

# 🚀 Installation

# Step 1: Clone the repository

# bash

# git clone https://github.com/YOUR\_USERNAME/streetpet.git

# cd streetpet

# Step 2: Install dependencies

# bash

# npm install

# This will install all required dependencies for both the backend and frontend.

# 

# Step 3: Create the database

# Open pgAdmin or use the command line to create a new database:

# 

# Using pgAdmin:

# 

# Open pgAdmin

# 

# Right-click on "Databases" → "Create" → "Database"

# 

# Name it streetpet\_db

# 

# Click "Save"

# 

# Using command line:

# 

# sql

# CREATE DATABASE streetpet\_db;

# Step 4: Configure environment variables

# Copy the example environment file:

# 

# bash

# cp .env.example .env

# Open the .env file and update it with your configuration:

# 

# env

# \# Database Configuration

# DATABASE\_URL=postgresql://postgres:YOUR\_PASSWORD@localhost:5432/streetpet\_db

# 

# \# Server Configuration

# PORT=3000

# 

# \# Environment

# NODE\_ENV=development

# 

# \# Session Secret (for production, use a strong random string)

# SESSION\_SECRET=your-session-secret-key

# ⚠️ Important: Never commit the .env file to version control. It's already in .gitignore.

# 

# Step 5: Initialize the database schema

# bash

# npm run db:push

# This command will:

# 

# Connect to your PostgreSQL database

# 

# Create all necessary tables based on the schema

# 

# Set up relationships and indexes

# 

# 🗄️ Database Setup

# Database Schema

# The application uses the following main tables:

# 

# users - User accounts

# Column	Type	Description

# id	integer	Primary key, auto-increment

# username	text	Unique username

# password	text	Hashed password

# is\_admin	boolean	Admin privileges flag

# email	text	User email address

# bio	text	User biography

# avatar\_url	text	Profile picture URL

# pets - Pet listings

# Column	Type	Description

# id	integer	Primary key, auto-increment

# name	text	Pet name

# species	text	Dog, Cat, etc.

# breed	text	Breed information

# age	integer	Age in months/years

# size	text	Small, Medium, Large

# description	text	Detailed description

# image\_url	text	Photo URL

# status	text	Available, Pending, Adopted

# adoptions - Adoption applications

# Column	Type	Description

# id	integer	Primary key, auto-increment

# user\_id	integer	Foreign key to users

# pet\_id	integer	Foreign key to pets

# status	text	Pending, Approved, Rejected

# message	text	Adoption application message

# created\_at	timestamp	Application date

# ▶️ Running the Application

# Development Mode

# Start the development server with hot reload:

# 

# bash

# npm run dev

# This will start both the backend and frontend servers:

# 

# Frontend: http://localhost:3000

# 

# API: http://localhost:3000/api

