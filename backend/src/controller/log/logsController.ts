import { Request, Response } from 'express';
import { logsService } from '../../service/log/logsService';


export const logsController = (req: Request, res: Response) => {
    try {
        const html = logsService();
        res.send(html);
    } catch (error) {
        res.status(500).send("Erro ao tentar carregar logs");
    }
};