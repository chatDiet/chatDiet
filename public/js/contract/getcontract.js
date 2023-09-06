// HTML 요소 선택
const contractList = document.querySelector('.contract');

function getUserInfo(userNames) {
  try {
    let username;
    userNames.map(result => {
      username = result.userName;
    });
    return username;
  } catch (error) {
    console.error(error);
  }
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
        return `
        <div class="contractList">
          <h1 id="userName">${username} 회원님</h1>
          <div class="contract-button">
            <button class="deleteContract" data-contract-id="${contractId}">계약취소하기</button>
            <a href='/userCalender'><button>회원님 캘린더 보기</button></a>
            <button onclick="trainerChatRoomBtn(${userId},${trainerId})">채팅방 입장</button>
            </div>
        </div>
      `;
      })
    );

    contractList.innerHTML = contractListHTML.join('');
  } catch (error) {
    console.error('계약 데이터를 가져오는 중 오류 발생:', error);
    alert('업체 등록 후 이용가능합니다.');
    location.href = '/createtrainer';
  }
}
getContracts();
