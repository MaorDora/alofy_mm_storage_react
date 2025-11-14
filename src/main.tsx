import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// עוד מעט ניצור את הקבצים האלה
// import App from './App.tsx' 
// import LoginPage from './pages/LoginPage.tsx' 

// import './index.css' // אם יש לך קובץ CSS כללי, נחזיר את זה

// --- הגדרת הניווט ---
const router = createBrowserRouter([
  {
    path: "/",
    // בינתיים נשים טקסט פשוט עד שניצור את העמוד
    element: <div>טוען את אפליקציית React...</div>,
    // TODO: כשיהיה לנו עמוד, נחליף ל:
    // element: <App />, 
  },
  {
    path: "/login",
    // בינתיים נשים טקסט פשוט
    element: <div>זה יהיה עמוד הלוגין</div>,
    // TODO: כשיהיה לנו עמוד, נחליף ל:
    // element: <LoginPage />,
  },
]);
// --------------------


// זה הקוד שמפעיל את האפליקציה
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* שינוי מרכזי: 
      במקום להציג את <App />, אנחנו מציגים את ה-RouterProvider 
      והוא יחליט איזה עמוד להציג לפי ה-URL
    */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)