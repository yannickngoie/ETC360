"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRecord = exports.editRecord = exports.fetchRecords = exports.addRecord = void 0;
const recordModel_1 = require("../models/recordModel");
// Add a record
const addRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, barcode } = req.body;
    if (!title || !description || !barcode) {
        res.status(400).json({ message: 'All fields are required' });
    }
    try {
        yield (0, recordModel_1.createRecord)(title, description, barcode);
        res.status(201).json({ message: 'Record added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add record' });
    }
});
exports.addRecord = addRecord;
// Fetch all records
const fetchRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, recordModel_1.getRecords)();
        res.status(200).json(records);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch records' });
    }
});
exports.fetchRecords = fetchRecords;
// Edit a record (no user association)
const editRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, description, barcode } = req.body;
    if (!id || !title || !description || !barcode) {
        res.status(400).json({ message: 'All fields are required' });
    }
    try {
        yield (0, recordModel_1.updateRecord)(id, title, description, barcode);
        res.status(200).json({ message: 'Record updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update record' });
    }
});
exports.editRecord = editRecord;
// Remove a record (no user association)
const removeRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ message: 'ID is required' });
    }
    try {
        yield (0, recordModel_1.deleteRecord)(id);
        res.status(200).json({ message: 'Record deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete record' });
    }
});
exports.removeRecord = removeRecord;
