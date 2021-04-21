import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UserController {

    public async create (req: Request, resp: Response) {
        const { email } = req.body;

        try {
            const user = await UserService.create({ email });

            return resp.status(201).json(user);
        } catch (error) {
            return resp.status(400).send(error.message);
        }
    }
}

export default new UserController();