import { Router } from 'express';
import { CalenderController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';
import { singleUpload } from '../middlewares/awsS3.middleware';

const router = Router();

const calenderController = new CalenderController();

// 캘린더 하나 조회
router.get('/calender/:calenderId', isAuth, calenderController.getCalender);

// 캘린더 전체 조회
router.get('/calenders', isAuth, calenderController.getCalenders);

// 회원 캘린더 조회
router.get("/calender/user/:user", isAuth, calenderController.userCalender)

router.post('/calender', isAuth, singleUpload('image'), calenderController.createCalender);
router.put('/calenders/:calenderId', isAuth, calenderController.updateCalender);
router.delete('/calenders/:calenderId', isAuth, calenderController.deleteCalender);
export default router;
