const express = require('express');
const router = express.Router();
const checkRoleToken = require('../middlewares/roleAuth');
const {
    products,
    formProducts, 
    addProducts, 
    detailsProduct, 
    updateProduct, 
    editProduct, 
    deleteProduct, 
    clientProducts, 
    adminProducts
     } = require('../controllers/productController');

     
// Ruta para obtener todos los productos
router.get('/productos', products);

// Ruta para mostrar el formulario de creación de productos (solo accesible para usuarios con rol 'admin')
router.get('/productos/new', checkRoleToken(['admin']), formProducts);

// Ruta para obtener los productos disponibles para clientes (accesible para usuarios con rol 'user' o 'admin')
router.get('/cliente/productos', checkRoleToken(['user', 'admin']), clientProducts);

// Ruta para obtener los detalles de un producto específico (accesible para usuarios con rol 'user' o 'admin')
router.get('/productos/:id', detailsProduct);

// Ruta para mostrar el formulario de edición de un producto (solo accesible para usuarios con rol 'admin')
router.get('/editar/:id', checkRoleToken(['admin']), editProduct);

// Ruta para ver,actualizar o eliminar productos (solo accesible para usuarios con rol 'admin')
router.get('/admin/productos', checkRoleToken(['admin']), adminProducts);

// Ruta para agregar un nuevo producto
router.post('/productos', checkRoleToken(['admin']), addProducts);

// Ruta para actualizar un producto existente (solo accesible para usuarios con rol 'admin')
router.post('/editar/:id', checkRoleToken(['admin']), updateProduct);
router.put('/editar/:id', checkRoleToken(['admin']), updateProduct);

// Ruta para eliminar un producto existente (solo accesible para usuarios con rol 'admin')
router.delete('/eliminar/:id', checkRoleToken(['admin']), deleteProduct);
// router.post('/eliminar/:id', checkRoleToken(['admin']), deleteProduct);


module.exports = router;   