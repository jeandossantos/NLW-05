import { Request, Response } from "express";
import SettingService from '../services/SettingService';

class SettingController {

    public async create (req: Request, resp: Response) {
        const { username, chat } = req.body;
        try {
            const setting = await SettingService.create({username, chat});
    
            return resp.status(201).json(setting);
            
        } catch (error) {
            return resp.status(400).send(error.message)
        }  
    }

    public async findByUsername (req: Request, resp: Response) {
        const  username = req.params.username;

        try {
            const settings = await SettingService.findByUsername(username);
            return resp.status(201).json(settings);
            
        } catch (error) {
            return resp.status(400).send(error.message)
        }  
    }

    public async update (req: Request, resp: Response) {
        const  username = req.params.username;
        const  { chat } = req.body;

        try {
            const settings = await SettingService.update(username, chat);
            
            return resp.status(201).json(settings);
            
        } catch (error) {
            return resp.status(400).send(error.message)
        }  
    }

}

export default new SettingController();