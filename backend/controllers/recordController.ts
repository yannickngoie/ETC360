import { Request, Response } from 'express';
import { createRecord, getRecords, updateRecord, deleteRecord } from '../models/recordModel';

// Add a record
export const addRecord = async (req: Request, res: Response): Promise<void> => {
  const { title, description, barcode } = req.body;

  
  if (!title || !description || !barcode) {
     res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await createRecord(title, description, barcode);
    res.status(201).json({ message: 'Record added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add record' });
  }
};

// Fetch all records
export const fetchRecords = async (req: Request, res: Response): Promise<void> => {
  try {
    const records = await getRecords();
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
};

// Edit a record (no user association)
export const editRecord = async (req: Request, res: Response): Promise<void> => {
  const { id, title, description, barcode } = req.body;

  if (!id || !title || !description || !barcode) {
     res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await updateRecord(id, title, description, barcode);
   res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Failed to update record' });
  }
};

// Remove a record (no user association)
export const removeRecord = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: 'ID is required' });
  }

  try {
    await deleteRecord(id);
     res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error(error);
     res.status(500).json({ message: 'Failed to delete record' });
  }
};
