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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.getRecords = exports.createRecord = void 0;
const db_1 = __importDefault(require("./db"));
// Create a new record
const createRecord = (title, description, barcode) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO records (title, description, barcode, updated_at) VALUES ($1, $2, $3, NOW())';
    return db_1.default.query(query, [title, description, barcode]);
});
exports.createRecord = createRecord;
// Get all records
const getRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM records ORDER BY updated_at DESC';
    const result = yield db_1.default.query(query);
    return result.rows;
});
exports.getRecords = getRecords;
// Update an existing record
const updateRecord = (id, title, description, barcode) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'UPDATE records SET title = $1, description = $2, barcode = $3, updated_at = NOW() WHERE id = $4';
    return db_1.default.query(query, [title, description, barcode, id]);
});
exports.updateRecord = updateRecord;
// Delete a record
const deleteRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'DELETE FROM records WHERE id = $1';
    return db_1.default.query(query, [id]);
});
exports.deleteRecord = deleteRecord;
