import ContenedorArchivo from "../../containers/contenedorArchivo.js";

export default class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("../db/cart.json")
    }
}
