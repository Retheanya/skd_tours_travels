# SKD Tours & Travels Backend (Node.js, Express, MongoDB)

A modern, robust, and scalable backend API built using Node.js, Express.js, TypeScript, and MongoDB with Mongoose ODM to manage tour packages, customer inquiries, and user authentication.

## 🚀 Key Features

- **Authentication & Authorization**: Secure JWT-based administrative access to CMS routes.
- **Tour Package Management**: Public and protected endpoints to browse and modify travel packages.
- **Inquiry Processing**: Customer inquiries are securely stored in the database with automated console and optional SMTP logs.
- **Database Seeding**: Automatic database initialization with initial admin credentials and default South Indian packages on first run.
- **TypeScript**: Full TypeScript implementation for strong typing and reliability.

---

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js with TypeScript
- **Database ODM**: Mongoose with MongoDB
- **Security**: bcrypt.js for password hashing, jsonwebtoken for JWT access tokens.
- **CORS**: Configured to connect easily to Vite frontends.

---

## 📂 Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts           # MongoDB Connection configuration
│   ├── middleware/
│   │   └── auth.ts         # JWT Authentication middleware
│   ├── models/
│   │   ├── User.ts         # Admin user Schema
│   │   ├── Package.ts      # Tour package Schema
│   │   └── Inquiry.ts      # Enquiry/Inquiry Schema
│   ├── routes/
│   │   ├── auth.ts         # Auth routes (login/register)
│   │   ├── inquiry.ts      # Inquiries management routes
│   │   └── package.ts      # Travel packages routes
│   └── index.ts            # Entry point & seed logic
├── .env                    # Environment configuration
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 🚦 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v16+) and **MongoDB** installed and running on your machine.

### 2. Environment Setup
Configure your environment variables in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/skd_tours_travels
JWT_SECRET=supersecuresecret123!
```

### 3. Installation
Install project dependencies:
```bash
npm install
```

### 4. Running Locally
Run the development server with hot-reloading:
```bash
npm run dev
```

The application runs by default at `http://localhost:5000`.

### 5. Production Build
Compile TypeScript files to JavaScript into the `./dist` folder:
```bash
npm run build
```

Then, run the compiled source:
```bash
npm start
```

---

## 🗄️ Database Seeding

On initial startup, if the database has no records, the server automatically creates:
- **Default Admin Account**:
  - **Email**: `admin@skttravels.com`
  - **Password**: `adminpassword123!`
- **Initial Tour Packages**: Kerala, Tamil Nadu, and Karnataka default packages.

---

## 📌 API Route Map

### Auth Endpoints
- `POST /api/auth/register` - Create a new user (Public/CMS Setup).
- `POST /api/auth/login` - Generate a JWT access token for authentication (Public).

### Package Endpoints
- `GET /api/packages` - Fetch all travel packages (Public).
- `GET /api/packages/:slug` - Fetch detailed package information by its unique slug (Public).
- `POST /api/packages` - Add a new travel package (Protected - Admin only).
- `PUT /api/packages/:id` - Edit/update an existing package (Protected - Admin only).
- `DELETE /api/packages/:id` - Remove a travel package (Protected - Admin only).

### Inquiry/Enquiry Endpoints
- `POST /api/inquiries` - Submit customer contact form details (Public).
- `GET /api/inquiries` - Fetch all submitted inquiries (Protected - Admin only).
- `PATCH /api/inquiries/:id` - Update status (`pending`, `viewed`, `resolved`) of an inquiry (Protected - Admin only).
