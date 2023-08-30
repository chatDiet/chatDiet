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
getUserInfo();

async function getContracts() {
  try {
    const contractResponse = await axios.get('/api/contract');
    const contract = contractResponse.data;
    // console.log(contractId, 'contractId');
    // 사용자 정보를 가져오기 위한 쿼리 또는 API 호출을 수행
    // 계약 목록을 생성하고 HTML에 추가
    const contractListHTML = await Promise.all(
      contract.map(async contract => {
        const username = await getUserInfo();
        const contractId = contract.contractId;
        return `
        <div class="contract">
          <h1>${username}회원님</h1>
          <p>PT:${contract.ptNumber}</p>
          <div class="contract-button">
            <button class="deleteContract" data-contract-id="${contractId}">계약취소하기</button>
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
