import config from "../config.js";
import ProductosDaoFirebase from "./productos/productosDaoFirebase.js";
import ProductosDaoMongoDb from "./productos/productosDaoMongoDb.js"
import ProductosDaoArchivo from "./productos/productosDaoArchivo.js"

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
        productos = class MainProductsArchivo extends ProductosDaoArchivo {
            constructor() {
                super()
            }
        }
        break;
    default:
        break;
}

export default productos