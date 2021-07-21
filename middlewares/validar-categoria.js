const { Categoria } = require("../models");


const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error(`La categoria con el id ${id} no existe!!`)
    }
}




/*
const existeUsuarioPorId = async (id) => {

    //Verificar si el usuario con el  existencia
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con el id ${id} no existe!!`)
    }
}
*/

module.exports = {
    existeCategoriaPorId
}
