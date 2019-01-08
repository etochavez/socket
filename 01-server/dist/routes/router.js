"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.get("/messages", (req, res) => {
    res.json({
        error: false,
        message: "All its ok"
    });
});
exports.router.post("/messages", (req, res) => {
    res.json({
        error: false,
        message: "POST ready"
    });
});
