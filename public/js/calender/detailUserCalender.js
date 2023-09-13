const typeMapping = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  exercise: '운동',
};

let calenderId = 0;

async function detailCalender() {
  try {
    const currentURL = window.location.href;

    // URL에서 숫자 부분 추출
    const numberPattern = /\/(\d+)$/;
    const match = numberPattern.exec(currentURL);

    const numberValue = match[1];

    const response = await axios.get(`/api/calender/${numberValue}`);
    const eventData = response.data;
    calenderId = `${numberValue}`;

    // eventData를 활용하여 페이지에 데이터 표시하는 로직 작성
    const detailCalenderElement = document.getElementById('detailCalender');

    const eventTitleElement = document.createElement('h2');
    eventTitleElement.textContent = '제목: ' + eventData.title; // 제목 레이블 추가
    detailCalenderElement.appendChild(eventTitleElement);

    const eventTypeElement = document.createElement('h3');
    eventTypeElement.textContent = '유형: ' + typeMapping[eventData.type]; // 유형 레이블 추가
    detailCalenderElement.appendChild(eventTypeElement);

    const formattedDate = formatDate(eventData.date);
    const eventDateElement = document.createElement('p');
    eventDateElement.textContent = '날짜: ' + formattedDate; // 날짜 레이블 추가
    detailCalenderElement.appendChild(eventDateElement);

    const eventImageElement = document.createElement('img');
    eventImageElement.src = eventData.imageUrl;
    eventImageElement.alt = '이벤트 이미지';
    detailCalenderElement.appendChild(eventImageElement);

    const eventContentElement = document.createElement('p');
    eventContentElement.textContent = '내용: ' + eventData.content; // 내용 레이블 추가
    detailCalenderElement.appendChild(eventContentElement);

    // 필요한 데이터를 적절한 요소에 표시해주세요.
  } catch (error) {}
}
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
}

// 삭제 버튼 클릭 시 이벤트 핸들러
const deleteButton = document.getElementById('deleteButton');
deleteButton.addEventListener('click', async () => {
  const deleteCalender = await axios.delete(`/api/calenders/${calenderId}`);
  if (deleteCalender.status === 200) {
    alert('스케줄이 성공적으로 삭제되었습니다.');
    location.href = '/calender';
  }
});

detailCalender();
