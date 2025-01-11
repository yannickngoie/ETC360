"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordController_1 = require("../controllers/recordController");
const router = express_1.default.Router();
router.post('/add', recordController_1.addRecord);
router.get('/all', recordController_1.fetchRecords);
router.put('/edit', recordController_1.editRecord);
router.delete('/delete', recordController_1.removeRecord);
exports.default = router;
module.exports = router;
