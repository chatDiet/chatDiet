var IMP = window.IMP;

var today = new Date();
var hours = today.getHours(); // 시
var minutes = today.getMinutes(); // 분
var seconds = today.getSeconds(); // 초
var milliseconds = today.getMilliseconds();
var makeMerchantUid = `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;

$(document).ready(function () {
  $('#payment').click(function () {
    payment();
  });
});

function payment(data) {
  IMP.init('imp37646573'); // 가맹점 식별코드
  IMP.request_pay(
    {
      pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
      pay_method: 'card', // 결제 방식
      merchant_uid: 'IMP' + makeMerchantUid, // 결제 고유 번호
      name: 'pt', // 제품명
      amount: 100, // 가격
      //구매자 정보 ↓
      buyer_email: 'meju@naver.com',
      buyer_name: '메주',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
    },

    async function (rsp) {
      if (rsp.success) {
        //결제 성공시
        // const data = rsp;
        // console.log('data', data);
        axios
          .post('/api/payment/kakao', rsp)
          .then(function (response) {
            console.log('response', response);

            //결제 성공시 프로젝트 DB저장 요청

            if (response.status == 200) {
              // DB저장 성공시
              alert('결제 완료!');
              window.location.reload();
            } else {
              // 결제완료 후 DB저장 실패시
              alert(`error:[${response.status}]\n결제요청이 승인된 경우 관리자에게 문의바랍니다.`);
              // DB저장 실패시 status에 따라 추가적인 작업 가능성
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (rsp.success == false) {
        // 결제 실패시
        alert(rsp.error_msg);
      }
    }
  );
}
