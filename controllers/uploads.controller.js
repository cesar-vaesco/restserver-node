const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');

// Cargar archivo
const cargarArchivo = async (req, res = response) => {

    /* if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir.' });
        return;
    } */

    try {
        const nombre = await subirArchivo(req.files, undefined, 'img');
        res.json({ nombre });
    } catch (msg) {

        res.status(400).json({ msg });

    }

}

//Actualizar imagen
const actualizarImagen = async (req, res = response) => {

    /*     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            res.status(400).json({ msg: 'No hay archivos que subir.' });
            return;
        } */

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id:  ${id}` })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id: ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
    }

    // Limpiar imagenes previas
    try {

        if (modelo.img) {
            // Borrar la imagen del servidor el producto
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

    } catch (error) {

        res.status(500).json({
            msg: `Error al borrar ${modelo.img}`
        })

    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}


const actualizarImagenCloudinary = async (req, res = response) => {

    /*     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            res.status(400).json({ msg: 'No hay archivos que subir.' });
            return;
        } */

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id:  ${id}` })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id: ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
    }

    // Limpiar imagenes previas
    try {

        if (modelo.img) {
            // Borrar la imagen del servidor el producto
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');

            /* console.log(public_id) */
            await cloudinary.uploader.destroy(public_id);

        }

        /* console.log(req.files.archivo); */
        const { tempFilePath } = req.files.archivo;
        /* const resp = await cloudinary.uploader.upload(tempFilePath); */
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();

        res.json(modelo);

    } catch (error) {

        res.status(500).json({
            msg: `Error al borrar ${modelo.img}`
        })

    }


    /* const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save(); */


}


// Mostrar imagen
const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id:  ${id}` })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id: ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' })
    }

    // Limpiar imagenes previas
    try {

        if (modelo.img) {
            // Borrar la imagen del servidor el producto
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }

    } catch (error) {

        res.status(500).json({
            msg: `Error al borrar ${modelo.img}`
        })

    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);

    /* res.json({
        msg: 'Falta el placelholder',

    }); */
}



module.exports = {

    actualizarImagenCloudinary,
    actualizarImagen,
    cargarArchivo,
    mostrarImagen,
}
