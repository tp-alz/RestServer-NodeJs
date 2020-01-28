# Servidor RESTful con NodeJS

## Descripción
 
Esta aplicación levanta una micro api bajo el framework de express con el objetivo de realizar operaciones CRUD para usuarios en conjunto con una base en linea o local.

(las peticiones http fueron realizadas bajo el software postman.)


## Archivos

Server.js: Contiene la configuracion del servidor.

config/config.js: Contiene la configuracion del puerto y la base de datos.

models/usuario.js: Contiene el modelo mongoose del usuario es decir sus atributos disponibles, tambien posee validacion para los roles.

routes/usuario.js: Contiene las rutas para el CRUD de usuario.


## Settings

Instalación de paquetes via npm

```
npm install
```

Ejecución en consola

```
nodemon start
```
