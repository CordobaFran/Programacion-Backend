const { Router } = require('express')
const nodeMailerCart = require('../../nodemailer-cartConfirm')
const router = Router()

const Carritos = require('../../daos/carritosDao')
const { twilioSms, twilioWsap } = require('../../twilio')
const cart = new Carritos('carritos')

router.get('/', async (req, res) => {

    const carts = await cart.getAll()
    let cartExists = false

    await !carts ? cartExists = false : cartExists = true
    res.render('cart', { cartExists, carts })
    // res.json(carts)
})

router.get('/:id', async (req, res) => {
    let cartExists = false

    const id = req.params.id
    const cartById = await cart.getById(id)
    const products = (cartById[0].productos);

    await !cartById ? cartExists = false : cartExists = true
    res.render('userCart', await { cartExists, id, products })
    // res.json(cartById)
})

router.post('/:id', async (req, res) => {

    const { username, email } = req.user
    const id = req.params.id
    const cartById = await cart.getById(id)

    const products = cartById[0].productos

    const sellData = {
        username,
        email,
        products
    }

    nodeMailerCart(sellData)
    twilioWsap(sellData)
    twilioSms(sellData)

    res.json({ msj: "checkout Ok" })
})

module.exports = router