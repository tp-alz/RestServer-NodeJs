// ====================
// Puerto
// ====================
process.env.PORT = process.env.PORT || 3000;

// ====================
// Base de Datos
// ====================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';//conexion local
} else {
    urlDB = 'mongodb+srv://cafe-user:VtYmPKmzZlQOs0Oh@cluster0-3ub6d.gcp.mongodb.net/cafe' //conexion online db
}

process.env.URLDB = urlDB;