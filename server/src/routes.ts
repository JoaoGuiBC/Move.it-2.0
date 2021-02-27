import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/users', UsersController.index);
routes.get('/users/login', UsersController.show);
routes.put('/users', UsersController.update);
routes.post('/users', upload.single('image'), UsersController.create);

export default routes;
