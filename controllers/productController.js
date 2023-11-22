const Producto = require('../models/productModel');
const DeletedProduct = require('../models/deletedProductModel');
const Clientes = require('../models/userModel');
const { verifyJWT } = require('../helpers/handleJwt');

// Función para obtener y renderizar todos los productos en la página de administrador
const products = async (req, res) => {
    try {
        // Obtener todos los productos de la base de datos
        const allProducts = await Producto.find({});
        
        // allProducts.forEach(product => {
        //     console.log(product.name);
        // })


        // Renderizar la página 'products' con los productos obtenidos
        return res.render('products', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        res.render('error');
    }

}

// Función para obtener y renderizar todos los productos en la página de cliente
const clientProducts = async (req, res) => {

    const token = req.cookies.token;
    const verifyToken = await verifyJWT(token);
    const userDetail = await Clientes.findById(verifyToken._id);    
    console.log(`el usuario ${userDetail.nombre} se encuentra por realizar un pedido`);

    try {
        // Obtener todos los productos de la base de datos
        const allProducts = await Producto.find({});
        // Renderizar la página 'clientProducts' con los productos obtenidos
        return res.render('clientProducts', {
            title: 'Listado de Productos',
            products: allProducts,
            user: userDetail
        });
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}

// Función para obtener y renderizar todos los productos en la página de administrador de productos
const adminProducts = async (req, res) => {
    try {
        // Obtener todos los productos de la base de datos
        const allProducts = await Producto.find({});

        // Renderizar la página 'adminProducts' con los productos obtenidos
        return res.render('adminProducts', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}

//Función para renderizar el formulario de agregar productos
const formProducts = (req, res) => {
    res.render('addProducts');
}

// Función para obtener y renderizar la descripción de un producto específico
const detailsProduct = async (req, res) => {

    const { id } = req.params;

    try {
        // Buscar el producto en la base de datos utilizando su ID
        let product = await Producto.findById({ _id: id });

        // Renderizar la página 'detailsProduct' con los detalles del producto obtenido
        return res.render('detailsProduct', {
            title: 'Descripción del Producto',
            product: product
        });
    } catch (error) {
        // Manejar el error en caso de que no se encuentre el producto
        console.log(error);
        return res.render('error');
    }
}

// Función para agregar un nuevo producto
const addProducts = async (req, res) => {

    const { name, price, imageUrl, description } = req.body;
    console.log(`Agregando. nombre ${name} - precio ${price} - stock  - descripcion ${description}`);


    try {
        // Verificar si ya existe un producto con el mismo nombre en la base de datos
        let existingProduct = await Producto.findOne({ name });

        if (existingProduct) {
            console.log('comprobando si existe el producto');
            return res.render('error', {
                mensaje: 'Ya existe un producto con el mismo nombre',
            });
        }

        // Crear un nuevo objeto de producto con los datos proporcionados
        let newProduct =  new Producto({
            name,
            price,
            description,
            imageUrl,
        });

        // Guardar el nuevo producto en la base de datos
        await newProduct.save();

        // Obtener todos los productos actualizados de la base de datos
        const allProducts = await Producto.find({});

        // Renderizar la página 'adminProducts' con los productos actualizados
        return await res.render('adminProducts', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        // Manejar el error en caso de que no se pueda agregar el nuevo producto
        console.log(error);
        return res.render('error');
    }
}


// Función para obtener y renderizar los detalles de un producto específico para editar
const editProduct = async (req, res) => {
    const { id } = req.params;

    let product = await Producto.findById({ _id: id });

    console.log(product);

    return res.render('editProduct',{
        product: product
    });
}

// Función para actualizar un producto existente
const updateProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        const productEdit = req.body
        
        let productUpdated = await Producto.findByIdAndUpdate({ _id: id}, productEdit );
        console.log(productUpdated);

        // return res.render('updateProduct',{
        //    mensaje: 'el producto fue actualizado',
        //    product: productUpdated
        // });

        // Redirigir a la página de administración de productos
        return res.redirect('/admin/productos');

    } catch (error) {
        // Manejar el error en caso de que no se pueda actualizar el producto
        console.log(error);
        return res.render('error');
    }

 

}

// Función para eliminar un producto
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
         // Buscar y eliminar el producto en la base de datos utilizando su ID
        let product = await Producto.findByIdAndDelete({ _id: id });
  
        if (!product) {
            return res.render('error', {
            mensaje: 'Producto no encontrado',
            });
        }
        // Guarda el producto eliminado en la base de datos "deletedProducts"
        const deletedProduct = new DeletedProduct({
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
        });
    
        await deletedProduct.save(); 
        console.log(`El producto ${product.name} fue eliminado`);

        // Redirigir a la página de administración de productos
        return res.redirect('/admin/productos');
    } catch (error) {
      console.log(error);
      return res.render('error');
    }
  };

module.exports = {
    addProducts,
    formProducts,
    products,
    detailsProduct,
    updateProduct,
    editProduct,
    deleteProduct,
    clientProducts,
    adminProducts
} 