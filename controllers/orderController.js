const Pedido = require ('../models/orderModel');

const order = async (req, res) => {

    try{
        const allOrders = await Pedido.find({});

        allOrders.forEach(order => {
            console.log(order.description);
        });

        return res.render('orders', {
            title: 'Listado de pedidos',
            orders: allOrders
        });
    }catch(error){
        console.log(error);
        res.render('error');
    }
}

const detailOrder = async (req, res) => {

    const { id } = req.params;

    try {

        let order = await Pedido.findById({ _id: id });

        console.log(req.params);

        return res.render('detailsOrder', {
            title: 'Pedido Realizado',
            order: order
        });
    } catch (error) {
        console.log(error);
        return res.render('error');
    }
}



const addOrder = async (req, res) => {

    const { name, description, orderedAt } = req.body;
    console.log(`1. nombre ${name} - 2. descripcion ${description}`);


    try {

        let existingProduct = await Pedido.findOne({ name });

        if (existingProduct) {
            console.log('comprobando si existe el producto');
            return res.render('error', {
                mensaje: 'Ya tienes un pedido pendiente',
            });
        }

        let newOrder =  new Pedido({
            name,
            description,
            orderedAt
        });

        await newOrder.save();

        return await res.render('clientOrder', {
            title: 'Pedidos Realizado',
            order: newOrder,
        });
    } catch (error) {
        console.log(error);
        return res.render('error');
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

      
    try {
      let order = await Pedido.findByIdAndDelete({ _id: id });
  
      if (!order) {
        return res.render('error', {
          mensaje: 'Producto no encontrado',
        });
      }
      
    console.log(`El pedido ${order.name} fue eliminado`);

      return res.redirect('/pedidos');
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
