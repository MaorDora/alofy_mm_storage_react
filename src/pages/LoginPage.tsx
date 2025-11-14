// src/pages/LoginPage.tsx

// 1. הוספנו ייבואים חדשים
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '../firebaseConfig'; 

// import './LoginPage.css'; 

function LoginPage() {
  // 2. הוספנו בדיוק את אותה לוגיקת בדיקה מ-ProtectedRoute
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // פשוט נעדכן את המשתמש
      setIsLoading(false); // ונפסיק לטעון
    });
    return () => unsubscribe();
  }, []);

  // 3. פונקציית הלוגין נשארת כמעט זהה
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // אין צורך לשמור את ה-result, כי ה-onAuthStateChanged יתפוס את זה
      await signInWithPopup(auth, provider);
      // ההתחברות תגרום ל-useEffect לרוץ שוב,
      // ה-user יתעדכן, והרכיב יתעדכן מחדש
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      alert("אירעה שגיאה בהתחברות. נסה שוב.");
    }
  };

  // 4. כאן הלוגיקה החדשה
  if (isLoading) {
    return <div>טוען נתונים...</div>;
  }

  // 5. אם המשתמש מחובר (כי הוא לחץ על הכפתור וה-useEffect רץ)
  if (user) {
    // -> תזרוק אותו לדף הבית!
    return <Navigate to="/" replace />;
  }

  // 6. אם אין משתמש (והפסיק לטעון), תציג את דף הלוגין
  return (
    <div className="login-page-container">
      <img src="/realdimond.png" alt="לוגו יהלום" className="login-logo" />
      <h1>מלאי אלופי</h1>
      <p>נא להתחבר כדי להמשיך</p>

      <button className="login-button" onClick={handleLogin}>
        התחברות עם Google
      </button>
    </div>
  );
}

export default LoginPage;