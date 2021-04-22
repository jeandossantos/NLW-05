import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';

interface IUser {
    email: string
}

class UserService {

    public async create ({ email } : IUser ) {
        const userRepository =  getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if(userAlreadyExists) return userAlreadyExists;

        const user = userRepository.create({ email });

        await userRepository.save(user);

        return user;
    }

    public async findByEmail(email: string) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
            where: {
                email
            }
        });
      
        return user;
      }
}

export default new UserService();