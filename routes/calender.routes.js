import { Router } from 'express';
import { CalenderController } from '../controllers';

const router = Router();

const calenderController = new CalenderController();

router.get('/calender/:calenderId', calenderController.getCalender);
router.post('/calender', calenderController.createCalender);
router.put('/calender/:calenderId', calenderController.updateCalender);
router.delete('/calender/:calenderId', calenderController.deleteCalender);
export default router;
