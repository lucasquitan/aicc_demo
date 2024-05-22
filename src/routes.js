import { Router } from 'express';
import UserController from './controllers/UserController.js';
import HospitalController from './controllers/HospitalController.js';

const routes = new Router();

/** CPF Validation and Customer insertion on DB*/
routes.post('/user', UserController.create);
routes.get('/user/:cpf', UserController.show);
routes.get('/user', UserController.index);

/** Hospital Query and Insertion on DB */
routes.get('/hospital', HospitalController.index);
routes.get('/hospital/:id', HospitalController.show);
routes.post('/hospital', HospitalController.create);
routes.get('/attribute', HospitalController.verify);

export default routes;
