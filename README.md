# MJ-Backend-Template

A clean and professional backend starter template built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **Cloudinary**. Designed to help you quickly scaffold REST APIs with proper architecture, built-in utilities, and a focus on clean error handling and developer experience.

---

## Features

-  Modular and scalable project structure
-  JWT-based user authentication with login/register
-  File uploads via Cloudinary
-  MongoDB setup using Mongoose
-  Built-in utilities:
  - `asyncHandler` for error-safe async functions
  - `ApiError` class for custom error throwing
  - `ApiResponse` for consistent API formatting
-  Ready for development and easy to extend

---

## Tech Stack

- **Node.js + Express** – API framework
- **MongoDB + Mongoose** – NoSQL database & ODM
- **Cloudinary** – Cloud-based file/image storage
- **JWT + Bcrypt** – Secure authentication
- **dotenv** – Environment variable configuration
- **Custom error + response utils**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MrityunjayRoy/MJ-Backend-Template.git
cd MJ-Backend-Template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Edit the file and provide your own:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

---

## 🔐 Auth Routes

Basic auth API ready out of the box:

- `POST /users/register` – Create a new user
- `POST /users/login` – Login and receive a token

Protected routes can use the included JWT auth middleware.

---

## ☁️ File Upload Support

Supports uploading images or files to Cloudinary using:
- `multer`
- `cloudinary` Node SDK

---

## 🧪 Available Scripts

```bash
npm run dev     # Start in dev mode with nodemon
npm start       # Start in production mode
```

---

## ✨ Ideal Use Cases

- Full-stack MERN applications
- REST API starter projects
- Personal learning or bootcamp projects
- Internal tools or admin panels

---

## 📄 License

This project is open-source under the MIT license.

---

## 🧑‍💻 Author

Made with ❤️ by Mrityunjay (https://github.com/MrityunjayRoy)