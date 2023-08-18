import express from 'express';
import CalenderRoute from './calender.routes';
import CommentRoute from './comment.routes';
import ContractRoute from './contract.routes';
import InquiryRoute from './inquiry.routes';
import PostRoute from './post.routes';
import ReportRoute from './report.routes';
import ReviewRoute from './review.routes';
import ScheduleRoute from './schedule.routes';
import TrainerRoute from './trainer.routes';
import UserRoute from './user.routes';

const router = express.Router();

//캘린더
router.use('/calender', CalenderRoute);

//댓글
router.use('/comment', CommentRoute);

//
router.use('/contract', ContractRoute);

//
router.use('/inquiry', InquiryRoute);

//게시글
router.use('/post', PostRoute);

//신고
router.use('/report', ReportRoute);

//후기
router.use('/review', ReviewRoute);

//트레이너 스케줄
router.use('/schedule', ScheduleRoute);

//트레이너
router.use('/trainer', TrainerRoute);

//유저
router.use('/user', UserRoute);

module.exports = router;
