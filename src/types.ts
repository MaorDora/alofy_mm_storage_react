// src/types.ts

// טיפוס משתמש, מבוסס על מה שיצרת ב-java.js
export interface AppUser {
  id: string;
  name: string;
  email: string;
  isApproved: boolean;
}

// טיפוס מחסן
export interface Warehouse {
  id: string;
  name: string;
}

// טיפוס פריט ציוד
export interface EquipmentItem {
  id: string;
  name: string;
  warehouseId: string;
  managerUserId: string;
  status: 'available' | 'charging' | 'broken' | 'repair' | 'loaned';
  lastCheckDate: string;
  loanedToUserId: string | null;
}

// טיפוס פעילות
export interface Activity {
  id: string;
  name: string;
  managerUserId: string;
  date: string;
  equipmentRequiredIds: string[];
  equipmentMissingIds: string[];
}