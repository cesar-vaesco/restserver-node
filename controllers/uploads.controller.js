const path = require('path');
const fs = require('fs');

const { response } = require("express");

const { subirArchivo } = require('../helpers/subir-archivo');

const { Usuario, Producto } = require('../models');


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

    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}
