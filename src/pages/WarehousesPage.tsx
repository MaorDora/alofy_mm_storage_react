// src/pages/WarehousesPage.tsx
import React from 'react';
import { useDatabase } from '../contexts/DatabaseContext'; // 1. ייבוא ה-Hook!

function WarehousesPage() {
  // 2. שאיבת המידע מה-Context
  const { warehouses, equipment, isLoading } = useDatabase();

  // 3. הצגת הודעת טעינה
  if (isLoading) {
    return <div>טוען מחסנים...</div>;
  }

  // פונקציית עזר קטנה (במקום הישנה מ-database.js)
  const getEquipmentCount = (warehouseId: string) => {
    const items = equipment.filter(item => item.warehouseId === warehouseId);
    const available = items.filter(i => i.status === 'available').length;
    return {
      total: items.length,
      available: available,
    };
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="main-title">מחסנים</h1>
      </div>
      <div className="container">
        {warehouses.length === 0 ? (
          <p>לא נמצאו מחסנים.</p>
        ) : (
          // 4. רינדור הרשימה על בסיס המידע החי
          warehouses.map(warehouse => {
            const count = getEquipmentCount(warehouse.id);
            const statusClass = (count.total > 0 && (count.available / count.total) < 0.5) 
              ? 'status-red' 
              : 'status-green';

            return (
              <div 
                key={warehouse.id} 
                className="warehouse-card"
                // TODO: נוסיף ניווט כשנלחץ כאן
              >
                <div>
                  <h3 className="warehouse-card-title">{warehouse.name}</h3>
                  <div className={`warehouse-card-status ${statusClass}`}>
                    {count.available}/{count.total} פריטים כשירים
                  </div>
                </div>
                <span className="chevron">&#9664;</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default WarehousesPage;