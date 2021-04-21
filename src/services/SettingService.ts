import { getCustomRepository } from 'typeorm'

import SettingRepository from '../repositories/SettingRepository';

interface ISettingCreate {
    username: string;
    chat: boolean
}

class SettingService {

    public async create({ username, chat }: ISettingCreate) {
        const settingRepository = getCustomRepository(SettingRepository);

        const userAlreadyExists = await settingRepository.findOne({
            username
        });

        if(userAlreadyExists) throw new Error('User already exists!');

        const setting = settingRepository.create({
            username,
            chat
        });
        
        await settingRepository.save(setting);

        return setting;
    }
}

export default new SettingService();