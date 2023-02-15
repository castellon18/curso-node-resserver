//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, request } = require("express");
//Importaciones de funsiones ubicadios en otras carpetas
const { Category } = require('../models')

//---------------------------ELABORACION DE FUNSIONES FLECHAS---------------------------//

const obtenerCategorias = async( req = request, res = response ) => {

    const query = { stateCategory : true};
    const { limit = 5, since = 0 } = req.query;

    const [ total, categorys ] = await Promise.all( [
        Category.countDocuments(query),
        Category.find(query)
        .populate('fkUserId', 'nameUser')
        .skip(Number(since))
        .limit(Number(limit))
    ] );

    res.status(400).json({
        total,
        categorys
    })
}

const obtenerCategoriaPorId = async(req = request, res = response) => {

    const { id } = req.params.id;

    const category = await Category.findById( id ).populate( 'fkUserId', 'nameUser' );

    res.json( category );
}

const crearCategotia = async(req = request, res = response) => {    

    const nameCategory = req.body.nameCategory.toUpperCase();

    const categoryDB = await Category.findOne({ nameCategory });

    if( categoryDB ) {
        return res.status(400).json({
            msg: `La Categoria ${categoryDB.nameCategory} ya Existe`
        });
    }

    //Generar la Data a Guardar
    const data = {
        nameCategory,
        fkUserId: req.user._id
    }

    const category = new Category( data );
    
    //Guardar en BD
    await category.save();

    res.status(201).json( category );
    
}

const actualizarCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const {stateCategory, fkUserId, ...data} = req.body;
    
    data.nameCategory = data.nameCategory.toUpperCase();
    
    data.fkUserId = req.user._id;

    const category = await Category.findByIdAndUpdate( id, data, { new: true} );
   
    res.status(200).json( category );
}

const borrarCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate( id, {stateCategory: false}, {new: true});

    res.status(200).json( category );
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    
    crearCategotia,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCategoria
}