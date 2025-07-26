# 💍 Rishta Matrimony 

Welcome to **Rishta Matrimony**, a fully responsive MERN stack-based matchmaking platform. Users can create biodatas, search for potential matches, become premium members, and submit success stories. Admins manage users, premium approvals, and contact requests through a dedicated dashboard.

---

## 🔐 Admin Credentials

- **Email**: `iamekbal75@gmail.com`  
- **Password**: `12Abc@#`  

> ⚠️ These credentials are for assignment testing/demo purposes only.

---

## 🌐 Live Website

➡️ [https://rishtamatrimony.netlify.app](https://rishtamatrimony.netlify.app)

---

## 🚀 Key Features

- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop, including dashboards
- 🔐 **Authentication**: Firebase email/password login and Google sign-in
- 🧾 **Dynamic Biodata System**: Users can create, edit, view biodatas with auto-generated IDs
- ⭐ **Premium Membership**: Users can upgrade to premium and see contact info after admin approval
- 💳 **Stripe Payments**: Integrated checkout flow to request contact info (5 USD per request)
- 📋 **Filter & Sort Biodatas**: By age, type, division; ascending/descending age sorting
- 📦 **TanStack React Query**: Used for all GET data fetching (optimized, cached)
- 🛡 **JWT Authentication**: Ensures protected routes remain accessible after page reload
- 💌 **Success Story Submission**: Users can submit stories after marriage
- 📊 **Admin Dashboard with Charts**: Track biodatas, gender, premium count, revenue
- 💬 **Toast & SweetAlert2**: For all notifications (login, CRUD, payments, etc.)
- 🔎 **Pagination**: Implemented on biodatas page for performance
- 🧠 **Role-Based Dashboard**: Separate views for normal users and admins
- 🔐 **Private Routes**: Protected biodata details, dashboards, checkout, etc.
- ☁️ **Environment Variables**: Firebase and MongoDB keys hidden securely

---

## 🛠 Tech Stack

### 🧩 Frontend
- React 19 + Vite
- Tailwind CSS (no DaisyUI)
- Flowbite, Headless UI
- Firebase Auth
- React Hook Form
- React Router DOM 7
- Stripe JS & React Stripe
- Axios
- React Query (TanStack)
- Framer Motion
- SweetAlert2 + Toastify
- AOS (Scroll animations)
- Recharts, LightGallery, Swiper

### 🧩 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payment API
- CORS, Dotenv
- REST API


## 📦 Used Packages

### Core Libraries

- `react` & `react-dom`: UI building blocks
- `react-router`: Client-side routing
- `axios`: API calls
- `firebase`: Auth & data storage
- `@tanstack/react-query`: Data fetching & caching
- `dayjs`: Date/time formatting

### UI & Styling

- `tailwindcss`: Utility-first CSS framework
- `flowbite` & `flowbite-react`: Prebuilt Tailwind components
- `@headlessui/react`: UI primitives
- `aos`: Scroll animations
- `framer-motion`: Animation framework
- `sweetalert2`: Modal alerts

### Forms & Inputs

- `react-hook-form`: Forms and validation
- `react-toastify`: Toast notifications
- `react-countup`: Number animations
- `react-intersection-observer`: Lazy load & animation triggers

### Image/Carousel

- `swiper`: Advanced sliders
- `react-slick` & `slick-carousel`: Additional carousel
- `lightgallery`, `lg-zoom`, `lg-thumbnail`: Image zoom/viewer support

### Payment

- `@stripe/stripe-js` & `@stripe/react-stripe-js`: Stripe integration

---

## ⚙️ Dev Tools & Config

- `vite`: Lightning-fast dev server
- `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: Code linting
- `postcss`, `autoprefixer`: CSS tooling
- `@vitejs/plugin-react`: React plugin for Vite
- `@tailwindcss/vite`: Tailwind + Vite integration

---

## 📂 Project Setup

```bash
# Clone the repo
git clone https://github.com/your-username/rishta-a12.git

# Navigate into the project
cd rishta-a12

# Install dependencies
npm install

# Start development server
npm run dev


