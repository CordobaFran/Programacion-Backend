import config from "../config.js";
import CarritoDaoFirebase from "./carritos/carritoDaoFirebase.js";
import CarritoDaoMongoDb from "./carritos/carritoDaoMongoDb.js"

let database = config.database
let carritos

switch (database) {
    case "firebase":
        carritos = class MainCarritosDao extends CarritoDaoFirebase {
            constructor(){
                super()
            }
        }
        break;
    case "mongo":
        carritos = class MainCarritoDao extends CarritoDaoMongoDb {
            constructor(){
                super()
            }
        }
    default:
        break;
}

export default carritos