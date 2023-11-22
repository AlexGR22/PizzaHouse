const express = require('express');
const router = express.Router();
const checkRoleToken = require('../middlewares/roleAuth');
const { 
    clients,
    verClient,
    deleteClient

} = require('../controllers/clientController');

router.get('/usuarios', checkRoleToken(['admin']), clients);

router.get('/usuarios/actualizar/:id', checkRoleToken(['admin']), verClient);

router.post('/usuarios/eliminar/:id', checkRoleToken(['admin']), deleteClient);

module.exports = router