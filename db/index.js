import sequelize from 'sequelize';
import Calender from './models/calender';
import Comment from './models/comment';
import Company from './models/company';
import Contract from './models/contract';
import Inquiry from './models/inquiry';
import Post from './models/post';
import Report from './models/report';
import Review from './models/review';
import Schedule from './models/schedule';
import Trainer from './models/trainer';
import User from './models/user';
import Admin from './models/admin';
import UserInfo from './models/userInfo';
import relations from './relations';

Object.values(relations).forEach(relationsFunction => {
  relationsFunction();
});

export { sequelize, Calender, Comment, Company, Contract, Inquiry, Post, Report, Review, Schedule, Trainer, User, Admin, UserInfo };
