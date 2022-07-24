const { Router } = require('express');

const postController = require('../controllers/postController');

const router = Router();

router.post('/', postController.create);

router.get('/', postController.getAll);

module.exports = router;