import express, { Router, Request, Response } from 'express';

// ==== Log =====
import { logsController } from './controller/log/logsController';

// ==== User ====
import { createResponsibleController } from './controller/user/createResponsibleController';


const routes = Router();

// ==== Log =====
routes.get('/', logsController);

// ==== User ====
routes.post("/create/responsible/", (req, res) => {
    const controller = createResponsibleController();
    return controller.handle(req, res);
})

export default routes;