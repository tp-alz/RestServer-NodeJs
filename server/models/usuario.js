const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

//roles que pueden ser utilizados
let rolesValidos = {
    values: ['ADMIN_ROLE', "USER_ROLE"],
    message: '{VALUE} no es un rol válido'
};

//esquemas (modelos)
let Schema = mongoose.Schema;

//atributos del usuario
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos //validacion de roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    goole: {
        type: Boolean,
        default: false
    }
});

//convertis usuario en objeto
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}

//validacion
usuarioSchema.plugin(uniqueValidator);

//exportar usuario
module.exports = mongoose.model('Usuario', usuarioSchema);