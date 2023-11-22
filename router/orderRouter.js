const express = require('express');
const router = express.Router();
const checkRoleToken = require('../middlewares/roleAuth');
const {
    order,
    addOrder,
    detailOrder,
    deleteOrder
} = require('../controllers/orderController');

// Ruta para obtener todos los pedidos (solo accesible para usuarios con rol 'admin')
router.get('/pedidos', checkRoleToken(['admin']), order);

// Ruta para obtener los detalles de un pedido específico (solo accesible para usuarios con rol 'admin')
router.get('/pedidos/:id', checkRoleToken(['admin']), detailOrder);

// Ruta para agregar un nuevo pedido (accesible para usuarios con rol 'user' o 'admin')
router.post('/pedidos', checkRoleToken(['user', 'admin']), addOrder);

// Ruta para eliminar un pedido existente (solo accesible para usuarios con rol 'admin')
router.post('/delete-pedido/:id', checkRoleToken(['admin']), deleteOrder);
router.delete('/delete-pedido/:id', checkRoleToken(['admin']), deleteOrder);


module.exports = router