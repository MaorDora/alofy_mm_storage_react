// src/components/HeaderNav.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderNav.css';

interface HeaderNavProps {
  title: string;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ title }) => {
  const navigate = useNavigate();

  // navigate(-1) זה פשוט "לך עמוד אחד אחורה בהיסטוריה"
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="header-nav">
      <span className="back-button" onClick={handleBack}>
        &larr; חזור
      </span>
      <h2 className="header-title">{title}</h2>
    </div>
  );
};

export default HeaderNav;