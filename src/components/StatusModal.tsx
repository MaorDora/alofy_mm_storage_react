// src/components/StatusModal.tsx
import React from 'react';
import type { EquipmentItem } from '../types';
import { updateEquipmentStatus, deleteEquipmentItem } from '../firebaseUtils';
import './Modal.css'; // ייבוא העיצוב שיצרנו

// קבועים של הסטטוסים
const statusOptions = [
  { id: 'available', label: 'כשיר', dotClass: 'available' },
  { id: 'charging', label: 'בטעינה', dotClass: 'charging' },
  { id: 'loaned', label: 'הושאל', dotClass: 'loaned' },
  { id: 'repair', label: 'בתיקון', dotClass: 'repair' },
  { id: 'broken', label: 'לא כשיר', dotClass: 'broken' },
] as const; // 'as const' עוזר ל-TypeScript להבין שאלו ערכים קבועים

interface StatusModalProps {
  item: EquipmentItem;
  onClose: () => void; // פונקציה לסגירת המודאל
}

const StatusModal: React.FC<StatusModalProps> = ({ item, onClose }) => {

  const handleStatusChange = (statusId: EquipmentItem['status']) => {
    updateEquipmentStatus(item.id, statusId); // קורא לפונקציה שיצרנו
    onClose(); // וסוגר את המודאל
  };

  const handleDelete = () => {
    deleteEquipmentItem(item.id); // קורא לפונקציית המחיקה
    onClose(); // וסוגר
  };

  const handleEdit = () => {
    // TODO: נוסיף ניווט לעמוד עריכה
    alert(`עוד לא מימשנו עריכה עבור: ${item.name}`);
    onClose();
  };

  return (
    // 'active' מפעיל את האנימציה
    <div className="modal-overlay active" onClick={onClose}>
      {/* עוצרים את התפשטות הקליק (propagation)
        כדי שלחיצה על המודאל עצמו לא תסגור אותו
      */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4 className="modal-title">שנה סטטוס עבור: {item.name}</h4>
        
        <div className="modal-options">
          {statusOptions.map(opt => (
            <div key={opt.id} onClick={() => handleStatusChange(opt.id)}>
              {/* העיצוב של הנקודה מגיע מ-EquipmentItemRow.css, נצטרך לתקן את זה אח"כ */}
              <span className={`status-dot ${opt.dotClass}`}></span> {opt.label}
            </div>
          ))}
        </div>

        <button 
          className="modal-button btn-danger"
          onClick={handleDelete}
        >
          מחק פריט
        </button>
        
        <button 
          className="modal-button btn-edit-details"
          onClick={handleEdit}
        >
          ערוך פרטים
        </button>
        
        <button 
          className="modal-button btn-cancel"
          onClick={onClose}
        >
          ביטול
        </button>
      </div>
    </div>
  );
};

export default StatusModal;