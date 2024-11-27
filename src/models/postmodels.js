import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("Imersão")
    const colecao = db.collection("Posts")  
    return colecao.find().toArray()
};

export async function criar(novopost) {
    const db = conexao.db("Imersão")
    const colecao = db.collection("Posts")  
    return colecao.insertOne(novopost)
} 

export async function attpost(id, novopost) {
    const db = conexao.db("Imersão")
    const colecao = db.collection("Posts")  
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novopost})
} 