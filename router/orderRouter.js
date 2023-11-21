const express = require('express');
const router = express.Router();
const checkRoleToken = require('../middlewares/roleAuth');
const {
    order,
    addOrder,
    detailOrder,
    deleteOrder
} = require('../controllers/orderController');

router.get('/pedidos',checkRoleToken(['admin']), order);

router.get('/pedidos/:id',checkRoleToken(['admin']), detailOrder);

router.post('/pedidos',checkRoleToken(['user','admin']), addOrder);

router.post('/pedidos/:id',checkRoleToken(['admin']), deleteOrder);


module.exports = router