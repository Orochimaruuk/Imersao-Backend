import multer from "multer";
import cors from "cors";
import express from "express";
import { listarposts, postar, uparimagem, atualizar} from "../controllers/postscontroller.js";

const corsOpt = {origin: "http://localhost:8000", optionsSuccessStatus: 200}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOpt));
    app.get("/posts", listarposts);
    app.post("/posts", postar)
    app.post("/upload", upload.single("imagem"), uparimagem)
    app.put("/upload/:id", atualizar)
}


export default routes;

