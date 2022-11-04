import ContenedorArchivo from "../../containers/contenedorArchivo";

export default class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("db/productos.json")
    }
}

