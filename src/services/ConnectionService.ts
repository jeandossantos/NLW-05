import { getCustomRepository } from 'typeorm';

import ConnectionRepository from '../repositories/ConnectionRepository';

interface IConnection {
    id?: string;
    socket_id: string;
    user_id: string;
    admin_id?: string;
}

class ConnectionService {

    public async create({ socket_id, user_id, admin_id, id } : IConnection) {
        const connectonRepository = getCustomRepository(ConnectionRepository);

        const connection = connectonRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await connectonRepository.save(connection);

        return connection;
    }

    public async findByUserId(user_id: string) {
        const connectonRepository = getCustomRepository(ConnectionRepository);
        
        const connection = await connectonRepository.findOne({
            where: {
                user_id
            }
        });

        return connection;
    }
}

export default new ConnectionService();