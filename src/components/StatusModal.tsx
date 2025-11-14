// src/components/StatusModal.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. ייבוא useNavigate
import type { EquipmentItem } from '../types';
import { updateEquipmentStatus, deleteEquipmentItem } from '../firebaseUtils';
import './Modal.css';

const statusOptions = [
  { id: 'available', label: 'כשיר', dotClass: 'available' },
  { id: 'charging', label: 'בטעינה', dotClass: 'charging' },
  { id: 'loaned', label: 'הושאל', dotClass: 'loaned' },
  { id: 'repair', label: 'בתיקון', dotClass: 'repair' },
  { id: 'broken', label: 'לא כשיר', dotClass: 'broken' },
] as const;

interface StatusModalProps {
  item: EquipmentItem;
  onClose: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ item, onClose }) => {
  const navigate = useNavigate(); // 2. אתחול ה-hook

  const handleStatusChange = (statusId: EquipmentItem['status']) => {
    updateEquipmentStatus(item.id, statusId);
    onClose();
  };

  const handleDelete = () => {
    deleteEquipmentItem(item.id);
    onClose();
  };

  const handleEdit = () => {
    // 3. שינוי הלוגיקה של הכפתור
    onClose(); // סגור את המודאל
    navigate(`/item/edit/${item.id}`); // נווט לעמוד העריכה
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4 className="modal-title">שנה סטטוס עבור: {item.name}</h4>
        
        <div className="modal-options">
          {statusOptions.map(opt => (
            <div key={opt.id} onClick={() => handleStatusChange(opt.id)}>
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