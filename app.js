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
    // routes
    this.app.use('/api', routes, (error, request, response) => {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    });
  };

  setHtml = () => {
    //  이런식으로 만든 화면단 붙여주시면 됩니다
    // 유저 메인 화면
    this.app.get('/userMain', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userMain.html');
    });
    this.app.get('/calender', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userCalender.html');
    });
    this.app.get('/calender/post', (req, res) => {
      res.sendFile(__dirname + '/public/templates/postUserCalender.html');
    });
    this.app.get('/calender/:calenderId', (req, res) => {
      res.sendFile(__dirname + '/public/templates/detailUserCalender.html');
    });
    this.app.get('/userInfo', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userInfo.html');
    });
    this.app.get('/updateUserInfo', (req, res) => {
      res.sendFile(__dirname + '/public/templates/updateUserInfo.html');
    });
  };
}
