const { response } = require("express");
const { Categoria } = require('../models')


//Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    })
}

//Obtener categoria - - populate { regresa el objeto de categoria}
const obtenerCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    /* console.log(id); */

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json(categoria);

}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar la
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
};

//Actualizar categoria
const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}


//Borrar(cambiar estado de la categoria) categoria
const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(categoriaBorrada);
}



module.exports = {

    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
}
