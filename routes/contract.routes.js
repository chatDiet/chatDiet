import { Router } from 'express';
import { ContractController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const contractController = new ContractController();

router.post('/contract', isAuth, contractController.createContract);
router.get('/contract', isAuth, contractController.getContract);
router.delete('/contract/:contractId', isAuth, contractController.deleteContract);
router.patch('/authContract', isAuth, contractController.authContract);
router.put('/contract/:contractId', isAuth, contractController.updateContract);

export default router;
