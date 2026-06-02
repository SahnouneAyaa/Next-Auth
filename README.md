# 🔐 Next.js Authentication System

A secure and scalable authentication system built with Next.js, TypeScript NextAuth.js and MongoDB.

This project was developed as part of **Kheir Tabibak**, an Algerian healthcare platform designed to connect patients with doctors in a structured and secure way.


## Overview
This system implements a complete authentication workflow including user registration, email verification, secure login, password reset and session management.


## Features

### 🔐 Authentication System
- User registration with validation
- Secure login using NextAuth.js
- Session management (JWT-based)
- Role-based models (Doctor / Patient)

### 📧 Email System
- Email verification with activation link
- Password reset via secure token
- HTML email templates using Handlebars

### 🔁 Password Management
- Forgot password flow
- Reset password with JWT validation
- Secure token-based flow

### 👤 User Management
- Separate models for Doctor and Patient
- Profile page support
- Structured user data handling


## Tech Stack
- Next.js
- TypeScript
- NextAuth.js
- Tailwind CSS
- MongoDB
- Mongoose
- JWT
- Nodemailer
- Zod / React Hook Form


## Installation

```bash
npm install

Run development server:
npm run dev

Build:
npm run build

Start:
npm start
Script
