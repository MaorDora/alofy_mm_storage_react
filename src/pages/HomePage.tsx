// src/pages/HomePage.tsx
import { useDatabase } from '../contexts/DatabaseContext'; // 1. ייבוא ה-Hook

function HomePage() {
  // 2. קבלת המשתמש הנוכחי מה-Context
  const { currentUser } = useDatabase();

  return (
    <div>
      <div className="page-header">
        {/* 3. הצגת שם המשתמש באופן דינאמי */}
        <h1 className="main-title">שלום, {currentUser?.name || '...'}</h1>
        <div className="subtitle">סקירה כללית</div>
      </div>
      <div className="container">
        (כאן יהיה הדשבורד)
      </div>
    </div>
  );
}
export default HomePage;