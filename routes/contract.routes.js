import { Router } from 'express';
import { ContractController } from '../controllers';
const isAuth = require('../middlewares/auth.middleware');

const router = Router();

const contractController = new ContractController();

router.post('/trainer/:trainerId/contract', isAuth, contractController.createContract);
router.get('/contract', contractController.getContract);
router.delete('/contract/:contractId', isAuth, contractController.deleteContract);
router.patch('/authContract', contractController.authContract);

export default router;
