import ContenedorMongo from '../../containers/contenedorMongoDb.js'

export default class CarritoDaoMongo extends ContenedorMongo {
    constructor(){
        super('carritos')
    }
}