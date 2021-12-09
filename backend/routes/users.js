const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/users');

userRoutes.get('/users', userController.getAll);
userRoutes.get('/users/:userId', userController.get);
userRoutes.put('/users/:userId', userController.put);
userRoutes.delete('/users/:userId', userController.delete);

module.exports = userRoutes;
