import { throwError } from '../../error/errorMap';
import prismaClient from '../../prisma';


interface createResponsibleProps {
    name: string,
    cpf_cnpj: string,
    email: string,
    telephone?: string,
    relationship: string,
}

export class createResponsibleService {
    async execute({
        name,
        cpf_cnpj,
        email,
        telephone,
        relationship,
    }: createResponsibleProps) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    cpf_cnpj
                }
            });

            if (user) throwError("duplicate:user-cpf_cnpj");

            const emailUser = await prismaClient.user.findUnique({
                where: {
                    email
                }
            });

            if (emailUser) throwError("duplicate:user-email");

            const newUser = await prismaClient.user.create({
                data: {
                    name,
                    cpf_cnpj,
                    email,
                    telephone,
                }
            });

            const newResponsible = await prismaClient.responsible.create({
                data: {
                    relationship,
                    userId: newUser.id,
                }
            })

            return {
                status: 201,
                message: "Responsible successfully registered!",
                data: {
                    id: newUser.id,
                    responsibleId: newResponsible.id,
                }
            }

            console.log(`newResponsible ${newResponsible.id}`)
        } catch (error) {
            throw error;
        }
    }
}