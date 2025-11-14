import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // מייבאים את משתנה האימות
import { Navigate } from 'react-router-dom'; // זה כלי ה"זריקה" (redirect)

// הרכיב הזה מקבל "ילדים" (children)
// הילדים האלה יהיו כל האפליקציה שלנו
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // state שיחזיק את המשתמש
  const [user, setUser] = useState<User | null>(null);
  // state שיגיד לנו אם סיימנו לבדוק
  const [isLoading, setIsLoading] = useState(true);

  // ה-Hook הזה רץ פעם אחת כשהרכיב עולה
  useEffect(() => {
    // זו אותה פונקציה בדיוק כמו ב-java.js!
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // משתמש מחובר
        setUser(user);
      } else {
        // משתמש לא מחובר
        setUser(null);
      }
      // סיימנו לבדוק
      setIsLoading(false);
    });

    // פונקציית ניקוי
    return () => unsubscribe();
  }, []); // [] ריק = תריץ רק פעם אחת

  // 1. אם אנחנו עדיין בודקים, נציג הודעת טעינה
  if (isLoading) {
    return <div>טוען נתוני משתמש...</div>;
  }

  // 2. אם סיימנו לבדוק *ויש* משתמש
  if (user) {
    // ...אז תציג את הילדים (שזה יהיה <App />)
    return children;
  }

  // 3. אם סיימנו לבדוק *ואין* משתמש
  // ...אז "תזרוק" אותו לעמוד הלוגין
  // (ה-replace מונע מהמשתמש ללחוץ "אחורה" בדפדפן ולחזור לאפליקציה)
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;