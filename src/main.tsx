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
import EquipmentFormPage from './pages/EquipmentFormPage.tsx';

// 1. ייבוא העמוד החדש
import ActivityDetailsPage from './pages/ActivityDetailsPage.tsx';

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
    children: [
      {
        path: "/", 
        element: <HomePage />,
      },
      {
        path: "warehouses", 
        element: <WarehousesPage />,
      },
      {
        path: "warehouses/:warehouseId", 
        element: <WarehouseDetailsPage />,
      },
      {
        path: "activities", 
        element: <ActivitiesPage />,
      },
      {
        // 2. החלפת הפלייס-הולדר בעמוד האמיתי
        path: "activities/:activityId", 
        element: <ActivityDetailsPage />,
      },
      {
        // 3. הוספת פלייס-הולדר *חדש* לעמוד העריכה
        path: "activities/:activityId/edit", 
        element: <div>(עמוד עריכת ציוד לפעילות - יבנה בהמשך)</div>,
      },
      {
        path: "item/new", 
        element: <EquipmentFormPage />,
      },
      {
        path: "item/edit/:itemId", 
        element: <EquipmentFormPage />,
      },
      {
        path: "activity/new", 
        element: <div>(טופס הוספת פעילות - יבנה בהמשך)</div>,
      },
    ]
  },
  {
    path: "/login", 
    element: <LoginPage />,
  },
]);

// רינדור האפליקציה
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)