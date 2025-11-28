import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

// Initialize the SQLite Connection
const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

export const DatabaseService = {
  db: null,

  async initialize() {
      if(Capacitor.getPlatform() === 'web') {
            console.warn('SQLite is not fully implemented for Web in this boilerplate yet.');
            return;
          }
      
          try {
            const DB_NAME = 'boilerplateDB';
            const DB_VERSION = 1; // Increment this to trigger new migrations
      
            // Define your migrations here
            const upgades = [
              {
                toVersion: 1,
                statements: [
                  `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    email TEXT
                  );`
                ]
              },
              /* Example of how to add version 2 later:
              {
                toVersion: 2,
                statements: [
                  `ALTER TABLE users ADD COLUMN phone TEXT;`
                ]
              }
              */
            ];
      
            // Register the upgrades
            await sqliteConnection.addUpgradeStatement(DB_NAME, upgades);
      
            // Create/Open connection specifying the version
            this.db = await sqliteConnection.createConnection(DB_NAME, false, 'no-encryption', DB_VERSION, false);
            
            await this.db.open();
            console.log('Database initialized and migrated to version', DB_VERSION);
            
          } catch (e) {
            if (!e.message.includes('Connection boilerplateDB already exists')) {
              console.error('Error initializing DB', e);
            }
          }
  },

  async addUser(name, email) {
      if (!this.db) return;
          const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
          await this.db.run(query, [name, email]);
        },
      
        async deleteUser(id) {
          if (!this.db) return;
          const query = 'DELETE FROM users WHERE id = ?';
          await this.db.run(query, [id]);
  },

  async getUsers() {
    if (!this.db) return [];
    const result = await this.db.query('SELECT * FROM users');
    return result.values || [];
  }
};
