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
       
                await ConnectionService.create(connection);
            }
            user_id = userExists.id;
        }

        await MessageService.create({
            text,
            user_id
        });

        const allMessages = await MessageService.listByUser(user_id);

        socket.emit('client_list_all_messages', allMessages);

        const allUsers = await ConnectionService.findWithoutAdmin();

        io.emit('admin_list_all_users', allUsers);
    });

    socket.on('client_send_to_admin', async params => {
        const { text, socket_admin_id } = params;
 
        const socket_id = socket.id;

        const { user_id } = await ConnectionService.findByUserSocketId(socket_id);

        const message = await MessageService.create({
            text,
            user_id
        });

        io.to(socket_admin_id).emit('admin_receive_message', {
            message,
            socket_id
        })
    });
});