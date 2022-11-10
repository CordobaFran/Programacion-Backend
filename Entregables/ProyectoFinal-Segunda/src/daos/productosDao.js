import config from "../config.js";
import ProductosDaoFirebase from "./productos/productosDaoFirebase.js";
import ProductosDaoMongoDb from "./productos/productosDaoMongoDb.js"

let database = config.database
let productos

switch (database) {
    case "firebase":
        productos = class MainProductsDao extends ProductosDaoFirebase {
            constructor(){
                super()
            }
        }
        break;
    case "mongo":
        productos = class MainProductsDao extends ProductosDaoMongoDb {
            constructor(){
                super()
            }
        }
    default:
        break;
}

export default productos