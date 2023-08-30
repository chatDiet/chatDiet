let calenderYear, calenderMonth;
window.onload = function () {
  buildCalendar();
}; // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화
// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
export function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

  let tbody_Calendar = document.querySelector('.Calendar > tbody');
  document.getElementById('calYear').innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
  document.getElementById('calMonth').innerText = leftPad(nowMonth.getMonth() + 1); // 월 숫자 갱신

  while (tbody_Calendar.rows.length > 0) {
    // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가

  for (let j = 0; j < firstDate.getDay(); j++) {
    // 이번달 1일의 요일만큼
    let nowColumn = nowRow.insertCell(); // 열 추가
  }

  for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

    let nowColumn = nowRow.insertCell(); // 새 열을 추가하고

    let newDIV = document.createElement('p');
    newDIV.innerHTML = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력
    nowColumn.appendChild(newDIV);

    if (nowDay.getDay() == 6) {
      // 토요일인 경우
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }

    if (nowDay < today) {
      // 지난날인 경우
      newDIV.className = 'pastDay';
    } else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
      // 오늘인 경우
      newDIV.className = 'today';
      newDIV.onclick = function () {
        choiceDate(this);
      };
    } else {
      // 미래인 경우
      newDIV.className = 'futureDay';
      newDIV.onclick = function () {
        choiceDate(this);
      };
    }
  }
  const yearElement = document.getElementById('calYear');
  const monthElement = document.getElementById('calMonth');
  calenderYear = yearElement.innerText; // 연도 가져오기
  calenderMonth = monthElement.innerText; // 월 가져오기
}
// 이전달 버튼 클릭
export function prevCalendar() {
  nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate()); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성
}
// 다음달 버튼 클릭
export function nextCalendar() {
  nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate()); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성
}

export function getSelectedDate() {
  const selectedDateElement = document.querySelector('.choiceDay');
  if (selectedDateElement) {
    // 선택한 날짜 텍스트를 가져옴
    const selectedDateText = selectedDateElement.textContent;
    // 선택한 날짜와 연도, 월 정보를 모두 반환
    const dateFormat = `${calenderYear}-${calenderMonth}-${selectedDateText}`;
    return dateFormat;
  } else {
    return null; // 선택된 날짜가 없을 경우 null 반환
  }
}
// 선택한 날짜에 해당하는 스케줄을 표시
export function showSchedule(dateFormat, date) {
  const selectedDate = dateFormat; // 예: 달력에서 선택한 날짜

  const scheduleTitle = document.getElementById('scheduleTitle');
  const scheduleList = document.getElementById('scheduleList');

  if (scheduleList) {
    // 스케줄 목록을 초기화
    scheduleList.innerHTML = '';
  }

  axios
    .get(`http://localhost:3000/api/schedules`)
    .then(response => {
      const scheduleData = response.data;
      console.log('scheduleData', scheduleData);
      console.log('dateFormat', dateFormat);
      if (!scheduleData.date || scheduleData.length === 0) {
        // 스케줄이 없는 경우
        if (scheduleTitle) {
          const userResponse = window.confirm('스케줄이 없습니다. 새로운 스케줄을 추가하시겠습니까?');

          if (userResponse) {
            // 사용자가 스케줄을 추가하려는 경우
            axios
              .post('http://localhost:3000/api/schedules', { date: selectedDate }) // 날짜를 'YYYY-MM-DDTHH:mm:ss.sssZ' 형식으로 보냄
              .then(response => {
                // POST 요청 성공 시 처리
                console.log('스케줄 추가 요청 성공:', response.data);

                // 이후 추가적인 처리를 수행하거나 사용자에게 메시지를 표시할 수 있습니다.
              })
              .catch(error => {
                // POST 요청 실패 시 처리
                console.error('스케줄 추가 요청 오류:', error);

                // 오류 처리를 수행하거나 사용자에게 오류 메시지를 표시할 수 있습니다.
              });
          }
        }
      } else {
        // 스케줄이 있는 경우
        if (scheduleTitle) {
          scheduleTitle.textContent = '스케줄';
        }

        if (scheduleList) {
          scheduleData.forEach(schedule => {
            const listItem = document.createElement('div'); // <div> 요소 생성
            listItem.textContent = schedule.title;
            scheduleList.appendChild(listItem);
          });
        }
      }
    })
    .catch(error => {
      console.error('스케줄 조회 오류:', error);
    });
}
// 선택한 날짜 갱신
export function choiceDate(newDIV) {
  if (document.getElementsByClassName('choiceDay')[0]) {
    // 기존에 선택한 날짜가 있으면
    document.getElementsByClassName('choiceDay')[0].classList.remove('choiceDay'); // 해당 날짜의 "choiceDay" class 제거
  }
  newDIV.classList.add('choiceDay'); // 선택된 날짜에 "choiceDay" class 추가

  // 클릭된 요소의 데이터나 ID 등을 가져올 수 있습니다.
  const selectedDate = getSelectedDate();
  showSchedule(selectedDate);
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
export function leftPad(value) {
  if (value < 10) {
    value = '0' + value;
    return value;
  }
  return value;
}
