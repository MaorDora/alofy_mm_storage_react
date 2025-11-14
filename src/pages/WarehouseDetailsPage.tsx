// src/pages/WarehouseDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import HeaderNav from '../components/HeaderNav';
import EquipmentItemRow from '../components/EquipmentItemRow';

function WarehouseDetailsPage() {
  // 1. קבל את ה-ID מה-URL
  const { warehouseId } = useParams<{ warehouseId: string }>();
  
  // 2. קבל את כל המידע מה-Context
  const { warehouses, equipment, isLoading } = useDatabase();

  if (isLoading) {
    return <div>טוען פרטי מחסן...</div>;
  }

  // 3. מצא את המחסן הספציפי
  const warehouse = warehouses.find(w => w.id === warehouseId);
  
  // 4. סנן את הציוד ששייך רק למחסן הזה
  const itemsInWarehouse = equipment.filter(item => item.warehouseId === warehouseId);

  if (!warehouse) {
    return <div>
      <HeaderNav title="שגיאה" />
      <p style={{ textAlign: 'center' }}>מחסן לא נמצא.</p>
    </div>;
  }

  return (
    <div>
      {/* 5. השתמש ברכיב הכותרת שיצרנו */}
      <HeaderNav title={warehouse.name} />
      
      {/* TODO: נוסיף כאן את רכיב הפילטרים (צ'יפים) */}
      
      {/* 6. רשימת הפריטים */}
      <div className="equipment-list">
        {itemsInWarehouse.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
            אין פריטים במחסן זה.
          </p>
        ) : (
          itemsInWarehouse.map(item => (
            <EquipmentItemRow key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default WarehouseDetailsPage;