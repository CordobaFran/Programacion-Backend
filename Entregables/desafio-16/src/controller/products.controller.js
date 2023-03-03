const Contenedor = require('../daos/productosDao')
const { ProductsService } = require('../service/products.service')
const productos = new ProductsService()

const getProducts = async (req, res) => {

    const products = await productos.getAllProducts()

    let productExists = false
    let username;
    // const username = users.find(user => user.id === req.session.passport.user).username

    !req.user ? username = "no definido" :username = req.user.username
        
    await products ? productExists = true : productExists = false
    
    res.render('main', { products, productExists, username })
    // res.json( {products}) 
}

const getProductId = async (req, res) => {
    const id = req.params.id
    res.json(await productos.getProductById(id))
}

const editProduct = async (req, res) => {
    const id = req.params.id
    const productData = req.body
    res.json(await productos.updateProduct(id, productData))
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    res.json(await productos.deleteProduct(id))
}

module.exports = {
    getProducts,
    getProductId,
    editProduct,
    deleteProduct
}