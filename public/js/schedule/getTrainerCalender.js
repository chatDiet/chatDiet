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
    console.log(userInfoResponse.data);
    const username = userInfoResponse.data.userName; // 서버에서 응답한 username
    return username;
  } catch (error) {
    alert('로그인 후 이용 가능');
    location.href = '/login';
    console.error('유저 정보가 존재하지 않습니다.', error);
  }
}
getUserInfo();

document.addEventListener('DOMContentLoaded', async function () {
  const response = await axios.get('/api/schedules');
  const events = response.data.map(item => ({
    title: item.title,
    date: item.date,
    scheduleId: item.scheduleId,
    startTime: item.startTime,
    endTime: item.endTime,
  }));
  var calendarEl = document.getElementById('trainerCalendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: events,
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
    console.error('스케줄 데이터를 가져오는 데 문제가 발생했습니다.', error);
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
    <div class="scheduleList">
      <p> ${username} 트레이너</p>
      <p>${scheduleData.title}</p>
      <p> ${scheduleData.date}</p>
      <p> ${scheduleData.startTime}</p>
      <p> ${scheduleData.endTime}</p>
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
  } catch (error) {
    console.error('스케줄 데이터를 가져오는 동안 문제가 발생했습니다.', error);
  }

  // 닫기 버튼 추가
  const closeButton = document.createElement('button');
  closeButton.textContent = '닫기';
  closeButton.id = 'close-sidebar-button';
  sidebar.appendChild(closeButton);

  // 닫기 버튼 클릭 시 사이드바 닫기
  const closeSchedule = closeButton.addEventListener('click', closeSidebar);
  if (closeSchedule) {
    console.log('닫히냐');
    sidebar.innerHTML = '';
  }

  // 사이드바 열기
  sidebar.classList.add('active');
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
