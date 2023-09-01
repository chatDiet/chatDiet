// HTML 요소 선택
const contractList = document.querySelector('.contract');

async function getUserInfo() {
  try {
    const userInfoResponse = await axios.get(`/api/userinfo`);
    const username = userInfoResponse.data.userName; // 서버에서 응답한 username
    return username;
  } catch (error) {
    console.error('유저 정보가 존재하지 않습니다.', error);
  }
}

async function getContracts() {
  try {
    const contractResponse = await axios.get('/api/contract');
    const contract = contractResponse.data;
    console.log(contract, 'contract');
    const contractListHTML = await Promise.all(
      contract.map(async contract => {
        const username = await getUserInfo();
        const contractId = contract.contractId;
        return `
        <div class="contract">
          <h1>${username}회원님</h1>
          <div class="contract-button">
            <button class="deleteContract" data-contract-id="${contractId}">계약취소하기</button>
            <a href='/calender'><button>회원님 캘린더 보기</button></a>
            </div>
        </div>
      `;
      })
    );

    contractList.innerHTML = contractListHTML.join('');
  } catch (error) {
    console.error('계약 데이터를 가져오는 중 오류 발생:', error);
  }
}
getContracts();
