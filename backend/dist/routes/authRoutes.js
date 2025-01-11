"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authRoutes = (0, express_1.Router)();
// Public routes
authRoutes.post('/register', authController_1.register);
authRoutes.post('/login', authController_1.login);
// Example of a protected route
authRoutes.get('/protected', authMiddleware_1.default, (req, res) => {
    var _a;
    res.json({ message: `Hello, ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username}! You have access.` });
});
exports.default = authRoutes;
