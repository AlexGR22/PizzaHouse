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

La aplicación cuenta con una ruta para que los usuarios inicien sesión en sus cuentas. Para iniciar sesión, se deben proporcionar los siguientes campos:

- Correo electrónico: Dirección de correo electrónico asociada a la cuenta del usuario.
- Contraseña: Contraseña para la cuenta del usuario.

El proceso de inicio de sesión incluye las siguientes etapas:

1. Verificación de credenciales: Cuando el usuario envía el formulario de inicio de sesión, se verifican las credenciales proporcionadas. Se comprueba si el correo electrónico y la contraseña coinciden con los registros almacenados en la base de datos.

2. Generación de token de acceso: Si las credenciales son válidas, se genera un JSON Web Token (JWT) que se utiliza para autenticar al usuario en las solicitudes siguientes. El token contiene información de identificación del usuario y tiene una firma digital para garantizar su autenticidad.

3. Redirección o respuesta con el token: Dependiendo de la implementación específica, el usuario puede ser redirigido a una página de inicio de sesión exitoso o se puede devolver el token como respuesta en el cuerpo de la respuesta HTTP. Este token se puede almacenar en el cliente (por ejemplo, en una cookie) y se utiliza para autenticar las solicitudes posteriores a rutas protegidas.

Para acceder a la ruta de inicio de sesión de usuarios, se debe utilizar la siguiente URL: `/login`.


### Registro de Usuario

La aplicación cuenta con una ruta para registrar nuevos usuarios. Para registrarse, se deben proporcionar los siguientes campos:

- Nombre: Nombre completo del usuario.
- Correo electrónico: Dirección de correo electrónico única para el usuario.
- Contraseña: Contraseña para la cuenta del usuario.

El proceso de registro incluye las siguientes etapas:

1. Verificación de correo electrónico: Antes de registrar un nuevo usuario, se verifica si el correo electrónico ya está registrado en la base de datos. En caso de que el correo electrónico ya esté en uso, se mostrará un mensaje de error indicando que el correo electrónico ya está registrado.

2. Encriptación de contraseña: Antes de almacenar la contraseña en la base de datos, se utiliza un algoritmo de encriptación para asegurar la seguridad de la información del usuario.

3. Guardado del usuario: Una vez que el correo electrónico y la contraseña han sido verificados y encriptados, se crea un nuevo registro de usuario en la base de datos con los datos proporcionados.


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

## Tecnologías Utilizadas

La aplicación utiliza las siguientes tecnologías y herramientas:

- Node.js: un entorno de ejecución de JavaScript en el lado del servidor que permite construir aplicaciones web escalables y de alto rendimiento.
- Express.js: un framework de Node.js utilizado para construir aplicaciones web y APIs de manera rápida y sencilla.
- MongoDB: una base de datos NoSQL orientada a documentos que permite almacenar y recuperar datos de manera eficiente.
- Mongoose: una biblioteca de modelado de objetos de MongoDB para Node.js que proporciona una interfaz sencilla y basada en esquemas para interactuar con la base de datos.
- JSON Web Tokens (JWT): un estándar abierto basado en JSON para crear tokens de acceso que se utilizan para autenticar y autorizar solicitudes entre partes.
- Bcrypt: una biblioteca de hashing para Node.js que se utiliza para encriptar y verificar contraseñas, proporcionando una capa adicional de seguridad.
- Handlebars (HBS): un sistema de plantillas para Node.js que permite generar HTML dinámico utilizando plantillas predefinidas.
- CSS: lenguaje de estilo utilizado para diseñar y dar estilo a la interfaz de usuario de la aplicación.
- GitHub: un servicio de alojamiento de repositorios que permite almacenar y colaborar en el desarrollo de código fuente.
- Render: un servicio de alojamiento y despliegue de aplicaciones web que permite ejecutar aplicaciones en un entorno de producción.
- Mongo Atlas: un servicio de base de datos en la nube que proporciona una forma fácil de configurar, mantener y escalar la base de datos MongoDB.


## Enlaces

- Repositorio de GitHub: [https://github.com/AlexGR22/ProyectoFinalNodeJs](https://github.com/AlexGR22/ProyectoFinalNodeJs)
- Hosting de la Aplicación: [https://proyectoback-ogwl.onrender.com](https://proyectoback-ogwl.onrender.com)

¡Gracias por visitar mi aplicación!


