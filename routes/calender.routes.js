import { Router } from 'express';
import { CalenderController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const calenderController = new CalenderController();

router.get('/calenders/:calenderId', isAuth, calenderController.getCalender);
router.post('/calender', isAuth, calenderController.createCalender);
router.put('/calenders/:calenderId', isAuth, calenderController.updateCalender);
router.delete('/calenders/:calenderId', isAuth, calenderController.deleteCalender);
export default router;
