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

    this.app.get('/login', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userPages/login.html');
    });

    this.app.get('/signup', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userPages/signup.html');
    });

    this.app.get('/inquiry', (req, res) => {
      res.sendFile(__dirname + '/public/templates/inquiryPages/setInquiry.html');
    });

    this.app.get('/inquirys', (req, res) => {
      res.sendFile(__dirname + '/public/templates/inquiryPages/getInquiry.html');
    });

    this.app.get('/admin', (req, res) => {
      res.sendFile(__dirname + '/public/templates/adminPage.html');
    });

    this.app.get('/signupCategory', (req, res) => {
      res.sendFile(__dirname + '/public/templates/userPages/signupCategory.html');
    });
  };
}
