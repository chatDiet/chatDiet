import Router from 'express';
const isAuth = require('../middlewares/auth.middleware');
import { ContractController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const contractController = new ContractController();

router.post('/trainer/:trainerId/contract', isAuth, contractController.createContract);
router.get('/contract', isAuth, contractController.getContract);
router.delete('/contract/:contractId', isAuth, contractController.deleteContract);

export default router;
