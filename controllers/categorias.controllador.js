const { response } = require("express");
const { Categoria } = require('../models')


//Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
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

//Actualizar categoria para

//Borrar(cambiar estado de la categoria) categoria




module.exports = {

    crearCategoria,
    obtenerCategorias,
}
