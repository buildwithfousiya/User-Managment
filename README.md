# User Management System

A robust, full-stack **User Management System** built with Node.js to practice and understand key backend concepts including authentication, CRUD, session management, and templating with Handlebars.

---

## 🚀 Overview

This project provides a comprehensive user and admin management interface. It's designed to simulate a real-world application where users can manage their accounts and admins can oversee all users in the system.

### Key Goals:
- Master **Node.js** and **Express.js** architecture.
- Implement secure **Authentication** with `bcrypt`.
- Manage persistent user states using **Express-Session**.
- Build dynamic interfaces using **Handlebars (HBS)**.
- Practice the **MVC (Model-View-Controller)** pattern.

---

## ✨ Features

### 👤 User Features:
- **Sign Up**: New users can securely register an account.
- **Sign In**: Secure login with password hashing.
- **Dashboard**: Access to individual user homepages.
- **Session Protection**: Middleware ensures that only logged-in users can access specific routes.
- **Sign Out**: Safely terminate the session.

### 🛡️ Admin Features (Full CRUD):
- **Dashboard**: Overview of all registered users.
- **Create User**: Admin can manually add new users.
- **Edit User**: Modify existing user details.
- **Delete User**: Permanently remove users from the database.
- **Search**: (Optional) Filter through users efficiently.
- **Full Controller Access**: Complete administrative power over user accounts.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime Environment |
| **Express.js** | Backend Web Framework |
| **MongoDB / Mongoose** | Database & Object Modeling |
| **Handlebars (HBS)** | Dynamic View Engine |
| **Express-Session** | Session and Cookie Management |
| **Bcrypt** | Password Hashing & Security |
| **Nocache** | Security against browser-side caching |
| **Dotenv** | Secret Management |

---

## 📂 Project Structure

```text
├── controller/     # Business logic (User & Admin)
├── db/             # Database connection setup
├── middleware/     # Auth and Session protection
├── model/          # Mongoose schemas
├── public/         # Static files (CSS, Images)
├── routes/         # API Endpoint definitions
├── views/          # Handlebars templates
├── server.js       # Entry point
└── .env            # Configuration file
```

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/buildwithfousiya/User-Managment.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```

4. **Run the application:**
   ```bash
   npm start
   ```
   *The server will start on `http://localhost:3000`*

---

## 💡 Learnings
- **Session Management**: Handling login states across different requests.
- **Middleware**: Managing route permissions (e.g., preventing logged-in users from visiting the login page).
- **Security**: Preventing "back-button" issues using `nocache` and securing passwords with `bcrypt`.

---
*Created by [buildwithfousiya](https://github.com/buildwithfousiya) as a learning project for Backend Development.*
