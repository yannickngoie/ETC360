
// Import your PostgreSQL connection pool
import pool from './db';

// Define a User interface for type-checking the data
interface User {
  id: string;
  username: string;
  password: string;
}

// Create a new user in the database
const createUser = async (username: string, password: string): Promise<void> => {
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  await pool.query(query, [username, password]);
};

// Find a user by username
const findUserByUsername = async (username: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);

  // If the user is found, return the first row, otherwise return null
  return result.rows.length > 0 ? result.rows[0] : null;
};

export { createUser, findUserByUsername };
