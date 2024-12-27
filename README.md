# ShopSphere

ShopSphere is a modern, responsive, and feature-rich e-commerce platform that enables users to browse, add to cart, and purchase products seamlessly. Built using a robust technology stack, ShopSphere ensures a user-friendly interface, secure transactions, and efficient backend operations to cater to the needs of both customers and administrators.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Screenshots](#screenshots)

---

## Overview

ShopSphere provides an intuitive shopping experience for users with features like product browsing, secure authentication, and a streamlined checkout process. The platform is designed to handle dynamic product catalogs, ensuring that both customers and administrators have an optimal experience. Whether you are a casual shopper or an admin managing inventory, ShopSphere offers a comprehensive solution for e-commerce needs.

---

## Key Features

### For Customers:
- **Product Browsing:** Explore a wide range of products with detailed descriptions, pricing, and images.
- **Search & Filter:** Find products quickly using category-based filters and search functionality.
- **Shopping Cart:** Add products to the cart, modify quantities, and view the real-time total cost.
- **User Authentication:** Create accounts and securely log in to manage orders and personalize experiences.
- **Order History:** View and track past purchases.

### For Admins:
- **Inventory Management:** Add, update, or remove product listings easily.
- **User Management:** Monitor and manage user accounts and activities.

### General Features:
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
- **Secure Transactions:** JWT-based authentication ensures secure and personalized user sessions.
- **Dynamic Updates:** Real-time cart and inventory updates for a smooth user experience.
- **Payment Gateway Integration:** Add support for payment gateways like Stripe or PayPal for seamless transactions.
- **Product Reviews & Ratings:** Allow customers to leave feedback on purchased items.
- **Admin Dashboard:** Build a comprehensive dashboard for analytics and reporting.

---

## Tech Stack

### Frontend:
- **React.js:** For building dynamic and responsive UI components.
- **Tailwind CSS:** For styling and ensuring responsiveness.
- **Redux:** For global state management.

### Backend:
- **Node.js** and **Express.js:** For building a scalable and efficient server-side framework.

### Database:
- **MongoDB:** A NoSQL database for managing product and user data.
- **Mongoose:** For defining schemas and interacting with the database.

### Authentication & Security:
- **JWT (JSON Web Tokens):** For secure and scalable user authentication.
- **bcrypt:** For encrypting user passwords.

### Deployment & Tooling:
- **npm:** For dependency management.
- **GitHub:** For version control and collaboration.

---

## Installation & Setup

### Prerequisites:
- Node.js and npm installed on your system.
- MongoDB setup and running locally or on a cloud-based service.

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hardikjoshi746/shopping-website.git
   cd shopping-website

2. **Install Dependencies:**
    ```bash
   npm install

3. **Set Up Environment Variables:**
   ```bash
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   PORT=5000

4. **Run the Application:**
    ```bash
   npm start

5. **Access the Application:**  
    ```bash
   http://localhost:5000

### **Usage**

1. Customers:
- Sign up or log in to browse products.
- Add desired items to the shopping cart.
- Proceed to checkout and place an order.

2. Admins:
- Log in using admin credentials.
- Add, update, or remove products via the admin dashboard.
- Manage user accounts and view order summaries.

### **Screenshots**

1. Homepage

   <img width="1440" alt="Screenshot 2024-12-27 at 10 55 47 AM" src="https://github.com/user-attachments/assets/9fe12a45-f85a-45a9-bae5-e8e6e3231747" />


2. Product Listing

   <img width="1440" alt="Screenshot 2024-12-27 at 10 58 14 AM" src="https://github.com/user-attachments/assets/9be5764b-5385-47b3-ab0a-859e065430f7" />

3. Shopping Cart

<img width="1440" alt="Screenshot 2024-12-27 at 11 02 41 AM" src="https://github.com/user-attachments/assets/5b5f28fd-5862-4c82-b9a2-a3c15ddaccb4" />

4. Admin Dashboard

<img width="1440" alt="Screenshot 2024-12-27 at 10 57 40 AM" src="https://github.com/user-attachments/assets/36dff3dd-0cb9-494d-86da-2ef1682e7a51" />

5. Chat Support

<img width="1440" alt="Screenshot 2024-12-27 at 10 57 28 AM" src="https://github.com/user-attachments/assets/b97812d4-b006-42a2-91c1-4514fc52e8d4" />

