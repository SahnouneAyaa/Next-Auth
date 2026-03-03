# Next.js Authentication System
A secure authentication system built with Next.js, TypeScript, NextAuth.js, MongoDB and Mongoose.
This project implements a complete authentication workflow including email verification, secure sign-in, password reset and session management. It was developed as part of the **خير طبيبك** platform, an Algerian web application that connects patients with doctors.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- NextUI
- NextAuth.js
- MongoDB
- Mongoose
- JWT

## Features
- User registration with validation
- Email verification via activation link
- Secure login with NextAuth
- Password reset via email
- JWT-based session management
- MongoDB integration with Mongoose
- Separate models for **Doctor** and **Patient**

## Project Structure
src/
app/ → authentication routes (signin, signup, reset password)
components/ → UI components
lib/ → utilities (JWT, mail, actions, templates)
models/ → MongoDB models (Doctor, Patient)
api/ → NextAuth configuration


## Run Locally

Install dependencies:
npm install

Run development server:
npm run dev


## Author
Aya Sahnoune  
Full-Stack Developer | React • Next.js • Node.js • MongoDB

Aya Sahnoune  
Full-Stack Developer | React • Next.js • Node.js • MongoDB
