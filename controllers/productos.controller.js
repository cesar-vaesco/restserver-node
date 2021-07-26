const { response } = require("express");
const { Producto } = require("../models");




//Obtener Producto - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })
}


//Obtener Producto - - populate { regresa el objeto de Producto}
const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;



    /* console.log(req); */

    const producto = await Producto.findById(id)
    if (producto.estado === false) {
        return res.status(404).json({
            msg: 'El producto no existe en la base de datos'
        })
    }

    producto.populate('usuario', 'nombre')
        .populate('categoria', 'nombre');



    res.json(producto);

}


const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;


    const productoDB = await Producto.findOne({ nombre:body.nombre });

    console.log(productoDB);

    if (productoDB === true) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar la
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
};


//Actualizar Producto
const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//Borrar(cambiar estado de la producto) producto
const borrarProducto = async (req, res = response) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(productoBorrado);
}



/* const crearProducto = async (req, res = response) => {
    res.json('POST - Crear producto');
}
 */
module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos
}
