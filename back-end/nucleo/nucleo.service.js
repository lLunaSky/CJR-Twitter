import {PrismaClient} from "@prisma/client"; 
const prisma = new PrismaClient();

class Nucleo{

    async criarNucleo(nome){
        return await prisma.nucleo.create({
            data: {
                nome
            }
        }).catch(e => {
            if(e.code == "P2002") throw new Error("Nucleo já cadastrado");
            throw e;
        })
    }

    async procuraNucleo(){
        return await prisma.nucleo.findMany();
    }

    async deletaNucleo(id){
        return await prisma.nucleo.delete({ 
            where: { id },
        }).catch(e => {
            if(e.code == "P2025") throw new Error("Nucleo não encontrado");
            throw e;
        })
    }
}

export default Nucleo;