import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import cors from 'cors';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
    this.setHtml();
  }
  //
  setAppSettings = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static('public'));
    this.app.use(cors());
  };

  setAppRouter = () => {
    this.app.use('/api', routes, (error, request, response) => {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    });
  };

  setHtml = () => {
    // 첫 화면
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userMain.html');
    });
    this.app.get('/signup', (req, res) => {
      res.sendFile(__dirname + '/public/templates/user/signup.html');
    });
    this.app.get('/login', (req, res) => {
      res.sendFile(__dirname + '/public/templates/user/login.html');
    });
    this.app.get('/inquiry', (req, res) => {
      res.sendFile(__dirname + '/public/templates/inquiry/setInquiry.html');
    });
    this.app.get('/inquirys', (req, res) => {
      res.sendFile(__dirname + '/public/templates/inquiry/getInquiry.html');
    });
    this.app.get('/editInquiry', (req, res) => {
      res.sendFile(__dirname + '/public/templates/inquiry/editInquiry.html');
    });
    this.app.get('/admin', (req, res) => {
      res.sendFile(__dirname + '/public/templates/adminPage.html');
    });
    this.app.get('/signupCategory', (req, res) => {
      res.sendFile(__dirname + '/public/templates/user/signupCategory.html');
    });
    this.app.get('/report', (req, res) => {
      res.sendFile(__dirname + '/public/templates/report/setUserReport.html');
    });
    this.app.get('/reports', (req, res) => {
      res.sendFile(__dirname + '/public/templates/report/getUserReport.html');
    });
    this.app.get('/editReport', (req, res) => {
      res.sendFile(__dirname + '/public/templates/report/editUserReport.html');
    });
    this.app.get('/calender', (req, res) => {
      res.sendFile(__dirname + '/public/templates/calender/userCalender.html');
    });
    this.app.get('/trainerUserCalender/:calenderId', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/trainerUserCalender.html');
    });
    this.app.get('/calender/post', (req, res) => {
      res.sendFile(__dirname + '/public/templates/calender/postUserCalender.html');
    });
    this.app.get('/getUserPosts', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/getUserPost.html');
    });
    this.app.get('/calender/:calenderId', (req, res) => {
      res.sendFile(__dirname + '/public/templates/calender/detailUserCalender.html');
    });
    this.app.get('/getUserReviews', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/getUserReview.html');
    });
    this.app.get('/userInfo', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/userInfo.html');
    });
    this.app.get('/updateUserInfo', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/updateUserInfo.html');
    });
    this.app.get('/companyMain', (req, res) => {
      res.sendFile(__dirname + '/public/templates/company/getUserCompanyMain.html');
    });
    this.app.get('/detailCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/company/getUserDetailCompany.html');
    });
    this.app.get('/detailTrainer', (req, res) => {
      res.sendFile(__dirname + '/public/templates/company/getUserDetailTrainer.html');
    });
    this.app.get('/getUserComments', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/getUserComment.html');
    });
    this.app.get('/communityMain', (req, res) => {
      res.sendFile(__dirname + '/public/templates/community/getUserCommunityMain.html');
    });
    this.app.get('/detailCommunity', (req, res) => {
      res.sendFile(__dirname + '/public/templates/community/getUserDetailCommunity.html');
    });
    this.app.get('/createPost', (req, res) => {
      res.sendFile(__dirname + '/public/templates/community/createUserPost.html');
    });
    this.app.get('/chatMain', (req, res) => {
      res.sendFile(__dirname + '/public/templates/chat/getChatMain.html');
    });
    this.app.get('/chatRoom', (req, res) => {
      res.sendFile(__dirname + '/public/templates/chat/getChatRoom.html');
    });
    this.app.get('/trainerChatRoom', (req, res) => {
      res.sendFile(__dirname + '/public/templates/chat/trainerChatRoom.html');
    });
    this.app.get('/myPage', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/userMypage.html');
    });
    this.app.get('/trainer', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/trainer.html');
    });
    this.app.get('/createtrainer', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/createTrainer.html');
    });
    this.app.get('/myUser', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/myuser.html');
    });
    this.app.get('/trainerInfo', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/detailTrainer.html');
    });
    this.app.get('/userCalender', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/getUserCalender.html');
    });
    this.app.get('/updateTrainerInfo', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/updateTrainerInfo.html');
    });
    this.app.get('/postTrainerCalender', (req, res) => {
      res.sendFile(__dirname + '/public/templates/schedule/postTrainerCalender.html');
    });
    this.app.get('/detailTrainerCalender', (req, res) => {
      res.sendFile(__dirname + '/public/templates/schedule/detailTrainerCalender.html');
    });
    this.app.get('/setOwnerCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/OwnerCompany/setOwnerCompany.html');
    });
    this.app.get('/getOwnerCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/OwnerCompany/getOwnerCompany.html');
    });
    this.app.get('/putOwnerCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/OwnerCompany/putOwnerCompany.html');
    });
  };
}
