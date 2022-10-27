const { Router } = require('express');

const apiController = require('../controllers/api');

const router = Router();

router.get('/users', apiController.findAll);

router.get('/users/active', apiController.findAllUserActive);

router.get('/users/clearchecked', apiController.clearChecked);

router.post('/users', apiController.create);

router.put('/users/:id', apiController.update);

router.put('/users/:id/status', apiController.updateByField);

router.delete('/users/:id', apiController.delete);

module.exports = router;
