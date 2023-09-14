const gotoSignupButton = document.getElementById('goto-signup-button');
gotoSignupButton.addEventListener('click', () => {
  // 사용자 메인 페이지로 이동
  window.location.href = '/signupCategory';
});

const gotoLoginButton = document.getElementById('goto-login-button');
gotoLoginButton.addEventListener('click', () => {
  // 사용자 메인 페이지로 이동
  window.location.href = '/login';
});

function getCookie() {
  const cookie = decodeURIComponent(document.cookie);
  const [name, value] = cookie.split('=');
  return value;
}

const isLoggedIn = getCookie();
const loginButton = document.getElementById('goto-login-button');
const signupButton = document.getElementById('goto-signup-button');
const logoutButton = document.getElementById('logout-button');
if (isLoggedIn) {
  // 로그인한 경우
  loginButton.style.display = 'none'; // 로그인 버튼 숨김
  signupButton.style.display = 'none'; // 회원가입 버튼 숨김
  logoutButton.style.display = 'block'; // 로그아웃 버튼 표시
} else {
  loginButton.style.display = 'block'; // 로그인 버튼 표시
  signupButton.style.display = 'block'; // 회원가입 버튼 표시
  logoutButton.style.display = 'none'; // 로그아웃 버튼 숨김
}
