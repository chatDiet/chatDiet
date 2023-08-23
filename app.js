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
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/public/test.html');
    });

    this.app.get('/kakao', (req, res) => {
      res.sendFile(__dirname + '/public/kakao.html');
    });
  };
}
