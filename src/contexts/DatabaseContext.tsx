// src/contexts/DatabaseContext.tsx
import { createContext, useContext, useState, useEffect,type ReactNode } from 'react';
import { collection, onSnapshot,type DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // ייבוא ה-db שלנו
import type { AppUser, Warehouse, EquipmentItem, Activity } from '../types';

// 1. הגדרת מה ה-Context יספק
interface DatabaseContextState {
  users: AppUser[];
  warehouses: Warehouse[];
  equipment: EquipmentItem[];
  activities: Activity[];
  isLoading: boolean;
}

// 2. יצירת ה-Context
const DatabaseContext = createContext<DatabaseContextState | undefined>(undefined);

// 3. יצירת ה-"ספק" (Provider)
// זהו רכיב שיעטוף את האפליקציה ויחזיק את הלוגיקה
export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. אפקט הסנכרון - זה קורה כשהרכיב נטען
  useEffect(() => {
    console.log("DatabaseContext: מתחיל האזנה ל-Firebase...");

    // פונקציית עזר קטנה להמרת מידע מ-Snapshot
    const mapSnapshot = <T,>(snapshot: DocumentData): T[] => {
      return snapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    };

    // 5. האזנה ל-4 האוספים (collections) שלנו בזמן אמת
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(mapSnapshot<AppUser>(snapshot));
    });

    const unsubWarehouses = onSnapshot(collection(db, 'warehouses'), (snapshot) => {
      setWarehouses(mapSnapshot<Warehouse>(snapshot));
    });

    const unsubEquipment = onSnapshot(collection(db, 'equipment'), (snapshot) => {
      setEquipment(mapSnapshot<EquipmentItem>(snapshot));
    });

    const unsubActivities = onSnapshot(collection(db, 'activities'), (snapshot) => {
      setActivities(mapSnapshot<Activity>(snapshot));
    });
    
    // 6. סימון שהטעינה הראשונית הסתיימה
    // (טכנית, אפשר לעשות משהו מתוחכם יותר, אבל זה מספיק טוב)
    setIsLoading(false); // נניח שהטעינה מספיק מהירה

    // 7. פונקציית ניקוי - תפסיק להאזין כשהרכיב יורד
    return () => {
      console.log("DatabaseContext: מפסיק האזנה.");
      unsubUsers();
      unsubWarehouses();
      unsubEquipment();
      unsubActivities();
    };
  }, []); // [] = הרצה פעם אחת בלבד כשהרכיב עולה

  // 8. החזרת ה-Provider עם המידע לכל ה"ילדים" שלו
  const value = { users, warehouses, equipment, activities, isLoading };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

// 9. יצירת Hook מותאם אישית - הדרך שבה רכיבים יצרכו את המידע
export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}