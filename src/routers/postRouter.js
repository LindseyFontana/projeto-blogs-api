const { Router } = require('express');

const postController = require('../controllers/postController');

const router = Router();

router.post('/', postController.create);

router.get('/search', postController.search);

router.get('/:id', postController.getById);

router.get('/', postController.getAll);

router.put('/:id', postController.update);

router.delete('/:id', postController.delete);

module.exports = router;