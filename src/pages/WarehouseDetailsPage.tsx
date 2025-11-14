// src/pages/WarehouseDetailsPage.tsx
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import HeaderNav from '../components/HeaderNav';
import EquipmentItemRow from '../components/EquipmentItemRow';
import FilterChips from '../components/FilterChips';
import StatusModal from '../components/StatusModal'; // 1. ייבוא המודאל
import type { EquipmentItem } from '../types'; // 2. ייבוא הטיפוס

type FilterType = 'all' | 'validate' | 'broken' | 'loaned';

function WarehouseDetailsPage() {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const { warehouses, equipment, isLoading } = useDatabase();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  // 3. הוספת State לניהול המודאל
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);

  const filteredItems = useMemo(() => {
    // ... (לוגיקת הסינון נשארת זהה)
    const itemsInWarehouse = equipment.filter(item => item.warehouseId === warehouseId);
    const today = new Date();
    const validationThreshold = new Date(new Date().setDate(today.getDate() - 30));
    switch (activeFilter) {
      case 'all': return itemsInWarehouse;
      case 'validate': return itemsInWarehouse.filter(item => new Date(item.lastCheckDate) < validationThreshold);
      case 'broken': return itemsInWarehouse.filter(item => item.status === 'broken' || item.status === 'repair');
      case 'loaned': return itemsInWarehouse.filter(item => item.status === 'loaned');
      default: return itemsInWarehouse;
    }
  }, [equipment, warehouseId, activeFilter]); 

  if (isLoading) {
    return <div>טוען פרטי מחסן...</div>;
  }

  const warehouse = warehouses.find(w => w.id === warehouseId);

  if (!warehouse) {
    return <div><HeaderNav title="שגיאה" /><p style={{ textAlign: 'center' }}>מחסן לא נמצא.</p></div>;
  }

  return (
    <div>
      <HeaderNav title={warehouse.name} />
      
      <FilterChips onFilterChange={(filterId) => setActiveFilter(filterId as FilterType)} />
      
      <div className="equipment-list">
        {filteredItems.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
            {activeFilter === 'all' ? 'אין פריטים במחסן זה.' : 'לא נמצאו פריטים שתואמים לפילטר.'}
          </p>
        ) : (
          filteredItems.map(item => (
            <EquipmentItemRow 
              key={item.id} 
              item={item}
              // 4. כשלוחצים, נשמור את הפריט ב-State
              onClick={() => setSelectedItem(item)} 
            />
          ))
        )}
      </div>

      {/* 5. רינדור מותנה של המודאל */}
      {/* אם selectedItem קיים (לא null), הצג את המודאל */}
      {selectedItem && (
        <StatusModal 
          item={selectedItem}
          // כשלוחצים "ביטול" או "סגור", נאפס את ה-State
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}

export default WarehouseDetailsPage;