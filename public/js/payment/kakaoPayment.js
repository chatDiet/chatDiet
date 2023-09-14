var IMP = window.IMP;

var today = new Date();
var hours = today.getHours(); // 시
var minutes = today.getMinutes(); // 분
var seconds = today.getSeconds(); // 초
var milliseconds = today.getMilliseconds();
var makeMerchantUid = `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;

$(document).ready(function () {
  $('#savePtModal').click(function () {
    payment();
  });
});

async function payment() {
  const response = await axios.get(`/api/companys/${companyId}/trainers/${trainerId}`);

  const trainerInfo = response.data.data;

  const ptContent = trainerInfo.ptContent;
  const ptAmount = trainerInfo.ptAmount;

  IMP.init('imp37646573'); // 가맹점 식별코드
  const ptNumber = $('#ptNumber').val();

  IMP.request_pay(
    {
      pg: 'kakaopay.TC0ONETIME', // PG사 코드표에서 선택
      pay_method: 'card', // 결제 방식
      merchant_uid: 'IMP' + makeMerchantUid + '1', // 결제 고유 번호
      name: ptContent, // 제품명
      ptNumber: ptNumber,
      amount: ptNumber * ptAmount, // 가격
    },

    async function (rsp) {
      if (rsp.success) {
        //결제 성공시

        axios
          .post('/api/payment/kakao', rsp, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(function (response) {
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
            alert('결제에 실패했습니다.');
          });
        axios
          .post('api/contract', { trainerId, ptNumber })
          .then(function (response) {
            alert(response.data);
            location.reload();
          })
          .catch(function (error) {
            alert(error.response.data);
            location.reload();
          });
      } else if (rsp.success == false) {
        // 결제 실패시
        alert(rsp.error_msg);
      }
    }
  );
}
