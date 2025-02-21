import jwt from "jsonwebtoken";
import Usuario from "../usuario/usuario.service.js";
import bcrypt from "bcrypt";

const usuario = new Usuario();

class Autentificação{
    async entrar(email,senha){
        const usuario_entrar = await usuario.procuraPorEmail(email);
        if(!usuario_entrar) throw new Error("Usuário não encontrado");
        if(!(await bcrypt.compare(senha, usuario_entrar.senha))) throw new Error("Senha incorreta"); //("Senha incorreta")
        const token = jwt.sign({id: usuario_entrar.id},"secret",{expiresIn: "60m"}); //Tempo do token 60 minutos
        return{token};
    }

    async cadastro(email,senha,nome,genero,imagem,cargo,nucleo){
        const salt = await bcrypt.genSalt();
        senha = await bcrypt.hash(senha, salt);
        console.log("Entrou no cadastro service")
        const novoUsuario = await usuario.criarUsuario(email,senha,nome,genero,imagem,cargo,nucleo);
        return novoUsuario;
    }
}

export default Autentificação;