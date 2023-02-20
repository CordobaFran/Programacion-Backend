import ContenedorArchivo from "../../containers/contenedorArchivo.js";

export default class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("../db/productos.json")
    }
}

