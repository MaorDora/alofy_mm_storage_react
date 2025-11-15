// src/components/EquipmentSelectItem.tsx
import React from 'react';
import type { EquipmentItem } from '../types';
import EquipmentItemRow from './EquipmentItemRow'; // שימוש חוזר ברכיב הקיים

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

  const checkboxId = `item-select-${item.id}`;

  return (
    <div 
      className={`equipment-select-item ${isDisabled ? 'disabled' : ''}`}
      onClick={handleToggle} // לחיצה על כל השורה מסמנת
    >
      {/* אנחנו מרנדרים את הרכיב EquipmentItemRow
        אך מעבירים לו פונקציית onClick ריקה, 
        מכיוון שה-div העוטף הזה מטפל בלחיצה.
      */}
      <EquipmentItemRow item={item} onClick={() => {}} />

      <div className="equipment-select-checkbox">
        <input 
          type="checkbox" 
          id={checkboxId} 
          checked={isChecked} 
          disabled={isDisabled}
          readOnly // אנחנו מנהלים את ה-state בלחיצה על ה-div
        />
        <label htmlFor={checkboxId}></label>
      </div>
    </div>
  );
};

export default EquipmentSelectItem;