import Connection from '../entities/Connection';
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

    public async findWithoutAdmin() {
        const connectonRepository = getCustomRepository(ConnectionRepository);
        
        return await connectonRepository.find({
            where: { admin_id: null },
            relations: ['user']
        });
    }
    
    public async findByUserSocketId(socket_id: string) {
        const connectonRepository = getCustomRepository(ConnectionRepository);

        return await connectonRepository.findOne({
            socket_id
        });        
    }

    public async updateAdminById (user_id: string, admin_id: string) {
        const settingRepository = getCustomRepository(ConnectionRepository);

        await settingRepository
            .createQueryBuilder()
            .update(Connection)
            .set({ admin_id })
            .where('user_id = :user_id', {
                user_id
            })
            .execute();
    }
}

export default new ConnectionService();