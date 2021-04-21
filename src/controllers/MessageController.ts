import { Request, Response } from "express";

import MessageService from '../services/MessageService';

class MessageController {

    public async create (req: Request, resp: Response) {
        const { user_id, text, admin_id } = req.body;
        try {
    
            const message = await MessageService.create({
                admin_id,
                text,
                user_id
            });
    
            return resp.status(201).json(message);
            
        } catch (error) {
            return  resp.status(400).send(error.message);
        }
    }

    public async listByUser (req: Request, resp: Response) {
        const userId = req.params.id;

        try {
            const messages = await MessageService.listByUser(userId);

            return resp.json(messages);
        } catch (error) {
            return resp.status(400).json(error.message);
        }

    }
}

export default new MessageController();