let calendar;

const schduleList = document.querySelector('.scheduleList');

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  // 사이드바 닫기
  sidebar.classList.remove('active');
}

async function getUserInfo() {
  try {
    const userInfoResponse = await axios.get(`/api/userinfo`);
    const username = userInfoResponse.data.userName; // 서버에서 응답한 username
    return username;
  } catch (error) {
    alert('로그인 후 이용 가능');
    location.href = '/login';
  }
}
getUserInfo();

document.addEventListener('DOMContentLoaded', async function () {
  const response = await axios.get('/api/schedules');
  const events = response.data.map(item => {
    const startDate = new Date(item.date); // 날짜 정보 사용
    const endDate = new Date(item.date); // 날짜 정보 사용
    const startTime = item.startTime.split(':');
    const endTime = item.endTime.split(':');

    // 시작 시간과 종료 시간 설정
    startDate.setHours(startTime[0]);
    startDate.setMinutes(startTime[1]);
    endDate.setHours(endTime[0]);
    endDate.setMinutes(endTime[1]);

    return {
      title: item.title,
      scheduleId: item.scheduleId,
      start: startDate.toISOString(), // ISO 8601 형식으로 변환
      end: endDate.toISOString(), // ISO 8601 형식으로 변환
    };
  });

  var calendarEl = document.getElementById('trainerCalendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: events,
    dayMaxEvents: true,
    locale: 'ko',
    eventClick: function (info) {
      // 클릭한 날짜 정보 가져오기
      const scheduleId = info.event.extendedProps.scheduleId;

      // 사이드바 열기
      openSidebar(scheduleId);
    },
  });

  // 닫기 버튼 클릭 시 사이드바 닫기
  document.getElementById('close-sidebar-button').addEventListener('click', closeSidebar);

  calendar.render();
});

async function fetchSchedule(scheduleId) {
  try {
    const response = await axios.get(`/api/schedules/${scheduleId}`);
    return response.data; // 가져온 데이터 반환
  } catch (error) {
    throw error; // 에러를 다시 던져서 처리합니다.
  }
}

async function openSidebar(scheduleId) {
  const sidebar = document.querySelector('.sidebar');

  // 기존 내용 지우기
  sidebar.innerHTML = '';

  // 스케줄 데이터를 가져와서 표시
  try {
    const scheduleData = await fetchSchedule(scheduleId);

    // 스케줄 데이터를 표시할 HTML 요소 생성 및 추가
    const scheduleInfo = document.createElement('div');
    const username = await getUserInfo();
    scheduleInfo.innerHTML = `
    <div class="scheduleList" style="margin-left: 20px;">
      <p> 이름: ${username} 트레이너</p>
      <p> 제목: ${scheduleData.title}</p>
      <p> 날짜: ${scheduleData.date}</p>
      <p> 시작시간: ${scheduleData.startTime}</p>
      <p> 종료시간: ${scheduleData.endTime}</p>
      `;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-schedule-button');
    deleteButton.setAttribute('data-schedule-id', scheduleId);
    deleteButton.textContent = '삭제';

    // 삭제 버튼 클릭 이벤트 핸들러 설정
    deleteButton.addEventListener('click', async () => {
      const deleted = await deleteSchedule(scheduleId);
      if (deleted) {
        // 삭제 성공 시 사이드바 닫기
        closeSidebar();
      }
    });

    scheduleInfo.appendChild(deleteButton);
    sidebar.appendChild(scheduleInfo);
  } catch (error) {}

  // 닫기 버튼 추가
  const closeButton = document.createElement('button');
  closeButton.textContent = '닫기';
  closeButton.id = 'close-sidebar-button';
  sidebar.appendChild(closeButton);

  // 닫기 버튼 클릭 시 사이드바 닫기
  const closeSchedule = closeButton.addEventListener('click', closeSidebar);
  if (closeSchedule) {
    sidebar.innerHTML = '';
  }

  // 사이드바 열기
  sidebar.classList.add('active');

  deleteButton.style.display = 'inline-block';
  closeButton.style.display = 'inline-block';
}

async function deleteSchedule(scheduleId) {
  // axios를 사용하여 스케줄 삭제 요청 보내기
  const deleteSchedule = await axios.delete(`/api/schedules/${scheduleId}`);
  if (deleteSchedule.status === 200) {
    alert('스케줄이 성공적으로 삭제되었습니다.');
    location.reload();

    const scheduleInfoElements = document.querySelectorAll('.schedule-info');
    scheduleInfoElements.forEach(element => {
      const dataScheduleId = element.querySelector('.delete-schedule-button').getAttribute('data-schedule-id');
      if (dataScheduleId === scheduleId) {
        element.remove();
      }
    });
  }
}
