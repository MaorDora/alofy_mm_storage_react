// src/contexts/DatabaseContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { collection, onSnapshot, doc, setDoc, type DocumentData } from 'firebase/firestore';
import { onAuthStateChanged, type User as AuthUser } from 'firebase/auth'; // 1. ייבוא שירותי Auth
import { db, auth } from '../firebaseConfig'; // 2. ייבוא auth ו-db
import type { AppUser, Warehouse, EquipmentItem, Activity } from '../types';

// 1. הגדרת מה ה-Context יספק
interface DatabaseContextState {
  users: AppUser[];
  warehouses: Warehouse[];
  equipment: EquipmentItem[];
  activities: Activity[];
  isLoading: boolean;
  currentUser: AppUser | null; // 3. הוספנו את המשתמש הנוכחי
}

// 2. יצירת ה-Context
const DatabaseContext = createContext<DatabaseContextState | undefined>(undefined);

// 3. יצירת ה-"ספק" (Provider)
export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 4. State חדש למשתמש המאומת (מ-Auth)
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  // 5. State חדש למשתמש שלנו מהאפליקציה (מ-Firestore)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // 6. אפקט הסנכרון - מאזין לשינויים ב-Firestore
  useEffect(() => {
    console.log("DatabaseContext: מתחיל האזנה ל-Firebase...");

    const mapSnapshot = <T,>(snapshot: DocumentData): T[] => {
      return snapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    };

    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = mapSnapshot<AppUser>(snapshot);
      setUsers(usersData);
      console.log("משתמשים נטענו:", usersData.length);
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
    
    setIsLoading(false); 

    // 7. האזנה לשינויי התחברות (Auth)
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setAuthUser(user); // שמור את משתמש ה-Auth
    });

    return () => {
      console.log("DatabaseContext: מפסיק האזנה.");
      unsubUsers();
      unsubWarehouses();
      unsubEquipment();
      unsubActivities();
      unsubAuth(); // 8. נתק גם את ההאזנה ל-Auth
    };
  }, []);

  // 9. --- אפקט חדש ליצירת משתמש ---
  // ירוץ כל פעם שמשתמש ה-Auth משתנה או שרשימת המשתמשים מה-DB מתעדכנת
  useEffect(() => {
    if (isLoading) return; // אל תרוץ עד שהטעינה הראשונית הסתיימה

    if (authUser && users.length > 0) {
      // יש משתמש מחובר ויש לנו רשימת משתמשים מה-DB
      const appUser = users.find(u => u.id === authUser.uid);

      if (appUser) {
        // משתמש ותיק - שמור אותו כמשתמש הנוכחי
        setCurrentUser(appUser);
      } else {
        // --- משתמש חדש! ---
        // בדיוק כמו ב-java.js, ניצור לו רשומה
        console.log("משתמש חדש זוהה! יוצר רשומה ב-Firestore...");
        
        const newUserData: AppUser = {
          id: authUser.uid,
          name: authUser.displayName || "משתמש חדש",
          email: authUser.email || "",
          isApproved: false // ברירת מחדל
        };

        const userRef = doc(db, "users", authUser.uid);
        setDoc(userRef, newUserData)
          .then(() => {
            console.log("משתמש חדש נוצר בהצלחה");
            // `onSnapshot` יתפוס את השינוי הזה אוטומטית ויעדכן את `users`
            // מה שיגרום ל-useEffect הזה לרוץ שוב ולמצוא את המשתמש
          })
          .catch(err => {
            console.error("שגיאה ביצירת משתמש חדש:", err);
          });
      }
    } else if (!authUser) {
      // אין משתמש מחובר
      setCurrentUser(null);
    }
  }, [authUser, users, isLoading]); // תלות ב-3 משתנים

  // 10. החזרת ה-Provider עם המידע המלא
  const value = { users, warehouses, equipment, activities, isLoading, currentUser };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

// 11. יצירת Hook מותאם אישית
export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}