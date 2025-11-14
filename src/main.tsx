// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { DatabaseProvider } from './contexts/DatabaseContext.tsx';

// ייבוא כל העמודים שהאפליקציה צריכה
import HomePage from './pages/HomePage.tsx';
import WarehousesPage from './pages/WarehousesPage.tsx';
import WarehouseDetailsPage from './pages/WarehouseDetailsPage.tsx'; 
import ActivitiesPage from './pages/ActivitiesPage.tsx';
import EquipmentFormPage from './pages/EquipmentFormPage.tsx'; // ייבוא עמוד הטופס

import './index.css' 

// הגדרת הראוטר עם כל הנתיבים
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
    // כל הנתיבים כאן יהיו "ילדים" של App.tsx
    // ויוצגו בתוך ה-<Outlet />
    children: [
      {
        path: "/", // עמוד הבית
        element: <HomePage />,
      },
      {
        path: "warehouses", // רשימת מחסנים
        element: <WarehousesPage />,
      },
      {
        path: "warehouses/:warehouseId", // פרטי מחסן ספציפי
        element: <WarehouseDetailsPage />,
      },
      {
        path: "activities", // רשימת פעילויות
        element: <ActivitiesPage />,
      },
      {
        path: "activities/:activityId", // **חדש**: פלייס-הולדר לפרטי פעילות
        element: <div>(עמוד פרטי פעילות - יבנה בהמשך)</div>,
      },
      {
        path: "item/new", // **חדש**: טופס הוספת פריט
        element: <EquipmentFormPage />,
      },
      {
        path: "item/edit/:itemId", // **חדש**: טופס עריכת פריט
        element: <EquipmentFormPage />,
      },
      {
        path: "activity/new", // **חדש**: פלייס-הולדר לטופס פעילות
        element: <div>(טופס הוספת פעילות - יבנה בהמשך)</div>,
      },
    ]
  },
  {
    path: "/login", // עמוד הלוגין (מחוץ לאפליקציה המאובטחת)
    element: <LoginPage />,
  },
]);

// רינדור האפליקציה
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)