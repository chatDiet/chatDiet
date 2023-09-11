import jwt from 'jsonwebtoken';

async function isAuth(req, res, next) {
  const token = req.cookies.authorization;
  if (!token) {
    return res.status(400).json({ message: '토큰이 제공되지 않았습니다.' });
  }

  try {
    const extractedToken = token.split(' ')[1]; // 'Bearer' 접두사 제거 후 토큰 추출
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    if (decoded) {
      const userId = decoded.userId;
      if (userId) {
        res.locals.userId = userId; // 유저 ID를 res.locals.user에 저장
        next();
      } else {
        return res.status(400).json({ message: '존재하지 않는 회원입니다.' });
      }
    } else {
      return res.status(400).json({ message: '토큰이 유효하지 않습니다.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: '유효성 검증에 실패했습니다.' });
  }
}

module.exports = isAuth;
