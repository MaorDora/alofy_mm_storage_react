// src/pages/ActivityDetailsPage.tsx
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import HeaderNav from '../components/HeaderNav';
import type { Activity, EquipmentItem } from '../types';
import './ActivityDetailsPage.css'; // ייבוא העיצוב החדש

// מפה לתרגום סטטוסים, כמו בקוד הישן
//
const statusMap: { [key: string]: string } = {
  'broken': 'לא כשיר',
  'repair': 'בתיקון',
  'loaned': 'הושאל'
};

function ActivityDetailsPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { activities, equipment, isLoading } = useDatabase();

  // שימוש ב-useMemo כדי לחשב את נתוני העמוד
  // הלוגיקה כאן מועתקת ישירות מ-renderActivityDetails
  //
  const { activity, finalAssignedItems, finalMissingItems } = useMemo(() => {
    const activity = activities.find(act => act.id === activityId);
    if (!activity) {
      return { activity: null, finalAssignedItems: [], finalMissingItems: [] };
    }

    const finalAssignedItems: EquipmentItem[] = [];
    const finalMissingItems: EquipmentItem[] = [];

    // 1. בדוק את כל הפריטים ש"אמורים" להיות כשירים
    activity.equipmentRequiredIds.forEach(itemId => {
      const item = equipment.find(e => e.id === itemId);
      if (item) {
        if (item.status === 'available' || item.status === 'charging') {
          finalAssignedItems.push(item);
        } else {
          finalMissingItems.push(item); // הפריט התקלקל!
        }
      }
    });

    // 2. הוסף את הפריטים ש"כבר" היו חסרים
    activity.equipmentMissingIds.forEach(itemId => {
      const item = equipment.find(e => e.id === itemId);
      if (item) {
        finalMissingItems.push(item);
      }
    });

    return { activity, finalAssignedItems, finalMissingItems };
  }, [activityId, activities, equipment]); // חשב מחדש רק כשאלה משתנים

  if (isLoading) {
    return <div>טוען פרטי פעילות...</div>;
  }

  if (!activity) {
    return <div><HeaderNav title="שגיאה" /><p style={{ textAlign: 'center' }}>פעילות לא נמצאה.</p></div>;
  }

  // ניווט לעמוד עריכת הציוד (שניצור בהמשך)
  const handleEditEquipment = () => {
    navigate(`/activities/${activityId}/edit`);
  };

  const totalAssigned = finalAssignedItems.length;
  const totalMissing = finalMissingItems.length;
  const totalItems = totalAssigned + totalMissing;

  return (
    <div>
      <HeaderNav title={activity.name} />
      
      <div className="details-card">
        <h3 className="card-title">
          <span>{`סטטוס פעילות (${totalAssigned}/${totalItems})`}</span>
          <span className="card-title-action" onClick={handleEditEquipment}>
            ערוך
          </span>
        </h3>

        <div className="equipment-scroll-pane">
          
          {/* רשימת פריטים חסרים */}
          {finalMissingItems.length > 0 && (
            finalMissingItems.map(item => (
              <div 
                className="status-item missing" 
                key={item.id}
                // TODO: להוסיף פתיחת מודאל טיפול בפער
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

          {/* רשימת פריטים כשירים */}
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
      
      {/* TODO: נוסיף כאן את כפתורי ה-Check-in/Check-out בהמשך */}

    </div>
  );
}

export default ActivityDetailsPage;