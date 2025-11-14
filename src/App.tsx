// src/App.tsx
import { useState } from 'react'; // 1. ייבוא useState
import { Outlet } from "react-router-dom";
import BottomNav from './components/BottomNav';
import Fab from './components/Fab'; // 2. ייבוא FAB
import QuickAddModal from './components/QuickAddModal'; // 3. ייבוא המודאל

import './App.css'; 

function App() {
  // 4. State לניהול נראות המודאל
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="app-container">
      <main className="page-content">
        <Outlet />
      </main>

      <BottomNav />

      {/* 5. הוספת הכפתור והמודאל */}
      <Fab onClick={() => setIsAddModalOpen(true)} />
      <QuickAddModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}

export default App;