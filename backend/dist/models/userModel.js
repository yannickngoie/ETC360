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
exports.findUserByUsername = exports.createUser = void 0;
// Import your PostgreSQL connection pool
const db_1 = __importDefault(require("./db"));
// Create a new user in the database
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    yield db_1.default.query(query, [username, password]);
});
exports.createUser = createUser;
// Find a user by username
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = yield db_1.default.query(query, [username]);
    // If the user is found, return the first row, otherwise return null
    return result.rows.length > 0 ? result.rows[0] : null;
});
exports.findUserByUsername = findUserByUsername;
