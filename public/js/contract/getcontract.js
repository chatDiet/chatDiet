// HTML 요소 선택
const contractList = document.querySelector('.contract');

function getUserInfo(userNames) {
  try {
    let username;
    userNames.map(result => {
      username = result.userName;
    });
    return username;
  } catch (error) {}
}

async function getContracts() {
  try {
    const contractResponse = await axios.get('/api/contract');
    const contract = contractResponse.data;
    const contractListHTML = await Promise.all(
      contract.map(contract => {
        const username = getUserInfo(contract.user.userInfos);
        const contractId = contract.contractId;
        const userId = contract.userId;
        const trainerId = contract.trainerId;
        const ptNumber = contract.ptNumber;
        return `
        <div class="contractList">
          <h1 id="userName">${username} 회원님</h1>
          <h1 id="userName">남은 PT 횟수 : ${ptNumber}</h1>
          <div class="contract-button">
            <button class="deleteContract" data-contract-id="${contractId}">계약취소하기</button>
            <button onclick="getTrainerUserCalender(${userId})">회원님 캘린더 보기</button></a>
            <button onclick="trainerChatRoomBtn(${userId},${trainerId})">채팅방 입장</button>
            <button onclick="ptNumBtn(${contractId})">PT 1회 차감</button>
            </div>
        </div>
      `;
      })
    );

    contractList.innerHTML = contractListHTML.join('');
  } catch (error) {
    alert('업체 등록 후 이용가능합니다.');
    location.href = '/createtrainer';
  }
}
getContracts();

ptNumBtn = contractId => {
  axios
    .put(`/api/contract/${contractId}`)
    .then(function (reponse) {
      alert('PT 1회 완료');
      location.reload();
    })
    .catch(function (error) {
      alert('PT 완료 실패');
    });
};

getTrainerUserCalender = user => {
  location.href = `/userCalender?user=${user}`;
};
