// src/components/EquipmentSelectItem.tsx
import React from 'react';
import type { EquipmentItem } from '../types';
import EquipmentItemRow from './EquipmentItemRow';

interface EquipmentSelectItemProps {
  item: EquipmentItem;
  isChecked: boolean;
  isDisabled: boolean;
  onToggle: (itemId: string) => void;
}

const EquipmentSelectItem: React.FC<EquipmentSelectItemProps> = ({ 
  item, 
  isChecked, 
  isDisabled, 
  onToggle 
}) => {
  
  const handleToggle = () => {
    if (!isDisabled) {
      onToggle(item.id);
    }
  };

  // 1. --- יצרנו פונקציה נפרדת לצ'קבוקס ---
  const handleCheckboxClick = (e: React.MouseEvent) => {
    // 2. מנע מהקליק "לבעבע" (bubble up) ל-div החיצוני
    //    כדי ש-handleToggle לא יופעל פעמיים
    e.stopPropagation();
    
    // 3. הפעל את אותה לוגיקה
    handleToggle();
  };

  const checkboxId = `item-select-${item.id}`;

  return (
    <div 
      className={`equipment-select-item ${isDisabled ? 'disabled' : ''}`}
      onClick={handleToggle} // לחיצה על כל השורה
    >
      <EquipmentItemRow item={item} onClick={() => {}} />

      {/* 4. --- הוספנו onClick גם ל-div שעוטף את הצ'קבוקס --- */}
      <div className="equipment-select-checkbox" onClick={handleCheckboxClick}>
        <input 
          type="checkbox" 
          id={checkboxId} 
          checked={isChecked} 
          disabled={isDisabled}
          readOnly 
        />
        <label htmlFor={checkboxId}></label>
      </div>
    </div>
  );
};

export default EquipmentSelectItem;