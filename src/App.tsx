// src/App.tsx
import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
// הסרנו את סיומות הקבצים .tsx כדי להתאים להגדרות ה-bundler
import BottomNav from './components/BottomNav'; 
import Fab from './components/Fab';
import QuickAddModal from './components/QuickAddModal';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

import './App.css'; 

// 3. --- החלפנו לאנימציית Spring "נוחה" ומהירה ---
const pageAnimation: Variants = {
  initial: {
    opacity: 0,
    x: "20vw" // התחל קצת מימין (לא מהקצה)
  },
  in: {
    opacity: 1,
    x: 0, // החלק למרכז
    transition: { 
      type: "spring", // סוג האנימציה: קפיץ
      stiffness: 260, // קשיחות הקפיץ (כמה מהר מגיב)
      damping: 25,     // ריסון (כמה מהר מפסיק לקפוץ)
    }
  },
  out: {
    opacity: 0,
    x: "-20vw", // החלק קצת שמאלה
    transition: { 
      type: "tween", 
      ease: "easeIn",
      duration: 0.15 // יציאה מהירה וחלקה
    }
  }
};
// --- סוף התיקון ---

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const location = useLocation(); 

  return (
    <div className="app-container">
      <main className="page-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname} 
            variants={pageAnimation}
            initial="initial"
            animate="in"
            exit="out"
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