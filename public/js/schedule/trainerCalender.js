async function detailCalender() {
  try {
    const currentURL = window.location.href;

    // URL에서 숫자 부분 추출
    const numberPattern = /\/(\d+)$/;
    const match = numberPattern.exec(currentURL);

    const numberValue = match[1];

    const response = await axios.get(`/api/schedules`);
    const eventData = response.data;

    // eventData를 활용하여 페이지에 데이터 표시하는 로직 작성
    const detailCalenderElement = document.getElementById('detailCalender');

    const eventTitleElement = document.createElement('h2');
    eventTitleElement.textContent = eventData.title;
    detailCalenderElement.appendChild(eventTitleElement);

    const eventTypeElement = document.createElement('h3');
    eventTypeElement.textContent = typeMapping[eventData.type];
    detailCalenderElement.appendChild(eventTypeElement);

    const formattedDate = formatDate(eventData.date);
    const eventDateElement = document.createElement('p');
    eventDateElement.textContent = formattedDate;
    detailCalenderElement.appendChild(eventDateElement);

    const eventContentElement = document.createElement('p');
    eventContentElement.textContent = eventData.content;
    detailCalenderElement.appendChild(eventContentElement);

    // 필요한 데이터를 적절한 요소에 표시해주세요.
  } catch (error) {}
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
}

detailCalender();
