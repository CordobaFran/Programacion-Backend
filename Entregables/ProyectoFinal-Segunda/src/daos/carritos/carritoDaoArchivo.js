import ContenedorArchivo from "../../containers/contenedorArchivo.js";
import fs from 'fs'

export default class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("../db/cart.json")
    }

    addToCart(product, id){
        
        let cart = this.products.find(element => {
            return element.id === parseInt(id)
        })

        cart.push([{product}])
        console.log();
    }

    removeFromCart(){

    }

    removeAll(){

    }

}
