import { getCustomRepository } from 'typeorm';

import MessageRepository from '../repositories/MessageRepository';

interface IMessage {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessageService {


    public async create ({ admin_id, text, user_id} : IMessage) {
        const messageRepository = getCustomRepository(MessageRepository);

        const message = messageRepository.create({
            admin_id,
            text,
            user_id
        });

        await messageRepository.save(message);

        return message;
    }

    public async listByUser( user_id: string ) {
        const messageRepository = getCustomRepository(MessageRepository);

        const messages = await messageRepository.find({
            where: { user_id },
            relations: ['user']
        });

        return messages;
    }
}

export default new MessageService();