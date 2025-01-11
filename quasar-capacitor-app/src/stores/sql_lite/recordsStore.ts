import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
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



export class RecordsStore {
  records: RecordItem[] = [];
  sqlite: any = null;

  dbName: string = 'myDatabase';
  tableName: string = 'records';

  constructor() {
    // Initialize SQLite when the store is created
    this.initializeDatabase();
    this.openDatabase();
  }

  // Initialize SQLite connection
  private async initializeDatabase() {
    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
      this.sqlite = await CapacitorSQLite.createConnection({
        database: this.dbName,
        version: 1,
        encrypted: false,
        mode: 'no-encryption',
      });

      console.log('SQLite connection initialized');
    } else {
      console.warn('SQLite is only available on mobile platforms');
    }
  }

  // Open database and create table if not exists
  async openDatabase(): Promise<void> {
    try {
      if (this.sqlite) {
        // Open the database connection
        await this.sqlite.open();
        console.log('SQLite database opened successfully');

        // Create table if it doesn't exist
        await this.createTable();
      }
    } catch (error) {
      console.error('Error opening SQLite database:', error);
    }
  }

  // Create the table if it doesn't exist
  private async createTable(): Promise<void> {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${this.tableName} (
          id TEXT PRIMARY KEY,
          title TEXT,
          description TEXT,
          barcode TEXT,
          updated_at TEXT
        );
      `;
      await this.sqlite.executeSql(createTableQuery, []);
      console.log('Table created or verified');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  // Load records from the database
  async loadRecords(): Promise<void> {
    try {
      const result = await this.sqlite.executeSql(`SELECT * FROM ${this.tableName};`);
      this.records = result.values as RecordItem[];
    } catch (error) {
      console.error('Error loading records:', error);
    }
  }

  // Add a new record to the database
  async addRecord(record: Partial<RecordItem>): Promise<void> {
    try {
      const newRecord: RecordItem = {
        id: uuidv4(),
        title: record.title || '',
        description: record.description || '',
        barcode: record.barcode || '',
        updated_at: new Date(),
        isNew: true,
        isModified: false,
        isDeleted: false,
      };

      await this.sqlite.executeSql(
        `INSERT INTO ${this.tableName} (id, title, description, barcode, updated_at) VALUES (?, ?, ?, ?, ?);`,
        [
          newRecord.id,
          newRecord.title,
          newRecord.description,
          newRecord.barcode,
          newRecord.updated_at.toISOString(),
        ]
      );

      this.records.push(newRecord);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  }

  // Delete a record from the database
  async deleteRecord(id: string): Promise<void> {
    try {
      await this.sqlite.executeSql(`DELETE FROM ${this.tableName} WHERE id = ?;`, [id]);
      this.records = this.records.filter((record) => record.id !== id);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  }

  // Update an existing record
  async updateRecord(record: RecordItem): Promise<void> {
    try {
      await this.sqlite.executeSql(
        `UPDATE ${this.tableName} SET title = ?, description = ?, barcode = ?, updated_at = ? WHERE id = ?;`,
        [
          record.title,
          record.description,
          record.barcode,
          new Date().toISOString(),
          record.id,
        ]
      );

      this.records = this.records.map((r) =>
        r.id === record.id ? { ...r, ...record, updated_at: new Date() } : r
      );
    } catch (error) {
      console.error('Error updating record:', error);
    }
  }

  // Synchronize the local records with a remote server
  async syncRecords(): Promise<void> {
    try {
      const recordsToSync = this.records.filter(
        (record) => record.isNew || record.isModified || record.isDeleted
      );

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
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        } else if (record.isModified) {
          response = await fetch('http://localhost:5000/records/edit', {
            method: 'PUT',
            body: JSON.stringify(record),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        } else if (record.isDeleted) {
          response = await fetch('http://localhost:5000/records/delete', {
            method: 'DELETE',
            body: JSON.stringify({ id: record.id }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });
        }

        if (response.ok) {
          this.records = this.records.filter((r) => r.id !== record.id);
        } else {
          console.error('Failed to sync record:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error syncing records:', error);
    }
  }
}

// Instantiate the class
export const recordsStore = new RecordsStore();
