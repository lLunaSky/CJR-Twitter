import Comentario from "./comentario.service.js";
import JwtGuard from "../autentificação/guards/jwt.guard.js";
import { Router } from "express";

const comentario = new Comentario
const comentarioRotas = new Router

comentarioRotas.post("/comentario", JwtGuard, async(eviado,resposta) => { //criar comentario 
    const{content,post_id} = eviado.body;
    try{
        const novoComentario = await comentario.criarComentario(eviado.user.id,+post_id,content)
        resposta.status(200).json(novoComentario);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

comentarioRotas.delete("/comentario/:id", JwtGuard ,async(eviado,resposta) => { //deletar 
    const user_id = await comentario.procuraIDusuario(+eviado.params.id) 
    if(eviado.user.id !== user_id)
        return resposta.status(403).json({message: "Você não tem permissão para deletar este comentario"})
    try{
        const comentarioDeletado = await comentario.deletaComentario(+eviado.params.id);
        resposta.status(200).json(comentarioDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

export default comentarioRotas;