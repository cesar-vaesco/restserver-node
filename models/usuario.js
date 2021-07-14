
const { Schema, model } = require('mongoose');

const UsuariosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuariosSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

// Se exporta el modelo de nombre UsuariosSchema y se define el nombre de la colección la cual se llamara Usuario
module.exports = model('Usuario', UsuariosSchema);
