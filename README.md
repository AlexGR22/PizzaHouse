# Pizza House


## Descripción de la aplicación

Esta aplicación es una página de comercio electrónico para una pizzería. Permite a los usuarios explorar el menú de la pizzería y realizar pedidos en línea.

## Características del Backend

El backend de la aplicación tiene las siguientes características:

### Autenticación de Usuario

- Ruta para registrar usuarios: `/registro`
- Campos requeridos: nombre, dirección de correo electrónico y contraseña
- Verificación de disponibilidad de correo electrónico
- Encriptación de contraseñas antes de almacenarlas

### Inicio de Sesión de Usuarios

- Ruta para iniciar sesión: `/login`
- Campos requeridos: correo electrónico y contraseña
- Emisión de JWT (JSON Web Token) en caso de inicio de sesión exitoso

### Middleware de Autenticación

- Implementación de middleware para verificar el JWT proporcionado en las cabeceras de las solicitudes
- Implementación de middleware para verificar el rol del usuario (admin o user) en operaciones sensibles

### Gestión de la Aplicación

- Operaciones CRUD para productos y pedidos
- Visualización de una lista de productos (pizzas) con detalles relevantes, como nombre, descripción, precio y foto
- Rutas específicas para cada operación, incluyendo eliminación de productos/pedidos mediante el uso del ID (solo el admin)

### Gestión de Pedidos

- Ruta para realizar pedidos: `/pedidos`
- Campos requeridos: Usuario (email), descripción del pedido

## Características del Frontend

El frontend de la aplicación incluye las siguientes características:

### Vistas con HBS y CSS

- Uso de elementos y estilos personalizados para reflejar la temática de una pizzería
- Inclusión de imágenes y descripciones de productos (pizzas)

### Funcionalidad y experiencia de usuario

- Interfaz de usuario intuitiva para navegar por el menú, analizar cada producto y realizar pedidos

## Detalles del Proyecto

El proyecto se encuentra en un repositorio de GitHub que contiene todo el código fuente y los archivos necesarios para la aplicación. El repositorio incluye un archivo README que proporciona detalles sobre la aplicación, las herramientas utilizadas y su propósito.

El proyecto también está desplegado y funcionando correctamente en un servidor (render) utilizando Mongo Atlas como base de datos.

## Enlaces

- Repositorio de GitHub: [https://github.com/AlexGR22/ProyectoFinalNodeJs](https://github.com/AlexGR22/ProyectoFinalNodeJs)
- Hosting de la Aplicación: [https://proyectoback-ogwl.onrender.com](https://proyectoback-ogwl.onrender.com)

¡Gracias por utilizar nuestra aplicación!


