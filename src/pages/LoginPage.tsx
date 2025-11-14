import React from 'react';
// מייבאים את כלי האימות של Firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// מייבאים את משתנה ה-auth שיצרנו בקובץ הקונפיג
import { auth } from '../firebaseConfig'; 

// ניצור כאן קובץ CSS בסיסי אח"כ
// import './LoginPage.css'; 

// זוהי קומפוננטת React.
// היא מחליפה את ה- <div id="screen-login" ...>
function LoginPage() {

  // זו הפונקציה שמטפלת בלוגין
  // היא מחליפה את handleGoogleLogin מהקובץ java.js
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // אם נצליח, הלוגיקה שתהיה לנו ב-App.tsx תקלוט את זה
      console.log("התחברות מוצלחת:", result.user.displayName);
    } catch (error) {
      console.error("שגיאה בהתחברות:", error);
      alert("אירעה שגיאה בהתחברות. נסה שוב.");
    }
  };

  // זה ה-HTML שהקומפוננטה מחזירה
  return (
    <div className="login-page-container">
      {/* אפשר להוסיף כאן את הלוגו והכותרות
        בדיוק כמו ב-index.html הישן 
      */}
      <img src="/realdimond.png" alt="לוגו יהלום" className="login-logo" />
      <h1>מלאי אלופי</h1>
      <p>נא להתחבר כדי להמשיך</p>

      <button className="login-button" onClick={handleLogin}>
        {/* אפשר להוסיף כאן את האייקון SVG של גוגל */}
        התחברות עם Google
      </button>
    </div>
  );
}

export default LoginPage;