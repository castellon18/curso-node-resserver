//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, request } = require("express");
//Importaciones de funsiones ubicadios en otras carpetas
const { Product } = require('../models')

//---------------------------ELABORACION DE FUNSIONES FLECHAS---------------------------//

const obtenerProductos = async( req = request, res = response ) => {

    const query = { stateProduct : true};
    const { limit = 5, since = 0 } = req.query;

    const [ total, products ] = await Promise.all( [
        Product.countDocuments(query),
        Product.find(query)
        .populate('fkUserId', 'nameUser')
        .skip(Number(since))
        .limit(Number(limit))
    ] );

    res.status(400).json({
        total,
        products
    })
}

const obtenerProductoPorId = async(req = request, res = response) => {

    const { id } = req.params.id;

    const product = await Product.findById( id ).populate( 'fkUserId', 'nameUser' );

    res.json( product );
}

const crearProducto = async(req = request, res = response) => {    

    const nameProduct = req.body.nameProduct.toUpperCase();

    const productDB = await Product.findOne({ nameProduct });

    if( productDB ) {
        return res.status(400).json({
            msg: `El Producto ${productDB.nameProduct} ya Existe`
        });
    }

    //Generar la Data a Guardar
    const data = {
        nameProduct,
        fkUserId: req.user._id
    }

    const product = new Product( data );
    
    //Guardar en BD
    await product.save();

    res.status(201).json( product );
    
}

const actualizarProducto = async(req = request, res = response) => {

    const { id } = req.params;

    const {stateProduct, fkUserId, ...data} = req.body;
    
    data.nameProduct = data.nameProduct.toUpperCase();
    
    data.fkUserId = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new: true} );
   
    res.status(200).json( product );
}

const borrarProducto = async(req = request, res = response) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, {stateProduct: false}, {new: true});

    res.status(200).json( product );
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    borrarProducto
}