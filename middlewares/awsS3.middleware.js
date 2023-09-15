const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const path = require('path');
const sharp = require('sharp');

const aws = require('aws-sdk');
aws.config.update({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    transforms: [
      {
        id: 'resized',
        key: function (req, file, cb) {
          let extension = path.extname(file.originalname);
          cb(null, Date.now().toString() + extension);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(100, 100)); // 이미지를 100x100 으로 리사이징
        },
      },
    ],
    acl: 'public-read-write',
  }),
});
const singleUpload = fieldName => {
  return function (req, res, next) {
    upload.single(fieldName)(req, res, function (err) {
      if (req.body.image === 'undefined') {
        return res.status(400).json({ message: '이미지 없음' });
      }
      if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
        // 이미지 필드가 누락된 경우 기본값을 설정
        console.log('이미지 필드 에러 ', err);
        req.file = null;
        next();
      } else if (err) {
        next();
      } else {
        next();
      }
    });
  };
};
const multipleUpload = fieldName => {
  return function (req, res, next) {
    upload.array(fieldName)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // 이미지 필드가 누락된 경우 기본값을 설정
        req.files = null;
        next();
      } else if (err) {
        next(err);
      } else {
        next();
      }
    });
  };
};
const deleteImages = async objectArr => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: objectArr,
      Quiet: false,
    },
  };
  try {
    const result = await s3.deleteObjects(params).promise();
    return result;
  } catch (err) {
    console.log('미들웨어 삭제 에러', err);
  }
};
module.exports = { singleUpload, multipleUpload, deleteImages };
