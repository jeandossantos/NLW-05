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

}

export default new SettingController();