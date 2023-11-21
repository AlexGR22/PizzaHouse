
const Producto = require('../models/productModel');
const DeletedProduct = require('../models/deletedProductModel');

const products = async (req, res) => {
    try {

        const allProducts = await Producto.find({});

        allProducts.forEach(product => {
            console.log(product.name);
        })

        return res.render('products', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        res.render('error');
    }

}

const clientProducts = async (req, res) => {
    try {
        const allProducts = await Producto.find({});
        return res.render('clientProducts', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}

const adminProducts = async (req, res) => {
    try {
        const allProducts = await Producto.find({});
        return res.render('adminProducts', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        res.render('error');
    }
}

const formProducts = (req, res) => {
    res.render('addProducts');
}

const detailsProduct = async (req, res) => {

    const { id } = req.params;

    try {

        let product = await Producto.findById({ _id: id });

        console.log(req.params);

        return res.render('detailsProduct', {
            title: 'Listado de Productos',
            product: product
        });
    } catch (error) {
        console.log(error);
        return res.render('error');
    }
}

const addProducts = async (req, res) => {

    const { name, price, imageUrl, description } = req.body;
    console.log(`1. nombre ${name} - precio ${price} - stock  - descripcion ${description}`);


    try {

        let existingProduct = await Producto.findOne({ name });

        if (existingProduct) {
            console.log('comprobando si existe el producto');
            return res.render('error', {
                mensaje: 'Ya existe un producto con el mismo nombre',
            });
        }

        let newProduct =  new Producto({
            name,
            price,
            description,
            imageUrl,
        });

        await newProduct.save();

        const allProducts = await Producto.find({});

        return await res.render('adminProducts', {
            title: 'Listado de Productos',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        return res.render('error');
    }
}


const editProduct = async (req, res) => {
    const { id } = req.params;

    let product = await Producto.findById({ _id: id });

    console.log(product);

    return res.render('editProduct',{
        product: product
    });
}


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
        return res.redirect('/admin/productos');

    } catch (error) {
        console.log(error);
        return res.render('error');
    }

 

}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

      
    try {
      let product = await Producto.findByIdAndDelete({ _id: id });
  
      if (!product) {
        return res.render('error', {
          mensaje: 'Producto no encontrado',
        });
      }
        // Guarda el producto eliminado en la base de datos
        const deletedProduct = new DeletedProduct({
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            description: product.description,
          });
      
          await deletedProduct.save();
      
          console.log(`El producto ${product.name} fue eliminado`);
  
   
  
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