import { Router } from 'express';
import { CalenderController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';
import upload from '../middlewares/awsS3.middleware';

const router = Router();

const calenderController = new CalenderController();

// 캘린더 하나 조회
router.get('/calender/:calenderId', isAuth, calenderController.getCalender);

// 캘린더 전체 조회
router.get('/calenders', isAuth, calenderController.getCalenders);

router.post('/calender', isAuth, upload.single('image'), calenderController.createCalender);
router.put('/calenders/:calenderId', isAuth, calenderController.updateCalender);
router.delete('/calenders/:calenderId', isAuth, calenderController.deleteCalender);
export default router;
