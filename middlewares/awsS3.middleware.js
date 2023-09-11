const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const path = require('path');
const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
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
      // if (req.body.images === 'undefined') {
      //   return res.status(400).json({ message: '이미지 없음' });
      // }
      console.log(req.body);
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
