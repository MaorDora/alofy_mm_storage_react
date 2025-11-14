import React from 'react';
// זהו רכיב מיוחד מ-react-router
// הוא משמש כ"ממלא מקום" לעמודים הפנימיים
import { Outlet } from "react-router-dom";

// TODO: ניצור ונייבא את התפריט התחתון
// import BottomNav from './components/BottomNav'; 

function App() {
  // כאן, בשלב הבא, נוסיף את הלוגיקה
  // שבודקת אם המשתמש מחובר.
  // אם הוא לא מחובר -> נעביר אותו ל- /login

  return (
    <div className="app-container">
      <header>
        {/* כאן יהיה ההאדר העליון
          (לדוגמה: "שלום, מאור")
        */}
      </header>

      <main className="page-content">
        {/* ה-Outlet הוא החלק החשוב ביותר.
          כאשר תיגש ל- /home, ה-Router יטען את 
          קומפוננטת Home *בדיוק במקום הזה*.
          כאשר תיגש ל- /activities, הוא יטען את Activities כאן.
        */}
        <Outlet />
      </main>

      <footer>
        {/* כאן נשים את התפריט התחתון.
          הוא תמיד יישאר קבוע בתחתית המסך
          בזמן שהתוכן ב- <main> יתחלף.
        */}
        {/* <BottomNav /> */}
        <p>(כאן יהיה התפריט התחתון)</p>
      </footer>
    </div>
  );
}

export default App;