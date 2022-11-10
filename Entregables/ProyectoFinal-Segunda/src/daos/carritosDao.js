import config from "../config.js";
import CarritoDaoFirebase from "./carritos/carritoDaoFirebase.js";
import CarritoDaoMongoDb from "./carritos/carritoDaoMongoDb.js"
import CarritoDaoArchivo from "./carritos/carritoDaoArchivo.js"
import CarritoDaoMemoria from "./carritos/carritoDaoMemoria.js"

let database = config.database
let carritos

switch (database) {
    case "firebase":
        carritos = class MainCarritosDao extends CarritoDaoFirebase {
            constructor() {
                super()
            }
        }
        break;
    case "mongo":
        carritos = class MainCarritoDao extends CarritoDaoMongoDb {
            constructor() {
                super()
            }
        }
        break;
    case "archivo":
        carritos = class MainCarritoDao extends CarritoDaoArchivo {
            constructor() {
                super()
            }
        }
        break;
    case "memoria":
        carritos = class MainCarritoDao extends CarritoDaoMemoria {
            constructor() {
                super()
            }
        }
        break;
    default:
        break;
}

export default carritos