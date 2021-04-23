import MessageService from '../services/MessageService';
import { io } from '../http';
import ConnectionService from '../services/ConnectionService';

io.on('connect',  async (socket) => {

    const allConnectionsWithoutAdmin = await ConnectionService.findWithoutAdmin();

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
    
    socket.on('admin_list_message_by_user', async (params, callBack) => {
        const { user_id } = params;

        const allMessages = await MessageService.listByUser(user_id);

        callBack(allMessages);
    });
    
    socket.on('admin_send_message', async (params) => {
        const { user_id, text } = params;

        await MessageService.create({
            user_id,
            text,
            admin_id: socket.id
        });

        const { socket_id } = await ConnectionService.findByUserId(user_id);

        socket.to(socket_id).emit('admin_send_to_client', {
            text,
            socket_id: socket.id
        });
    });

        socket.on('admin_user_in_support', async params => {
            const { user_id } = params;
            console.log(user_id)
            await ConnectionService.updateAdminById(user_id, socket.id);

            const allConnectionsWithoutAdmin = await ConnectionService.findWithoutAdmin();

            io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
        });
});

