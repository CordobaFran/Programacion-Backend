import admin from 'firebase-admin'
import config from '../config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

export default class ContainerFirebase {

  constructor(collection) {
    this.query = db.collection(collection)
  }

  //Create document
  async create() {
    try {
      const doc = this.query.doc()
      await doc.create({
        nombre: "juan",
        apellido: "perez"
      })
      console.log("creado");
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
      const deleteDoc = await doc.delete()
      console.log(`documento eliminado`);

    } catch (error) {
      console.log(error);
    }
  }

}