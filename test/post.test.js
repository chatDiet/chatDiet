import request from 'supertest';
import express from 'express';

const app = express();
const port = 80;

app.listen(port, () => {
  console.log(`server on ${port}`);
});

describe('Create Post API', () => {
  it('should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post content.',
    };

    const response = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN') // 필요에 따라 인증 토큰을 설정
      .send(newPost);

    expect(response.status).toBe(201); // HTTP 응답 상태 확인
    expect(response.body).toHaveProperty('message'); // 응답 바디에 message 속성이 있는지 확인
  });

  it('should return an error if title is missing', async () => {
    const invalidPost = {
      title: '', // 제목 누락
      content: 'This is a test post content.',
    };

    const response = await request(app).post('/post').set('Authorization', 'Bearer YOUR_AUTH_TOKEN').send(invalidPost);

    expect(response.status).toBe(400); // 필수 필드 누락으로 400 상태 확인
    expect(response.body).toHaveProperty('message'); // 응답 바디에 message 속성이 있는지 확인
  });

  it('should return an error if content is missing', async () => {
    const invalidPost = {
      title: 'Test Post',
      content: '', // 내용 누락
    };

    const response = await request(app).post('/post').set('Authorization', 'Bearer YOUR_AUTH_TOKEN').send(invalidPost);

    expect(response.status).toBe(400); // 필수 필드 누락으로 400 상태 확인
    expect(response.body).toHaveProperty('message'); // 응답 바디에 message 속성이 있는지 확인
  });

  it('should return an error if not authenticated', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post content.',
    };

    const response = await request(app).post('/post').send(newPost); // 인증 토큰 누락

    expect(response.status).toBe(401); // 인증되지 않음으로 401 상태 확인
    expect(response.body).toHaveProperty('message'); // 응답 바디에 message 속성이 있는지 확인
  });

  it('should return an error if user ID is missing', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post content.',
    };

    const response = await request(app).post('/post').set('Authorization', 'Bearer YOUR_AUTH_TOKEN').send(newPost);

    expect(response.status).toBe(401); // 사용자 ID 누락으로 401 상태 확인
    expect(response.body).toHaveProperty('message'); // 응답 바디에 message 속성이 있는지 확인
  });

  // 다른 테스트 케이스 추가 가능
});
