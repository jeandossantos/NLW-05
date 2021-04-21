import { Router } from 'express';

import MessageController from './controllers/MessageController';
import SettingController from './controllers/SettingController';
import UserController from './controllers/UserController';

const router = Router();

router.post('/settings', SettingController.create); 

router.post('/users', UserController.create);

router.post('/messages', MessageController.create);
router.get('/messages/:id', MessageController.listByUser);

export default router;