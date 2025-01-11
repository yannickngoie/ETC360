import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { v4 as uuidv4 } from 'uuid';

class AuthStore {
  token = '';
  isAuthenticated = false;
  sqlite = null;

  constructor() {
    this.initializeDatabase(); // Initialize SQLite when the class is instantiated
  }

  // Initialize SQLite connection
  async initializeDatabase() {
    if (CapacitorSQLite) {
      this.sqlite = await CapacitorSQLite.createConnection({
        database: 'authDatabase',
        version: 1,
        encrypted: false,
        mode: 'no-encryption',
      });
      await this.sqlite.open();
      console.log('SQLite database opened');

      // Create table to store token if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS auth_token (
          id TEXT PRIMARY KEY,
          token TEXT
        );
      `;
      await this.sqlite.executeSql(createTableQuery);

      // Load token after initializing the database
      await this.loadToken();
    }
  }

  // Load token from SQLite
  async loadToken() {
    try {
      const result = await this.sqlite.executeSql('SELECT * FROM auth_token LIMIT 1');
      if (result.values.length > 0) {
        this.token = result.values[0].token;
        this.isAuthenticated = true;
      } else {
        this.token = '';
        this.isAuthenticated = false;
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  // Save token to SQLite
  async saveToken(newToken) {
    try {
      const id = uuidv4();
      await this.sqlite.executeSql('DELETE FROM auth_token'); // Remove any existing token
      await this.sqlite.executeSql('INSERT INTO auth_token (id, token) VALUES (?, ?)', [id, newToken]);
      this.token = newToken;
      this.isAuthenticated = true;
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  // Remove token from SQLite
  async removeToken() {
    try {
      await this.sqlite.executeSql('DELETE FROM auth_token');
      this.token = '';
      this.isAuthenticated = false;
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

  // Login function
  async login(username, password) {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        await this.saveToken(data.token);  // Store the token in SQLite
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  // Logout function
  async logout() {
    await this.removeToken();  // Remove the token from SQLite
  }

  // Getters for token and authentication state
  getToken() {
    return this.token;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }
}

export const authStore = new AuthStore(); // Instantiate the class
