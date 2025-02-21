import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();
import bcrypt from "bcrypt";


class Usuario{

    async criarUsuario(email,senha,nome,genero,imagem,cargo,nucleo){
        try {
            const nucleoExistente = await prisma.nucleo.findUnique({
              where: { nome: nucleo },
            });
      
            let nucleoId;
      
            if (!nucleoExistente) {
              const novoNucleo = await prisma.nucleo.create({
                data: {
                  nome: nucleo,
                },
              });
      
              nucleoId = novoNucleo.id;
            } else {
              nucleoId = nucleoExistente.id;
            }
      
            return await prisma.usuario.create({
              data: {
                email,
                senha,
                nome,
                genero,
                imagem,
                cargo,
                nucleo: {
                  connect: { id: nucleoId },
                },
              },
            });
          } catch (e) {
            console.log(e);
            if (e.code === "P2002") throw new Error("Email já cadastrado");
            throw e;
          }
        }

    async procuraUsuarios(){
        return await prisma.usuario.findMany();
    }

    async deletaUsuario(id){
        return await prisma.usuario.delete({ 
            where: { id },
        }).catch(e => {
            if(e.code == "P2025") throw new Error("Usuário não encontrado");
            throw e;
        })
    }

    async procuraPorEmail(Email){
        return await prisma.usuario.findUnique({
            where: { email : Email },
        })
    }

    async trocarSenha(email, novaSenha){
      console.log("Entrou na função trocar senha")
      const salt = await bcrypt.genSalt();
      novaSenha = await bcrypt.hash(novaSenha, salt);
      const usuarioAtualizado = await prisma.usuario.update({
        where: {email},
        data: {senha: novaSenha},
      });
      return usuarioAtualizado;
    }

    async trocaNome(id,novoNome){
      const usuarioAtualizado = await prisma.usuario.update({
        where: {id},
        data: {nome: novoNome}
      })
      return usuarioAtualizado;
    }

    async trocaImagem(id,novaImagem){
      const usuarioAtualizado = await prisma.usuario.update({
        where: {id},
        data: {imagem: novaImagem}
      })
      return usuarioAtualizado;
    }

    async trocaEmail(id,novoEmail){
      try {
        const usuarioAtualizado = await prisma.usuario.update({
          where: {id},
          data: {email: novoEmail}
        })
        return usuarioAtualizado;
      }catch (e) {
        console.log(e);
        if (e.code === "P2002") throw new Error("Email já cadastrado");
        throw e;
      }
    }

    async trocaCargo(id,novoCargo){
      const usuarioAtualizado = await prisma.usuario.update({
        where: {id},
        data: {cargo: novoCargo}
      })
      return usuarioAtualizado;  
    }

    async trocaNucleo(id,novoNucleo){
      const nucleoExistente = await prisma.nucleo.findUnique({
        where: { nome: novoNucleo },
      });
      let nucleoId;
      if (!nucleoExistente) {
        const Nucleo = await prisma.nucleo.create({
          data: {
            nome: novoNucleo,
          },
        });
        nucleoId = Nucleo.id;
      } else {
        nucleoId = nucleoExistente.id;
      }
      const usuarioAtualizado = prisma.usuario.update({
        where: {id},
        data: {nucleo: {connect: { id: nucleoId },},}
      })
      return usuarioAtualizado
    }

    async Perfil(id){
      try{
        const usuario = await prisma.usuario.findUnique({
          where: {id},
          select: {
            imagem: true,
            nome: true,
            email: true,
            cargo: true,
            nucleo : true,
            posts: true,
          }
        })
        return usuario;
      }catch(error){
        console.error(error);
        throw error;
      }
    }

    async Imagem(email){
      const usuario = await prisma.usuario.findUnique({
        where: {email}, 
      })
      return usuario.imagem;
    }
}

export default Usuario