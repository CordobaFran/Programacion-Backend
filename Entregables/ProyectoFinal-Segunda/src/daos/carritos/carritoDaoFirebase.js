import ContenedorFirebase from '../../containers/contenedorFirebase.js'
import admin from 'firebase-admin'

export default class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }

    async addToCart(product, id) {
        const productsOfCart = await this.getProductsFromCart(id)

        try {
            // console.log("hola", productsOfCart[0] );

            let lastId
            if (productsOfCart.length && productsOfCart.length > 0) {
                lastId = productsOfCart[productsOfCart.length - 1].id + 1
            } else {
                lastId = 1
            }

            const doc = this.query.doc(id)
            await doc.update({ productos: admin.firestore.FieldValue.arrayUnion({id: lastId, ...product}) })
            console.log(`documento actualizado`, product);
            // console.log(await cart.length);
            return { status: "modified" }

        } catch (error) {
            console.log(error);
        }
    }

    async getProductsFromCart(id) {
        try {
            const queryDoc = this.query.doc(id)
            const doc = await queryDoc.get()
            const document = await doc.data()
            console.log(document.productos);
            return document.productos

        } catch (error) {
            console.log(error);
        }
    }

    async removeFromCart(id, productsId) {

        try {
            const doc = this.query.doc(id)
                await doc.update({ productos: admin.firestore.FieldValue.arrayRemove(productsId) })
                console.log(`documento actualizado`);
                // console.log(await cart.length);
                return { status: "modified" }
            
        } catch (error) {
            console.log(error);
        }

    }

}
