import express from "express";
import usuarioRotas from "./usuario/usuario.controll.js";
import autentificacaoRotas from "./autentificação/autentificacao.controll.js";
import nucleoRotas from "./nucleo/nucleo.controll.js";
import postRotas from "./post/post.controll.js";
import comentarioRotas from "./comentario/comentario.controll.js";

const app = express();
app.use(express.json()); // Configurando express para ler JSON
app.use(usuarioRotas);
app.use(autentificacaoRotas);
app.use(nucleoRotas);
app.use(postRotas);
app.use(comentarioRotas)
app.use(express.static("front"))

//  Iniciando o Servidor na porta 3000
app.listen(3000, console.log('Servidos funcionando na porta 3000'));