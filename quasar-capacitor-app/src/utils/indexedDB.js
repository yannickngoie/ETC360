// src/utils/indexedDB.js
import { openDB } from 'idb';

// Open the IndexedDB database
export async function openDatabase() {
  return openDB('my_database', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('records')) {
        db.createObjectStore('records', { keyPath: 'id' });
      }
    },
  });
}

// Fetch all records from IndexedDB
export async function fetchRecords() {
  const db = await openDatabase();
  return db.getAll('records');
}

// Add a new record to IndexedDB
export async function addRecord(record) {
  const db = await openDatabase();
  await db.put('records', record);  // `put` will update or add the record
}

// Delete a record from IndexedDB
export async function deleteRecord(id) {
  const db = await openDatabase();
  await db.delete('records', id);
}

// Update a record in IndexedDB
export async function updateRecord(record) {
  const db = await openDatabase();
  await db.put('records', record);
}

// Clear all records from IndexedDB
export async function clearAllRecords() {
  const db = await openDatabase();
  await db.clear('records');
}
