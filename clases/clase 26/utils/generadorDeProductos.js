const {faker} = require('@faker-js/faker')

const { commerce, image } = faker

faker.locale = 'es'

function generarProducto(){
    return {
        product: commerce.product(),
        value: commerce.price(),
        urlImg: image.image()
    }
}

module.exports = { generarProducto }