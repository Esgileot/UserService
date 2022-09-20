const UserController = require('../controllers/user-controller');
const { Router } = require('express');

const router = new Router();

router.get('/get-one/:userId', UserController.getOne);
router.get('/get-all', UserController.getAll);


router.post('/create', UserController.create);
router.delete('/delete', UserController.delete);
router.post('/update', UserController.update);

module.exports = router;