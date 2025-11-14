// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { DatabaseProvider } from './contexts/DatabaseContext.tsx';

// 1. ייבוא העמודים החדשים
import HomePage from './pages/HomePage.tsx';
import WarehousesPage from './pages/WarehousesPage.tsx';
import ActivitiesPage from './pages/ActivitiesPage.tsx';

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
    // 2. הגדרת הניתוב הפנימי
    children: [
      {
        path: "/", // עמוד הבית יופיע ב- /
        element: <HomePage />,
      },
      {
        path: "warehouses", // עמוד המחסנים יופיע ב- /warehouses
        element: <WarehousesPage />,
      },
      {
        path: "activities", // עמוד הפעילויות יופיע ב- /activities
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