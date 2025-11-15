// src/App.tsx
import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom"; // 1. ייבוא useLocation
import BottomNav from './components/BottomNav';
import Fab from './components/Fab';
import QuickAddModal from './components/QuickAddModal';
import { AnimatePresence, motion } from 'framer-motion'; // 2. ייבוא motion ו- AnimatePresence

import './App.css'; 

// 3. הגדרת האנימציה (כאן, במקום בקובץ נפרד)
const pageAnimation = {
  initial: {
    opacity: 0,
    x: "100vw" // התחל מימין
  },
  in: {
    opacity: 1,
    x: 0, // החלק למרכז
    transition: { type: "tween", ease: "anticipate", duration: 0.3 }
  },
  out: {
    opacity: 0,
    x: "-100vw", // החלק החוצה שמאלה
    transition: { type: "tween", ease: "easeIn", duration: 0.2 }
  }
};

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const location = useLocation(); // 4. קבלת המיקום הנוכחי

  return (
    <div className="app-container">
      <main className="page-content">
        <AnimatePresence mode="wait" initial={false}>
          {/* 5. עטיפת ה-Outlet ב-motion.div עם מפתח ייחודי */}
          <motion.div
            key={location.pathname} // המפתח משתנה בכל ניווט
            variants={pageAnimation}
            initial="initial"
            animate="in" // <-- כאן התיקון, הנקודה הוסרה
            exit="out"
            // העיצוב הזה גורם לעמוד לתפוס את כל המרחב
            style={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />

      <Fab onClick={() => setIsAddModalOpen(true)} />
      <QuickAddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}

export default App;