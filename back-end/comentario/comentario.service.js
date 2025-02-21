import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();

class Comentario{
  async criarComentario(user_id,post_id,content){
        return await prisma.coments.create({
            data: {
                user_id,
                post_id,
                content
            }})
  }

  async deletaComentario(id){
    return await prisma.coments.delete({ 
        where: { id },
    }).catch(e => {
        if(e.code == "P2025") throw new Error("Comentario não encontrado");
        throw e;
    })
  }

    async procuraIDusuario(id){
        const comentario = await prisma.coments.findUnique({
            where: {id}
        })
        return comentario.user_id
    }
}

export default Comentario;