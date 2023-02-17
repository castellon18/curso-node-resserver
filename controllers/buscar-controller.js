//---------------------------IMPORTACIONES---------------------------//

//Importaciones de paquetes de dependencias
const { response, request } = require("express");
const { ObjectId } = require( 'mongoose' ).Types;
//Importaciones de funsiones ubicadios en otras carpetas
const { User, Category, Product } = require( '../models' );

//---------------------------DECLARACION DE LA COLECCION---------------------------//

const collectionAllowed = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];


//---------------------------ELABORACION DE FUNSIONES FLECHAS DE BUSQUEDA POR CADA UNA DE LA COLECCION---------------------------//

const buscarUsuarios = async( params = '', res = response ) => {

    const esMongoId = ObjectId.isValid( params );
    if( esMongoId ) {

        const usuario = await User.findById( params );
        return res.json( {
            results: ( usuario ) ? [ usuario ] : []
        } );
    }

    const regex = new RegExp( params, 'i'); //Esta funsion es para hacer una busqueda insencible
    
    const usuario = await User.find( {
        $or: [ { nameUser: regex }, { emailUser: regex } ],
        $and: [{ stateUser: true }]
    } );

    res.json( {
        results: usuario
    } );

}

const buscarCategoria = async( params = '', res = response ) => {

    const esMongoId = ObjectId.isValid( params );
    if( esMongoId ) {

        const categoria = await Category.findById( params );
        return res.json( {
            results: ( categoria ) ? [ categoria ] : []
        } );
    }

    const regex = new RegExp( params, 'i'); //Esta funsion es para hacer una busqueda insencible
    
    const categoria = await Category.find( { nameCategory: regex, stateCategory: true } );

    res.json( {
        results: categoria
    } );

}

const buscarProducto = async( params = '', res = response ) => {

    const esMongoId = ObjectId.isValid( params );
    if( esMongoId ) {

        const producto = await Product.findById( params ).populate('fkCategoryId', 'nameCategory').populate('fkUserId','nameUser');
        return res.json( {
            results: ( producto ) ? [ producto ] : []
        } );
    }

    const regex = new RegExp( params, 'i'); //Esta funsion es para hacer una busqueda insencible
    
    const producto = await Product.find( { nameProduct: regex, stateProduct: true } )
                                    .populate('fkCategoryId', 'nameCategory')
                                    .populate('fkUserId','nameUser');

    res.json( {
        results: producto
    } );

}

//---------------------------ELABORACION DE FUNSIONES FLECHAS DE BUSQUEDA---------------------------//

const buscarParametro =  ( req = request, res = response ) => {

    const { collection, params } = req.params;

    if( !collectionAllowed.includes(collection) ) {
        return res.status(400).json({
            msg: `las collecciones permitidas son: ${ collectionAllowed }`
        });
    }

    switch( collection ) {
        case 'categorias':
            buscarCategoria( params, res );
        break;
        
        case 'productos':
            buscarProducto( params, res );
        break;
        
        case 'usuarios':
            buscarUsuarios( params, res );
        break;

        default:
            res.status(500).json({
                msg:'Se me olvido hacer esta búsqueda'
            });
    }
}

//---------------------------EXPORTACIONES DE FUNSIONES O VARIBALES---------------------------//

module.exports = {
    buscarParametro
}