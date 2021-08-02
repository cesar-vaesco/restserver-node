const { Categoria, Role, Usuario, Producto } = require("../models");
/* const Role = require("../models/role");
const Usuario = require("../models/usuario"); */



const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos!!`)
    }
}

const emailExiste = async (correo = '') => {

    //Verificar si el correo existencia
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado!!`)
    }
}

const existeUsuarioPorId = async (id) => {

    //Verificar si el usuario con el  existencia
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con el id ${id} no existe!!`)
    }
}

/*
* Validando existencia de categorias
 */
const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe!!`)
    }
}

const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error(`El id ${id} no existe!!`)
    }
}
// Validar colecciones permitidas

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida - permitidas: ${colecciones}`)
    }
    return true;
}

module.exports = {
    coleccionesPermitidas,
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
