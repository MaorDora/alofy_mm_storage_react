// src/components/HeaderNav.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderNav.css';

// 1. הגדרנו את האייקון כאן, כי הוא שייך ל-HeaderNav
const OptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

interface HeaderNavProps {
  title: string;
  // 2. החלפנו את 'rightSlot' ב-prop ספציפי
  onOptionsMenuClick?: () => void; 
}

const HeaderNav: React.FC<HeaderNavProps> = ({ title, onOptionsMenuClick }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="header-nav">
      <span className="back-button" onClick={handleBack}>
        &larr; חזור
      </span>
      <h2 className="header-title">{title}</h2>

      {/* 3. אם קיבלנו פונקציה, נציג את הכפתור */}
      {onOptionsMenuClick && (
        <div className="header-options-button" onClick={onOptionsMenuClick}>
          <OptionsIcon />
        </div>
      )}
    </div>
  );
};

export default HeaderNav;