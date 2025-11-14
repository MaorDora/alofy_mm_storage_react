// src/components/EquipmentItemRow.tsx
import React from 'react';
import type { EquipmentItem } from '../types';
import { useDatabase } from '../contexts/DatabaseContext';
import './EquipmentItemRow.css';

interface EquipmentItemRowProps {
  item: EquipmentItem;
}

// מחלקה קטנה לניהול הסטטוסים
const statusMap = {
  'available': { text: 'כשיר', class: 'status-available' },
  'charging': { text: 'בטעינה', class: 'status-charging' },
  'broken': { text: 'לא כשיר', class: 'status-broken' },
  'repair': { text: 'בתיקון', class: 'status-repair' },
  'loaned': { text: 'הושאל', class: 'status-loaned' }
};

const EquipmentItemRow: React.FC<EquipmentItemRowProps> = ({ item }) => {
  const { users } = useDatabase(); // שואב את רשימת המשתמשים
  
  // מחליף את getUserById
  const manager = users.find(u => u.id === item.managerUserId);
  const loanedToUser = users.find(u => u.id === item.loanedToUserId);

  const checkDate = new Date(item.lastCheckDate).toLocaleDateString('he-IL', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  });

  let secondaryInfo = `אחראי: ${manager?.name || '...'} • ווידוא: ${checkDate}`;
  if (item.status === 'loaned') {
    secondaryInfo = `הושאל ל: ${loanedToUser?.name || '...'} • עד: 29/10/25`;
  }
  
  const statusInfo = statusMap[item.status] || { text: 'לא ידוע', class: 'status-grey' };

  return (
    <div className="equipment-item-content">
      <div className="equipment-details">
        <div className="equipment-name">{item.name}</div>
        <div className="equipment-secondary-info" style={{ color: item.status === 'loaned' ? 'var(--status-orange)' : undefined }}>
          {secondaryInfo}
        </div>
      </div>
      <div className={`equipment-status ${statusInfo.class}`}>
        <span className="status-dot"></span>
        <span>${statusInfo.text}</span>
      </div>
    </div>
  );
};

export default EquipmentItemRow;