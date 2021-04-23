import Setting from '../entities/Setting';
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

    public async findByUsername(username: string) {
        const settingRepository = getCustomRepository(SettingRepository);

        const settings = await settingRepository.find({
            username
        });

        return settings;
    }

    public async update (username: string, chat: boolean) {
        const settingRepository = getCustomRepository(SettingRepository);

        await settingRepository
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where('username = :username', {
                username
            })
            .execute();
    }

}

export default new SettingService();