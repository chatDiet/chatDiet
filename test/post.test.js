import request from 'supertest'; // supertest를 사용하여 HTTP 요청을 테스트합니다.
import { ExpressApp } from '../app'; // ExpressApp 클래스를 가져옵니다.

// ExpressApp 클래스의 인스턴스를 생성합니다.
const expressApp = new ExpressApp();
const app = expressApp.app;

describe('POST /post', () => {
  it('should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post content.',
    };

    const response = await request(app)
      .post('/api/post') // ExpressApp 클래스에서 '/api' 경로를 사용하므로 '/api'를 추가합니다.
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN') // 필요에 따라 인증 토큰을 설정
      .send(newPost);

    expect(response.status).toBe(201); // HTTP 응답 상태 확인
    expect(response.body).toHaveProperty('message'); // 응답 바디에 message 속성이 있는지 확인
  });
});
