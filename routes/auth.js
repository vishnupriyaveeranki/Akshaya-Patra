const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController.js');

// Server-side API routes for authentication
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Optional: Add token verification route
router.post('/verify-token', authController.verifyToken);

module.exports = router;
