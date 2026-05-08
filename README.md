# ShopVerse Frontend Documentation

## Project Overview

ShopVerse frontend is a React + Vite e-commerce client application built for portfolio use as a MERN Stack project.

The frontend currently includes:

- Landing page
- Authentication pages
- User dashboard
- Admin dashboard
- Product listing
- Product details page
- Cart system
- Search and category filter
- Protected routes
- Context-based state management

---

## Tech Stack

- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React
- Context API
- LocalStorage

---

## Folder Structure

```txt
client/
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ProductContext.jsx
│   │   └── CartContext.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Cart.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

## Installed Packages

```bash
npm install react-router-dom axios react-hot-toast lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

---

## Main Features Completed

### 1. Routing

Routes are managed in `src/App.jsx`.

Current routes:

```txt
/                  Home
/login             Login page
/register          Register page
/dashboard         User dashboard protected route
/admin             Admin dashboard protected route
/products          Products page with search/filter
/products/:id      Single product details page
/cart              Shopping cart page
```

---

### 2. Authentication

Authentication is handled by:

```txt
src/context/AuthContext.jsx
```

Features:

- Register user
- Login user
- Store token in localStorage
- Store user data in localStorage
- Logout
- Role-based navigation

LocalStorage keys:

```txt
shopverse_token
shopverse_user
```

---

### 3. Product State

Product data is handled by:

```txt
src/context/ProductContext.jsx
```

Features:

- Fetch all products from backend
- Store products in state
- Loading state
- Refresh products after admin create/delete

API endpoint used:

```txt
GET /api/products
```

---

### 4. Cart System

Cart is handled by:

```txt
src/context/CartContext.jsx
```

Features:

- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity
- Calculate total price
- Persist cart in localStorage

LocalStorage key:

```txt
shopverse_cart
```

---

### 5. Navbar

Navbar file:

```txt
src/components/Navbar.jsx
```

Current behavior:

- Logo goes to home
- Products button goes to `/products`
- Search icon goes to `/products`
- Cart icon goes to `/cart`
- If logged in, user name is shown
- If admin, user name links to `/admin`
- If normal user, user name links to `/dashboard`
- Logout button clears auth state

---

### 6. Home Page

Home page file:

```txt
src/pages/Home.jsx
```

Contains:

- Hero section
- Feature section
- Featured products section
- Dynamic products from backend
- Add to cart button
- Product image/title links to product details page

---

### 7. Products Page

Products page file:

```txt
src/pages/Products.jsx
```

Contains:

- Product search
- Category filter
- Product grid
- Add to cart
- Product details link

---

### 8. Admin Dashboard

Admin dashboard file:

```txt
src/pages/AdminDashboard.jsx
```

Features:

- Product count
- Add product form
- Product list
- Delete product
- Uses admin-only backend endpoints

Important:

Admin user must have role:

```json
"role": "admin"
```

---

## API Service

API file:

```txt
src/services/api.js
```

Uses Axios.

Base URL:

```txt
http://localhost:5000/api
```

Automatically attaches token:

```txt
Authorization: Bearer <token>
```

---

## Run Frontend

```bash
cd D:\shopverse\client
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## Current Known Notes

- Search icon now redirects to `/products`.
- Products page search input works on product name.
- Category filter works from existing product categories.
- Cart count updates in Navbar.
- Cart persists after page refresh.
- Admin product add/delete is working.
- Product details page works using `/products/:id`.

---

## Next Planned Work

The next recommended phase is:

# Checkout + Order System

Frontend tasks:

- Checkout page
- Shipping address form
- Payment method selection
- Place order button
- My Orders page
- Admin order management UI
- Order status UI

Suggested future routes:

```txt
/checkout
/orders
/admin/orders
```

---

## Portfolio Value

This frontend demonstrates:

- React routing
- Protected routes
- Auth state management
- API integration
- CRUD dashboard UI
- Cart logic
- Search and filtering
- Responsive ecommerce UI
