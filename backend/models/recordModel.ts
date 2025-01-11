import express, { Request, Response } from 'express';
import pool from './db';

// Interface for the Record data
interface RecordData {
  title: string;
  description: string;
  barcode: string;
}

// Create a new record
const createRecord = async (title: string, description: string, barcode: string): Promise<any> => {
  const query = 'INSERT INTO records (title, description, barcode, updated_at) VALUES ($1, $2, $3, NOW())';
  return pool.query(query, [title, description, barcode]);
};

// Get all records
const getRecords = async (): Promise<any[]> => {
  const query = 'SELECT * FROM records ORDER BY updated_at DESC';
  const result = await pool.query(query);
  return result.rows;
};

// Update an existing record
const updateRecord = async (
  id: number,
  title: string,
  description: string,
  barcode: string
): Promise<any> => {
  const query = 'UPDATE records SET title = $1, description = $2, barcode = $3, updated_at = NOW() WHERE id = $4';
  return pool.query(query, [title, description, barcode, id]);
};

// Delete a record
const deleteRecord = async (id: number): Promise<any> => {
  const query = 'DELETE FROM records WHERE id = $1';
  return pool.query(query, [id]);
};

// Synchronize multiple records (batch insert)
// const synchRecord = async (req: Request, res: Response): Promise<void> => {
//   // Type assertion to ensure TypeScript recognizes the body as an array of RecordData
//   const dataArray: RecordData[] = req.body; // Array of objects from the client

//   if (!Array.isArray(dataArray) || dataArray.length === 0) {
//     return res.status(400).send({ error: 'Invalid input. Provide a non-empty array of objects.' });
//   }

//   const query = `
//     INSERT INTO records (column1, column2, column3)
//     VALUES ($1, $2, $3)
//   `;

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN'); // Start a transaction

//     // Iterate over the array and insert each record into the database
//     for (const item of dataArray) {
//       const { column1, column2, column3 } = item;
//       await client.query(query, [column1, column2, column3]);
//     }

//     await client.query('COMMIT'); // Commit the transaction
//     res.status(200).send({ message: 'Data inserted successfully!' });
//   } catch (error) {
//     await client.query('ROLLBACK'); // Rollback in case of error
//     console.error('Error inserting data:', error);
//     res.status(500)
export { createRecord, getRecords, updateRecord, deleteRecord}
