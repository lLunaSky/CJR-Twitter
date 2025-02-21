import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();

class Post{
    async criarPost(content,user_id){
        return await prisma.post.create({
            data: {
                user_id,
                content,
            },
        });
    }

    async procuraPost(){
        return await prisma.post.findMany({
            orderBy: { created_at: "desc" },
        });
    }

    async procuraIDusuario(id){
        const Post = await prisma.post.findUnique({
            where: {id}
        })
        return Post.user_id
    }

    async editaPost(id,novoContent){
        const PostAtualizado = await prisma.post.update({
            where: {id},
            data: {content: novoContent},
        })
        return PostAtualizado
    }

    async deletaPost(id){
        return await prisma.post.delete({ 
            where: { id },
        }).catch(e => {
            if(e.code == "P2025") throw new Error("Post não encontrado");
            throw e;
        })
    }
}

export default Post;