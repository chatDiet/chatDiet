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
    // 헬스장 사장님 등록
    this.app.get('/setOwnerCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/OwnerCompany/setOwnerCompany.html');
    });
    // 헬스장 사장님 업체 정보 조회
    this.app.get('/getOwnerCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/OwnerCompany/getOwnerCompany.html');
    });
    // 헬스장 사장님 업체 정보 수정
    this.app.get('/putOwnerCompany', (req, res) => {
      res.sendFile(__dirname + '/public/templates/OwnerCompany/putOwnerCompany.html');
    });
  };
}
