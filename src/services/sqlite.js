import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

// Initialize the SQLite Connection
const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

export const DatabaseService = {
  db: null,

  async initialize() {
    // Basic boilerplate check. In a real app, you'd handle web vs native diffs here.
    if(Capacitor.getPlatform() === 'web') {
      console.log('SQLite is not fully implemented for Web in this boilerplate yet.');
      // You would need 'jeep-sqlite' for full web support
      return;
    }

    try {
      // Create a database connection
      this.db = await sqliteConnection.createConnection('boilerplateDB', false, 'no-encryption', 1, false);
      
      // Open the database
      await this.db.open();

      // Create a table
      const schema = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          email TEXT
        );
      `;
      await this.db.execute(schema);
      console.log('Database initialized');
    } catch (e) {
      console.error('Error initializing DB', e);
    }
  },

  async addUser(name, email) {
    if (!this.db) return;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    await this.db.run(query, [name, email]);
  },

  async getUsers() {
    if (!this.db) return [];
    const result = await this.db.query('SELECT * FROM users');
    return result.values || [];
  }
};
