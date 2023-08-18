import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }
  //
  setAppSettings = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
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
}
