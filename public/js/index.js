

// function deletePedido(id,url) {
//     if (confirm('¿Estás seguro de eliminar el producto?')) {
//         fetch('/delete-pedido/' + id, {
//             method: 'DELETE'
//         })
//         .then(response => 
//         {
//             console.log('response', response.status);
//             // window.location.href = window.location.href;
//             location.reload()
            
//            // if (response.ok) {
//            //      console.log('El pedido se elimino correctamente');
//            //      window.location.href = window.location.href;
//           //   } else {
//            //      // Mostrar un mensaje de error si la solicitud no se completó correctamente
//           //       console.log('Error al eliminar el pedido');
//            //  }
//         })
//         .catch(error => {
//             // Manejar cualquier error de red u otra excepción
//             console.log('aca error', error);
//         });
//     }
// }

async function deletePedido(id, url) {
    if (confirm('¿Estás seguro de eliminar el producto?')) {
      try {
        const response = await fetch('/delete-pedido/' + id, {
          method: 'DELETE'
        });
        console.log('response', response.status);
        window.location.href = window.location.href;
      } catch (error) {
        console.log('aca error', error);
      }
    }
  } 

  async function deleteProducto(id,url) {
    if (confirm('¿Estás seguro de eliminar el producto?')) {
      try {
        const response = await fetch('/eliminar/' + id, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          console.log('Producto eliminado correctamente');
          window.location.href = window.location.href; // Redirige a la página de productos después de eliminar
        } else {
          console.log('Error al eliminar el producto');
        }
      } catch (error) {
        console.log('Error de red:', error);
      }
    }
  }


