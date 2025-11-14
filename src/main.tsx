import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. מחקנו את ההערות וייבאנו את הקבצים שיצרנו
import App from './App.tsx'
import LoginPage from './pages/LoginPage.tsx'

// TODO: לייבא את ה-CSS הכללי
import './index.css' 

const router = createBrowserRouter([
  {
    path: "/",
    // 2. החלפנו את הטקסט בקומפוננטה האמיתית
    element: <App />, 

    // TODO: כאן נוסיף את "הילדים"
    // (דף בית, מחסנים, פעילויות)
    children: [
      // { path: "home", element: <HomePage /> }
    ]
  },
  {
    path: "/login",
    // 3. החלפנו את הטקסט בקומפוננטה האמיתית
    element: <LoginPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)