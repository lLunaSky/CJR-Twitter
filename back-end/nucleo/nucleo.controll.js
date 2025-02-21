import Nucleo from "./nucleo.service.js";
import {Router} from "express";

const nucleoRotas = Router();
const nucleo = new Nucleo();

nucleoRotas.post("/nucleo", async(eviado,resposta) => {
    const{nome} = eviado.body;
    try{
        const novoNucleo = await nucleo.criarNucleo(nome);
        resposta.status(200).json(novoNucleo);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

nucleoRotas.get("/nucleo", async(eviado,resposta) => {
    const listaNucleo = await nucleo.procuraNucleo();
    resposta.status(200).json(listaNucleo);
})

nucleoRotas.delete("/nucleo/:id", async(eviado,resposta) => {
    const{id} = eviado.params;
    try{
        const nucleoDeletado = await nucleo.deletaNucleo(+id);
        resposta.status(200).json(nucleoDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

export default nucleoRotas;