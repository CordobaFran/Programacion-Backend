const admin = require('firebase-admin')
const config  = require( '../config.js');

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContainerFirebase {
  
  constructor(collection) {
    this.query = db.collection(collection)
  }

  //Create document
  async create(product) {
    try {
      const doc = this.query.doc()
      await doc.create(product)
      console.log("added");
      return { status: "added" }
    } catch (error) {
      console.log(error);
    }
  }
  //Read All
  async getAll() {
    try {
      const queryDocs = await this.query.get()
      let docs = queryDocs.docs.map(documents => (
        { id: documents.id, ...documents.data() }
      ))
      console.log(docs);
      return docs
    } catch (error) {
      console.log(error);
    }
  }
  //Read by ID
  async getById(id) {
    try {
      const queryDoc = this.query.doc(id)
      const doc = await queryDoc.get()
      const document = doc.data()
      console.log(document);
      return document

    } catch (error) {
      console.log(error);
    }
  }
  //Update Docs
  async update(id, data) {
    try {
      const doc = this.query.doc(id)
      await doc.update(data)
      console.log(`documento actualizado`, data);
      return { status: "modified" }

    } catch (error) {
      console.log(error);
    }
  }
  //Update Docs
  async delete(id) {
    try {
      const doc = this.query.doc(id)
      await doc.delete()
      console.log(`documento eliminado`);
      return { status: `${id} deleted`}

    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = ContainerFirebase