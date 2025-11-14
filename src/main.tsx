// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { DatabaseProvider } from './contexts/DatabaseContext.tsx';

import HomePage from './pages/HomePage.tsx';
import WarehousesPage from './pages/WarehousesPage.tsx';
import ActivitiesPage from './pages/ActivitiesPage.tsx';
// 1. ייבוא העמוד החדש
import WarehouseDetailsPage from './pages/WarehouseDetailsPage.tsx'; 

import './index.css' 

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DatabaseProvider>
          <App />
        </DatabaseProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/", 
        element: <HomePage />,
      },
      {
        path: "warehouses", 
        element: <WarehousesPage />,
      },
      // 2. הוספת הנתיב הדינאמי
      // ה- :warehouseId הוא "משתנה" בכתובת
      {
        path: "warehouses/:warehouseId", 
        element: <WarehouseDetailsPage />,
      },
      {
        path: "activities", 
        element: <ActivitiesPage />,
      },
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