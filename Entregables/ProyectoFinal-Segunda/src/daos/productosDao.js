import config from "../config.js";
import ProductosDaoFirebase from "./productos/productosDaoFirebase.js";
import ProductosDaoMongoDb from "./productos/productosDaoMongoDb.js"
import ProductosDaoArchivo from "./productos/productosDaoArchivo.js"
import ProductosDaoMemoria from "./productos/productosDaoMemoria.js"

let database = config.database
let productos

switch (database) {
    case "firebase":
        productos = class MainProductsDao extends ProductosDaoFirebase {
            constructor() {
                super()
            }
        }
        break;
    case "mongo":
        productos = class MainProductsDao extends ProductosDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;
    case "archivo":
        productos = class MainProductsDao extends ProductosDaoArchivo {
            constructor() {
                super()
            }
        }
        break;
    case "memoria":
        productos = class MainProductsDao extends ProductosDaoMemoria {
            constructor() {
                super()
            }
        }
        break;
    default:
        break;
}

export default productos