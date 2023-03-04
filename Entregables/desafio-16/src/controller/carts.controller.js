// const Carritos = require('../daos/carritosDao')
const { CartsService } = require ('../service/carts.service')
const cart = new CartsService('carritos')

const nodeMailerCart = require('../utils/nodemailer-cartConfirm')

const { twilioSms, twilioWsap } = require('../utils/twilio')


const cartsAll = async (req, res) => {

    const carts = await cart.getAllCarts()
    let cartExists = false
    await !carts ? cartExists = false : cartExists = true

    res.status(200).render('cart', { cartExists, carts })
    // res.json(carts)
}

const cartId = async (req, res) => {
    let cartExists = false

    const id = req.params.id
    const cartById = await cart.getCartById(id)
    const products = (cartById[0].productos);
    await !cartById ? cartExists = false : cartExists = true

    res.render('userCart', await { cartExists, id, products })
    // res.json(cartById)
}

const cartCheckout = async (req, res) => {
    const { username, email } = req.user
    const id = req.params.id
    const cartById = await cart.getCartById(id)

    const products = cartById[0].productos

    const sellData = {
        username,
        email,
        products
    }

    nodeMailerCart(sellData)
    twilioWsap(sellData)
    twilioSms(sellData)

    // await cart.deleteCart(id)

    res.json({ msj: "checkout Ok" })
}


module.exports = {
    cartsAll,
    cartId,
    cartCheckout
}