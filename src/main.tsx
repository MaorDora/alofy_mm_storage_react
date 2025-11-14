// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'; // 1. הוספנו ייבוא

import './index.css' 

const router = createBrowserRouter([
  {
    path: "/",
    // 2. עטפנו את הרכיב הראשי ב-ProtectedRoute
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    // 3. כאן נשים את כל הדפים הפנימיים
    children: [
      // TODO: נוסיף כאן דף בית, דף מחסנים וכו'
      // { path: "/", element: <HomePage /> },
      // { path: "warehouses", element: <WarehousesPage /> },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)