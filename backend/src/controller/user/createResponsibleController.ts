import { Request, Response } from 'express';
import { validadeRequiredFields } from '../../util/validateRequiredFields';
import { createResponsibleService } from '../../service/user/createResponsibleService';
import { appError } from '../../error/appError';

export class createResponsibleController {
    async handle(req: Request, res: Response) {
        try {
            const {
                name,
                cpf_cnpj,
                email,
                telephone,
                relationship,
            } = req.body;

            const missingField = validadeRequiredFields(req.body, ['name', 'cpf_cnpj', 'email', 'relationship']);
            if (missingField) {
                return res.status(400).json({
                    error: `Missing required field: ${missingField}`
                });
            }

            const service = new createResponsibleService();
            const result = await service.execute({
                name,
                cpf_cnpj,
                email,
                telephone,
                relationship,
            });

            return res.status(result.status).json({
                message: result.message,
                data: result.data,
            });

        } catch (error) {
            if (error instanceof appError) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }

            console.error("Error in createResponsibleController:", error);
            return res.status(500).json({
                error: "Internal server error"
            });
        }
    }
}