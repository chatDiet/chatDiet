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
    this.app.get('/calender', (req, res) => {
      res.sendFile(__dirname + '/public/templates/calender/userCalender.html');
    });
    this.app.get('/calender/post', (req, res) => {
      res.sendFile(__dirname + '/public/templates/calender/postUserCalender.html');
    });
    this.app.get('/calender/:calenderId', (req, res) => {
      res.sendFile(__dirname + '/public/templates/calender/detailUserCalender.html');
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
    this.app.get('/mypage', (req, res) => {
      res.sendFile(__dirname + '/public/templates/mypage/userMypage.html');
    });
    this.app.get('/trainer', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/trainer.html');
    });
    this.app.get('/myUser', (req, res) => {
      res.sendFile(__dirname + '/public/templates/trainer/myUser.html');
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
