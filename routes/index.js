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
import CompanyRoute from './company.routes';
import ChatRoute from './chat.routes';

const router = express.Router();

router.use('/', [
  CalenderRoute,
  CommentRoute,
  ContractRoute,
  InquiryRoute,
  PostRoute,
  ReportRoute,
  ReviewRoute,
  ScheduleRoute,
  TrainerRoute,
  UserRoute,
  CompanyRoute,
  ChatRoute,
]);

module.exports = router;
