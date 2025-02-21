import {Router, response} from "express";
import Autentificação from "./autentificacao.service.js";
import Usuario from "../usuario/usuario.service.js";
import JwtGuard from "../autentificação/guards/jwt.guard.js";

const autentificacao = new Autentificação;
const autentificacaoRotas = Router();
const usuario = new Usuario()

autentificacaoRotas.post("/entrar", async (enviado,resposta) => {
    const{email,senha} = enviado.body;
    try{
        const token = await autentificacao.entrar(email,senha);
        resposta.status(200).json(token);
    }catch(e){
        resposta.status(400).json({message: e.message});
    }
})

autentificacaoRotas.post("/mudarsenha", async(enviado,reposta) => {
    const{email,novasenha} = enviado.body;
    try{
        const resposta = await usuario.trocarSenha(email,novasenha);
        reposta.status(200).json(resposta)
    }catch(e){
        resposta.status(400).json({message: e.message})
    }
})

autentificacaoRotas.post("/cadastro", async(enviado,resposta) => {
    console.log("Entrou no cadastro controll")
    const{email,senha,nome,genero,imagem,cargo,nucleo} = enviado.body;
    try{
        const novoUsuario = await autentificacao.cadastro(email,senha,nome,genero,imagem,cargo,nucleo);
        resposta.status(200).json(novoUsuario);
    }catch(e){
        resposta.status(400).json({message: e.message});
    }
})

autentificacaoRotas.get("/info", JwtGuard, async(eviado,resposta) => {
    const usuario = eviado.user;
    try{
        resposta.status(200).json(usuario);
    }catch(e){
        resposta.status(400).json({erro: err.message});
    }
})

export default autentificacaoRotas;