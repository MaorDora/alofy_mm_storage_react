// src/App.tsx
import { Outlet } from "react-router-dom";
import BottomNav from './components/BottomNav'; // 1. ייבוא הניווט
import './App.css'; // 2. ייבוא העיצוב הראשי

function App() {
  return (
    <div className="app-container">
      {/* 3. ה-Outlet הוא החלק החשוב ביותר.
        הוא יוחלף ב-HomePage, WarehousesPage, וכו'
        בהתאם לכתובת ה-URL.
      */}
      <main className="page-content">
        <Outlet />
      </main>

      {/* 4. הניווט התחתון תמיד מוצג */}
      <BottomNav />
    </div>
  );
}

export default App;