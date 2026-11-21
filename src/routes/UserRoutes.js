const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/user/:id', UserController.getById);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;