// src/pages/EditActivityEquipmentPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import { updateActivityEquipment } from '../firebaseUtils'; //
import HeaderNav from '../components/HeaderNav';
import EquipmentSelectItem from '../components/EquipmentSelectItem'; // 1. ייבוא הרכיב החדש
import './EditActivityEquipmentPage.css'; // 2. ייבוא העיצוב

function EditActivityEquipmentPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { activities, equipment: allEquipment, isLoading } = useDatabase();

  // 3. State לניהול החיפוש
  const [searchTerm, setSearchTerm] = useState('');
  
  // 4. State לניהול הפריטים שנבחרו (נשתמש ב-Set לניהול יעיל של ID-ים)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 5. טעינת הפעילות הספציפית
  const activity = useMemo(() => {
    return activities.find(act => act.id === activityId);
  }, [activityId, activities]);

  // 6. אפקט למילוי ראשוני של הפריטים שכבר משויכים לפעילות
  useEffect(() => {
    if (activity) {
      // ניקח גם את הכשירים וגם את החסרים שכבר שויכו
      //
      const initialIds = [
        ...activity.equipmentRequiredIds, 
        ...activity.equipmentMissingIds
      ];
      setSelectedIds(new Set(initialIds));
    }
  }, [activity]); // תלות ב-activity (ירוץ כשהוא ייטען)

  // 7. סינון הרשימה לפי חיפוש
  //
  const filteredEquipment = useMemo(() => {
    if (searchTerm === '') {
      return allEquipment;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allEquipment.filter(item => 
      item.name.toLowerCase().includes(lowerSearchTerm)
    );
  }, [allEquipment, searchTerm]);

  // 8. פונקציה לטיפול בלחיצה על צ'קבוקס
  const handleToggle = (itemId: string) => {
    setSelectedIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(itemId)) {
        newIds.delete(itemId); // הסר אם קיים
      } else {
        newIds.add(itemId); // הוסף אם לא קיים
      }
      return newIds;
    });
  };

  // 9. פונקציית שמירה
  //
  const handleSave = async () => {
    if (!activityId) return;

    // קרא לפונקציה מ-firebaseUtils
    // הפונקציה הזו תמיין מחדש ל"כשירים" ו"חסרים" ותשמור ב-Firestore
    await updateActivityEquipment(activityId, Array.from(selectedIds), allEquipment);

    alert("השינויים נשמרו בהצלחה!");
    navigate(-1); // חזור עמוד אחד אחורה (לפרטי הפעילות)
  };

  if (isLoading) {
    return <div>טוען נתונים...</div>;
  }
  
  const title = `עריכת ציוד (${activity?.name || '...'})`;

  return (
    <div>
      <HeaderNav title={title} />
      
      <div className="search-filter-container">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px" style={{ fill: 'var(--text-secondary)', marginRight: '8px' }}>
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            placeholder="חיפוש ציוד..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* TODO: Add filter button logic */}
      </div>

      <div className="equipment-list">
        {filteredEquipment.length === 0 && (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
            לא נמצאו פריטים תואמים.
          </p>
        )}
        
        {filteredEquipment.map(item => {
          // לוגיקה זהה לקוד הישן
          //
          // פריט ניתן לבחירה אם הוא כשיר או בטעינה
          const isSelectable = (item.status === 'available' || item.status === 'charging');
          // פריט מושבת אם אי אפשר לבחור בו, *אלא אם* הוא כבר מסומן
          // (מה שקורה אם הסטטוס שלו השתנה אחרי שכבר שויך)
          const isDisabled = !isSelectable && !selectedIds.has(item.id);

          return (
            <EquipmentSelectItem 
              key={item.id}
              item={item}
              isChecked={selectedIds.has(item.id)}
              isDisabled={isDisabled}
              onToggle={handleToggle}
            />
          );
        })}
      </div>

      {/* כפתור שמירה תחתון */}
      <div className="action-buttons-sticky">
        <button className="btn-submit" onClick={handleSave}>
          שמור שינויים
        </button>
      </div>
    </div>
  );
}

export default EditActivityEquipmentPage;