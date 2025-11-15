// src/pages/ActivityDetailsPage.tsx
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import HeaderNav from '../components/HeaderNav';
import ActivityOptionsModal from '../components/ActivityOptionsModal';
import type { Activity, EquipmentItem } from '../types';
import './ActivityDetailsPage.css';

// 1. האייקון הוסר מפה (עבר ל-HeaderNav)

const statusMap: { [key: string]: string } = {
  'broken': 'לא כשיר',
  'repair': 'בתיקון',
  'loaned': 'הושאל'
};

function ActivityDetailsPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { activities, equipment, isLoading } = useDatabase();
  
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  // ... (useMemo נשאר ללא שינוי)
  const { activity, finalAssignedItems, finalMissingItems } = useMemo(() => {
    const activity = activities.find(act => act.id === activityId);
    if (!activity) {
      return { activity: null, finalAssignedItems: [], finalMissingItems: [] };
    }
    const finalAssignedItems: EquipmentItem[] = [];
    const finalMissingItems: EquipmentItem[] = [];
    activity.equipmentRequiredIds.forEach(itemId => {
      const item = equipment.find(e => e.id === itemId);
      if (item) {
        if (item.status === 'available' || item.status === 'charging') {
          finalAssignedItems.push(item);
        } else {
          finalMissingItems.push(item);
        }
      }
    });
    activity.equipmentMissingIds.forEach(itemId => {
      const item = equipment.find(e => e.id === itemId);
      if (item) {
        finalMissingItems.push(item);
      }
    });
    return { activity, finalAssignedItems, finalMissingItems };
  }, [activityId, activities, equipment]);

  if (isLoading) {
    return <div>טוען פרטי פעילות...</div>;
  }

  if (!activity) {
    return <div><HeaderNav title="שגיאה" /><p style={{ textAlign: 'center' }}>פעילות לא נמצאה.</p></div>;
  }

  const handleEditEquipment = () => {
    navigate(`/activities/${activityId}/edit`);
  };

  const totalAssigned = finalAssignedItems.length;
  const totalMissing = finalMissingItems.length;
  const totalItems = totalAssigned + totalMissing;

  return (
    <div>
      {/* 2. התיקון:
        הסרנו את 'rightSlot' והחלפנו אותו ב-prop הנקי
      */}
      <HeaderNav 
        title={activity.name} 
        onOptionsMenuClick={() => setIsOptionsModalOpen(true)}
      />
      
      <div className="details-card">
        <h3 className="card-title">
          <span>{`סטטוס פעילות (${totalAssigned}/${totalItems})`}</span>
          <span className="card-title-action" onClick={handleEditEquipment}>
            ערוך
          </span>
        </h3>
        <div className="equipment-scroll-pane">
          {finalMissingItems.length > 0 && (
            finalMissingItems.map(item => (
              <div 
                className="status-item missing" 
                key={item.id}
                onClick={() => alert(`טיפול בפער עבור: ${item.name}`)}
              >
                <span className="status-item-icon icon-red">&times;</span>
                <div className="status-item-details">
                  <div className="status-item-title">{item.name} (נדרש)</div>
                  <div className="status-item-subtitle">
                    סטטוס נוכחי: {statusMap[item.status] || item.status}. לחץ לטיפול...
                  </div>
                </div>
              </div>
            ))
          )}
          <h4 className="pane-subtitle">ציוד כשיר ומשוריין</h4>
          {finalAssignedItems.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', padding: '10px 0', textAlign: 'center' }}>
              לא שוריין ציוד לפעילות זו.
            </p>
          ) : (
            finalAssignedItems.map(item => (
              <div className="status-item" key={item.id}>
                <span className="status-item-icon icon-green">&#10003;</span>
                <div className="status-item-details">
                  <div className="status-item-title">{item.name}</div>
                  <div className="status-item-subtitle">(כשיר, שוריין)</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* רינדור מותנה של המודאל (ללא שינוי) */}
      {isOptionsModalOpen && (
        <ActivityOptionsModal 
          activity={activity}
          onClose={() => setIsOptionsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ActivityDetailsPage;