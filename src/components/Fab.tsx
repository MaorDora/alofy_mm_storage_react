// src/components/Fab.tsx
import React from 'react';
import './Fab.css';

interface FabProps {
  onClick: () => void;
}

const Fab: React.FC<FabProps> = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      +
    </button>
  );
};

export default Fab;