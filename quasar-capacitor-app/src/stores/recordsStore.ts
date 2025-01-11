import { defineStore } from 'pinia';
import { ref } from 'vue';
import { openDB, IDBPDatabase } from 'idb';
import { v4 as uuidv4 } from 'uuid';

interface RecordItem {
  id: string;
  title: string;
  description: string;
  barcode: string;
  updated_at: Date;
  isNew?: boolean;
  isModified?: boolean;
  isDeleted?: boolean;
}

const dbName = 'myDatabase';
const storeName = 'records';

export const useRecordsStore = defineStore('records', () => {
  const records = ref<RecordItem[]>([]);
  const columns = ref([
    { name: 'id', label: 'ID', align: 'center', field: 'id' },
    { name: 'title', label: 'Title', align: 'left', field: 'title' },
    { name: 'description', label: 'Description', align: 'left', field: 'description' },
    { name: 'barcode', label: 'Barcode', align: 'left', field: 'barcode' },
    { name: 'updated_at', label: 'Last Updated', align: 'center', field: 'updated_at' },
    { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
  ]);

  const initDb = async (): Promise<IDBPDatabase> => {
    return openDB(dbName, 1, {
      upgrade(db) {
        const store = db.createObjectStore(storeName, { keyPath: 'id' });
        store.createIndex('title', 'title');
      },
    });
  };

  const loadRecords = async () => {
    try {
     
      const db = await initDb();
      const storedRecords = (await db.getAll(storeName)) as RecordItem[];
      records.value = storedRecords;

      const response = await fetch('http://localhost:5000/records/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const apiRecords: RecordItem[] = await response.json();
        records.value = [...apiRecords, ...storedRecords];
      } else {
        console.error('Failed to fetch records from API:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const addRecord = async (record: Partial<RecordItem>) => {
    try {
      const db = await initDb();
      const existingRecord = records.value.find(r => r.id === record.id);

      const cleanRecord: RecordItem = {
        id: record.id || uuidv4(),
        title: record.title || '',
        description: record.description || '',
        barcode: record.barcode || '',
        updated_at: new Date(),
        isNew: !existingRecord,
        isModified: !!existingRecord,
        isDeleted: false,
      };

      if (existingRecord) {
        const updatedRecord = { ...existingRecord, ...cleanRecord };
        await db.put(storeName, updatedRecord);
        records.value = records.value.map(r => (r.id === updatedRecord.id ? updatedRecord : r));
      } else {
        await db.put(storeName, cleanRecord);
        records.value.push(cleanRecord);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const db = await initDb();
      debugger;
      const recordToDelete = records.value.find(record => record.id === id);

      if (recordToDelete) {
        const cleanRecord = { ...recordToDelete, isDeleted: true };
        await db.put(storeName, cleanRecord);
        records.value = records.value.filter(record => record.id !== id);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const syncRecords = async () => {
    try {

      
      const db = await initDb();
      const recordsToSync = records.value.filter(record => record.isNew || record.isModified || record.isDeleted);

      for (const record of recordsToSync) {
        let response: Response;
        if (record.isNew) {
          response = await fetch('http://localhost:5000/records/add', {
            method: 'POST',
            body: JSON.stringify({
              title: record.title,
              description: record.description,
              barcode: record.barcode,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        } else if (record.isModified) {
          response = await fetch('http://localhost:5000/records/edit', {
            method: 'PUT',
            body: JSON.stringify(record),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        } else if (record.isDeleted) {
          response = await fetch('http://localhost:5000/records/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id: record.id }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        }

        if (!response.ok) {
          console.error('Failed to sync record:', response.statusText);
        }
      }

      await db.clear(storeName);
      records.value.forEach(record => {
        delete record.isNew;
        delete record.isModified;
        delete record.isDeleted;
      });
    } catch (error) {
      console.error('Error syncing records:', error);
    }
  };

  return { records, columns, addRecord, deleteRecord, syncRecords, loadRecords };
});
