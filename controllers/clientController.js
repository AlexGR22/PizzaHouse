const Clients = require('../models/userModel');

const clients = async (req, res) => {

    try {
        // Obtener todos los pedidos de la base de datos
        const allClients = await Clients.find({});

        // Imprimir la descripción de cada pedido en la consola si es necesario
        allClients.forEach(client => {
            console.log(client.nombre);
        });

        // Renderizar la página 'orders' con el título y la lista de todos los pedidos
        return res.render('clients', {
            title: 'Listado de Usuarios',
            clients: allClients
        });
    } catch (error) {
        console.log(error);
        res.render('error'); 
    }
}

const verClient = async (req, res) => {
    const { id } = req.params;
    const client = await Clients.findById({ _id: id });
    return res.render('detailClient', {
        title: 'Actualizar Usuario',
        client: client
    });
}

const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar y eliminar el usuario en la base de datos utilizando su ID
        let client = await Clients.findById({ _id: id });

        if (!client) {
            return res.render('error', {
                mensaje: 'Usuario no encontrado',
            });
        }if (client.role === 'admin') {
            return res.render('error', {
                mensaje: 'No se puede eliminar un usuario administrador',
            });
        }

        client = await Clients.findByIdAndDelete({ _id: id });

        console.log(`El Cliente ${client.nombre} fue eliminado`);
        // Redirigir a la página de usuarios
        return res.redirect('/usuarios');

    } catch (error) {
        console.log(error);
        return res.render('error');
    }
};

module.exports = {
    clients,
    verClient,
    deleteClient
}