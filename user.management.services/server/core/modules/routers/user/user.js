import express from 'express';
import UserController from '../../controllers/user/user';

const router = express.Router();

router.post('/test-notification', UserController.testNotification);

export default router;
