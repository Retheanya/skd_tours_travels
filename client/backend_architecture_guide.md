# Backend Development Blueprint & Generation Prompt (MongoDB Edition)

This guide outlines a comprehensive plan for building the backend for **SKT Tours and Travels** using **Node.js, Express, and MongoDB (via Mongoose)**.

---

## 1. Backend Architecture

We recommend building the backend with the following modern stack:
- **Runtime & Framework**: **Node.js with Express.js** and **TypeScript** (aligns with the existing frontend).
- **Database**: **MongoDB** with **Mongoose ODM**.
- **Authentication**: **JWT (JSON Web Tokens)** + password hashing with `bcrypt` for secure administrative access.
- **Email Delivery**: **Nodemailer** or **Resend** to forward inquiries directly to `skttravels22@gmail.com`.

---

## 2. Database Models & Schema Design (Mongoose)

Here are the proposed Mongoose schemas for the application:

### Admin User Schema (`User.ts`)
```typescript
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

export const User = model("User", userSchema);
```

### Tour Package Schema (`Package.ts`)
```typescript
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  title: { type: String, required: true },
  items: [{ type: String }]
});

const packageSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  subtitle: { type: String },
  categories: [categorySchema]
}, { timestamps: true });

export const Package = model("Package", packageSchema);
```

### Customer Inquiry Schema (`Inquiry.ts`)
```typescript
import { Schema, model } from "mongoose";

const inquirySchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "pending" } // e.g., pending, viewed, resolved
}, { timestamps: true });

export const Inquiry = model("Inquiry", inquirySchema);
```

---

## 3. API Routes Overview

### **Public Endpoints**
- `GET /api/packages` - Fetch all travel packages.
- `GET /api/packages/:slug` - Fetch specific package details (e.g., `kerala`).
- `POST /api/inquiries` - Submit a customer contact/enquiry form.

### **Protected CMS Endpoints (Admin Only)**
- `POST /api/auth/login` - Admin login endpoint.
- `POST /api/packages` - Add a new tour package.
- `PUT /api/packages/:id` - Edit package details.
- `DELETE /api/packages/:id` - Delete a package.
- `GET /api/inquiries` - Fetch list of inquiries for the admin dashboard.
- `PATCH /api/inquiries/:id` - Update inquiry status (e.g., resolved).

---

## 4. Complete Prompt for Total Backend Generation (MongoDB)

Copy and paste the prompt below into an AI assistant to generate the entire backend setup.

```text
Please build a full-featured backend for the SKT Tours and Travels Vite/React application using Node.js, Express, TypeScript, and MongoDB with Mongoose ODM.

The backend must include:
1. Complete Mongoose Database Models (User, Package, Inquiry) based on the following schemas:
   - User: name, email, password, role, createdAt/updatedAt
   - Package: slug, name, description, imageUrl, subtitle, categories: [{ title: string, items: string[] }], createdAt/updatedAt
   - Inquiry: name, mobile, email, destination, message, status, createdAt/updatedAt

2. REST API endpoints supporting:
   - JWT-based authentication for administrative accounts.
   - Public GET requests to fetch all packages and detailed individual packages based on slug.
   - Public POST requests to submit inquiries, which stores the form data in MongoDB and triggers a mock or real email via Nodemailer.
   - Protected endpoints (POST, PUT, DELETE) to allow administrators to manage packages and view/update inquiries.

3. Strict TypeScript configuration, CORS configuration (configured for the Vite frontend domain), security headers using Helmet, and standard Express middleware for JSON parsing.

4. Clear installation and initialization instructions (including MongoDB connection setup, seeding initial data matching existing packages like Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, and Pondicherry).

Write clear, modular code separated into routes, controllers, models, and middlewares.
```

---

## 5. Integrating Backend with the Vite App

Once the backend is built, update the frontend calls (e.g., in `src/pages/Contact.tsx`) to fetch data from the API:

### Example Integration in `Contact.tsx`

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      alert("Thank you for your message! Our travel specialists will get back to you soon.");
      setFormData({ name: "", mobile: "", email: "", destination: "", message: "" });
    } else {
      alert("Error submitting the form. Please try again later.");
    }
  } catch (err) {
    console.error("Submission error:", err);
    alert("Network error. Please try again later.");
  }
};
```
