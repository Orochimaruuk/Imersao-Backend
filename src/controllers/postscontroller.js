import {getTodosPosts , criar, attpost} from "../models/postmodels.js";
import gerarDescricaoComGemini from "../services/gemini.js";
import fs from "fs";
export async function listarposts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postar(req, res) {
    const novopost = req.body;
    try{
       const criarpost = await criar(novopost)
       res.status(200).json(criarpost);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uparimagem(req, res) {
    const novopost = {
        imgUrl: req.file.originalname,
        alt: ""
    };
    try{
       const criarpost = await criar(novopost);
       const imagemAtualizada = `uploads/${criarpost.insertedId}.png`
       fs.renameSync(req.file.path, imagemAtualizada)
       res.status(200).json(criarpost);
    }
    catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}


export async function atualizar(req, res) {
    const id = req.params.id;
    const url = `http://localhost:3000/${id}.png`
    const postatt = {
        imgUrl: url,
        descricao: req.body.descricao,
        alt: req.body.alt
    }
    try{
       const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
       const descricao = await gerarDescricaoComGemini(imgBuffer)
       const postatt = {
        imgUrl: url,
        descricao: descricao,
        alt: req.body.alt
       }
       const criarpost =  attpost(id, postatt);
       res.status(200).json(criarpost);
    
      }  catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}