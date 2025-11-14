// src/firebaseUtils.ts
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // ייבוא ה-db שלנו
import type { EquipmentItem } from './types';

// סוגי הסטטוסים האפשריים
type EquipmentStatus = EquipmentItem['status'];

/**
 * מעדכן סטטוס של פריט ציוד ספציפי ב-Firebase
 */
export const updateEquipmentStatus = async (itemId: string, newStatus: EquipmentStatus) => {
  console.log(`מעדכן סטטוס עבור ${itemId} ל-${newStatus}...`);
  const itemRef = doc(db, 'equipment', itemId);
  
  const updateData: { status: EquipmentStatus, loanedToUserId?: string | null } = {
    status: newStatus
  };

  // אם הסטטוס הוא *לא* מושאל, נקה את השדה 'loanedToUserId'
  if (newStatus !== 'loaned') {
    updateData.loanedToUserId = null;
  }
  // (בשלב הבא נוסיף לוגיקה לבחירת משתמש כשהסטטוס הוא 'loaned')

  try {
    await updateDoc(itemRef, updateData);
    console.log("עדכון סטטוס הצליח!");
  } catch (error) {
    console.error("שגיאה בעדכון סטטוס:", error);
    alert("שגיאה בעדכון הסטטוס.");
  }
};

/**
 * מוחק פריט ציוד ספציפי מ-Firebase
 */
export const deleteEquipmentItem = async (itemId: string) => {
  if (!confirm("האם אתה בטוח שברצונך למחוק את הפריט? אין דרך לשחזר פעולה זו.")) {
    return; // בטל אם המשתמש לחץ 'ביטול'
  }
  
  console.log(`מוחק את פריט ${itemId}...`);
  const itemRef = doc(db, 'equipment', itemId);
  try {
    await deleteDoc(itemRef);
    console.log("מחיקה הצליחה!");
    
    // TODO: להוסיף לוגיקה שתסיר את הפריט הזה גם מכל הפעילויות
    // (כרגע זה יגרום לפריט פשוט "להיעלם" מהפעילות, וזה מספיק טוב)

  } catch (error) {
    console.error("שגיאה במחיקת פריט:", error);
    alert("שגיאה במחיקת הפריט.");
  }
};