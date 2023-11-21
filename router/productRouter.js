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

     
router.get('/productos', products);

router.get('/productos/new',checkRoleToken(['admin']), formProducts);

router.get('/cliente/productos',checkRoleToken(['user','admin']), clientProducts);

router.get('/productos/:id',checkRoleToken(['user','admin']), detailsProduct);

router.get('/editar/:id',checkRoleToken(['admin']), editProduct);

router.get('/admin/productos',checkRoleToken(['admin']), adminProducts);

router.post('/productos', addProducts);

router.post('/editar/:id',checkRoleToken(['admin']), updateProduct);

router.post('/eliminar/:id',checkRoleToken(['admin']), deleteProduct);

module.exports = router;   