const { Router } = require('express');

const userController = require('../controllers/userController');
const validateToken = require('../middleware/token');

const router = Router();

router.post('/', userController.create);

router.get('/', validateToken, userController.getAll);

router.get('/:id', validateToken, userController.getById);

router.delete('/:id', validateToken, userController.delete);

module.exports = router;