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

  //계약 조회
  const checkContract = await axios.get(`/api/contract`);
  const contracts = checkContract.data;
  const matchingContracts = contracts.filter(contract => contract.trainerId == trainerId);

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
      //결제 성공시
      if (rsp.success) {
        //계약이 있을때
        if (contracts.length > 0) {
          const contract = matchingContracts[0]; // 필터링된 계약 중 첫 번째 계약을 가져옴
          const contractId = contract.contractId;
          const contractPtNumber = contract.ptNumber;

          const insertPtNumber = contractPtNumber + parseInt(ptNumber);
          const data = insertPtNumber;

          axios.patch(`api/contract/${contractId}`, { data });
          alert('계약이 추가되었습니다.');
          window.location.reload();
        } else {
          axios
            .post('/api/payment/kakao', rsp, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(function (response) {})
            .catch(function (error) {
              console.log(error);
              alert('결제에 실패했습니다.');
            });
          axios
            .post('api/contract', { trainerId, ptNumber })
            .then(function (response) {
              alert('결제 성공, 계약이 완료되었습니다.');
              location.reload();
            })
            .catch(function (error) {
              alert('결제 중 문제가 발생하였습니다. 고객센터로 문의해주세요.');
              location.reload();
            });
        }
      } else if (rsp.success == false) {
        // 결제 실패시
        alert('결제에 실패했습니다.');
      }
    }
  );
}
