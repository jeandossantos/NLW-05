import { io } from '../http';
import { Socket } from 'socket.io';

import ConnectionService from '../services/ConnectionService';
import UserService from '../services/UserService';
import MessageService from '../services/MessageService';

interface IParams {
    email: string;
    text: string;
}

io.on('connect', (socket: Socket) => {
    socket.on('client-first-access', async params => {
        const socket_id = socket.id;
        const { email, text } = params as IParams;
        let user_id = null;

        const userExists = await UserService.findByEmail(email);

        if(!userExists) {
            const user = await UserService.create({ email });

            await ConnectionService.create({
                socket_id,
                user_id: user.id
            });
            user_id = user.id;
        } else {
            const connection = await ConnectionService.findByUserId(userExists.id);

            if (!connection) {
                await ConnectionService.create({
                    socket_id,
                    user_id: userExists.id
                });

            } else {
                connection.socket_id = socket_id;
                console.log('chegou aqui')    
                await ConnectionService.create(connection);
            }
            user_id = userExists.id;
        }

        await MessageService.create({
            text,
            user_id
        });
    });
});