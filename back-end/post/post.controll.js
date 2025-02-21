import Post from "./post.service.js";
import JwtGuard from "../autentificação/guards/jwt.guard.js";
import { Router } from "express";

const postRotas = Router();
const post = new Post();

postRotas.post("/post", JwtGuard, async(eviado,resposta) => { //criar post 
    const{content} = eviado.body;
    try{
        const novoPost = await post.criarPost(content,eviado.user.id)
        resposta.status(200).json(novoPost);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

postRotas.get("/post", async(eviado,resposta) => { //mostra todos os post por ordem de publicação
    const listaPost = await post.procuraPost();
    resposta.status(200).json(listaPost);
})

postRotas.delete("/post/:id", JwtGuard ,async(eviado,resposta) => { //deleta o post 
    const user_id = await post.procuraIDusuario(+eviado.params.id) 
    if(eviado.user.id !== user_id)
        return resposta.status(403).json({message: "Você não tem permissão para deletar este post"})
    try{
        const postDeletado = await post.deletaPost(+eviado.params.id);
        resposta.status(200).json(postDeletado);
    }catch(err){
        resposta.status(400).json({erro: err.message});
    }
})

postRotas.post("/editaPost/:id", JwtGuard, async(enviado,resposta) => { // para editar o post
    const user_id = await post.procuraIDusuario(+enviado.params.id)
    console.log(user_id)
    console.log(enviado.user.id)
    if(enviado.user.id !== user_id)
        return resposta.status(403).json({message: "Você não tem permissão para editar este post"})
    const{content} = enviado.body;
    try{
        const PostAtualizado = await post.editaPost(+enviado.params.id,content);
        resposta.status(200).json(PostAtualizado);
    }catch(err){
        resposta.status(400).json({erro: err.message})
    }
})

export default postRotas;