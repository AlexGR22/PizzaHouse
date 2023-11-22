const Pedido = require('../models/orderModel');

// Función para obtener y renderizar todos los pedidos
const order = async (req, res) => {

    try {
        // Obtener todos los pedidos de la base de datos
        const allOrders = await Pedido.find({});

        // Imprimir la descripción de cada pedido en la consola si es necesario
        // allOrders.forEach(order => {
        //     console.log(order.description);
        // });

        // Renderizar la página 'orders' con el título y la lista de todos los pedidos
        return res.render('orders', {
            title: 'Listado de pedidos',
            orders: allOrders
        });
    } catch (error) {
        console.log(error);
        res.render('error'); 
    }
}
 
// Función para obtener y renderizar los detalles de un pedido específico
const detailOrder = async (req, res) => {

    const { id } = req.params;

    try {
        // Buscar el pedido en la base de datos utilizando su ID
        let order = await Pedido.findById({ _id: id });

        // Renderizar la página 'detailsOrder' con el título y los detalles del pedido encontrado
        return res.render('detailsOrder', {
            title: 'Pedido Realizado',
            order: order
        });
    } catch (error) {
        console.log(error);
        return res.render('error');
    }
}


// Función para agregar un nuevo pedido
const addOrder = async (req, res) => {

    const { name, email, description, orderedAt } = req.body;
    console.log(`1. el usuario ${name} esta agregando un nuevo pedido - 2. descripcion: ${description}`);


    try {
        // Verificar si ya existe un pedido con el mismo nombre en la base de datos
        let existingProduct = await Pedido.findOne({ email });

        if (existingProduct) {
            console.log('comprobando si existe el producto');
            return res.render('error', {
                mensaje: 'Ya tienes un pedido pendiente,y es el limite de pedidos por usuario',
            });
        }

        // Crear un nuevo pedido con los datos proporcionados
        let newOrder = new Pedido({
            name,
            email,
            description,
            orderedAt
        });

        await newOrder.save();

        // Renderizar la página 'clientOrder' con el título y los detalles del nuevo pedido
        return await res.render('clientOrder', {
            title: 'PEDIDO REALIZADO CON EXITO',
            order: newOrder,
        });
    } catch (error) {
        // Manejar el error en caso de que no se pueda agregar el pedido
        console.log(error);
        return res.render('error');
    }
}

// Función para eliminar un pedido
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar y eliminar el pedido en la base de datos utilizando su ID
        let order = await Pedido.findByIdAndDelete({ _id: id });

        if (!order) {
            return res.render('error', {
                mensaje: 'Producto no encontrado',
            });
        }

        console.log(`El pedido ${order.name} fue eliminado`);

        // Redirigir a la página de pedidos
        return  res.render('orders', {
            title: 'Orden eliminada',
        });
    } catch (error) {
        console.log(error);
        return res.render('error');
    }
};



module.exports = {
    order,
    addOrder,
    detailOrder,
    deleteOrder
}
