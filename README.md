# GIVHEART — Gift Selection Catalog

Team full-stack web application for browsing and ordering curated gifts. Built as a collaborative learning project with a responsive storefront, JWT authentication, server-synced cart, wishlist, checkout, user account, and admin panel.

---

## Public Access

| | URL |
|---|---|
| **Frontend (Live)** | [gift-selection-catalog.onrender.com](https://gift-selection-catalog.onrender.com) |
| **Backend API** | [gift-selection-catalog-backend.onrender.com/api](https://gift-selection-catalog-backend.onrender.com/api) |
| **Swagger UI** | [gift-selection-catalog-backend.onrender.com/api/swagger-ui.html](https://gift-selection-catalog-backend.onrender.com/api/swagger-ui.html) |

---

## Features Implementation Details

### Storefront & Catalog

- **Landing Page:** Hero section, value proposition cards, shop-by-occasion categories (For Her / Him / Couples / Kids), dynamic “Top picks” from API, About section, global header & footer.
- **Category Deep Links:** Landing categories open the catalog with audience filters pre-applied via URL query params.
- **Product Catalog:** Debounced search, multi-filter sidebar (audience, price range, sorting), shareable filter state in the URL, “Load more” pagination.
- **Product Detail Page (PDP):** Image gallery with thumbnails, sticky gallery on desktop, availability status, description, dynamic specs table, “You might also like” recommendations.
- **Responsive UI:** Mobile-first layout — filter drawer on small screens, adaptive product grid (1–4 columns).

### Shopping Flow

- **Guest Experience:** Browse catalog and add items to cart without login; cart persisted in `localStorage`.
- **Auth-Gated Checkout:** Order placement requires registration/login; guest cart merges with the server cart after sign-in.
- **Checkout:** Delivery form with client-side validation (React Hook Form + Zod), payment method selection (card online / pay on delivery), order review sidebar, success page with order number.
- **Wishlist:** Add/remove gifts from catalog and PDP; dedicated wishlist page with per-item cart actions and “Add all to cart”.

### User Account

- **Profile:** View and update name and phone; email read-only.
- **Order History:** List of past orders with status, totals, and expandable order details.

### Admin Panel

- **Gift Management:** Create, edit, and delete products (name, price, stock, description, tags, age range, target audiences).
- **Order Status:** Update order status by ID (Pending payment, In transit, Completed, Cancelled).

### Core Implementation

- **Full-stack Architecture:** React SPA + Spring Boot REST API + PostgreSQL.
- **JWT Authentication:** Register / login, role-based access (`USER`, `ADMIN`).
- **Form Validation:** Zod schemas on the frontend; Bean Validation on the backend.
- **API Integration:** Axios client with automatic JWT attachment for authenticated requests.
- **URL-Driven Catalog State:** Filters, search, and pagination synced with the browser URL (shareable links, back/forward support).
- **Cart Synchronization:** Guest cart in `localStorage` reconciled with server cart after login and on checkout.
- **Role-Based UI:** Wishlist, cart, checkout, and admin areas adapt by user role.
- **Structured Error Handling:** API field errors mapped to form inputs; toast notifications for user feedback.
- **Live Deployment:** Frontend and backend deployed on Render with CORS configured for production.

---

## Technical Stack

### Frontend
- **React 19**, **TypeScript**, **Vite**
- **Tailwind CSS 4**, **shadcn/ui**, **Lucide** icons
- **React Router 7**, **React Hook Form**, **Zod**
- **Axios**

### Backend
- **Java 17**, **Spring Boot 4**
- **Spring Security** (JWT), **Spring Data JPA**
- **PostgreSQL**, **Flyway** migrations
- **MapStruct**, **Lombok**, **Springdoc OpenAPI**

### Infrastructure
- **Render** — frontend (static site) & backend (Docker)
- **PostgreSQL** — Render managed database

---

## Roles

| Role | Capabilities |
|------|----------------|
| **Guest** | Browse catalog, search, view PDP, manage local cart |
| **USER** | Cart sync, wishlist, checkout, profile, order history |
| **ADMIN** | Gift CRUD, order status updates (no shopping flow) |

---

## Local Development

**Backend**

    docker compose -f backend/compose.yaml up -d
    cd backend
    ./mvnw spring-boot:run

API: http://localhost:8080/api

**Frontend**

    cd frontend
    npm install
    npm run dev

App: http://localhost:5173 (Vite proxy → /api)

---

## Author

**Yuliia** — full frontend: SPA, responsive UI, auth, cart, checkout, wishlist, account & admin panels

**Backend** — teammate
