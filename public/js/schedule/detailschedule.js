// document.addEventListener('DOMContentLoaded', async function () {
//   const response = await axios.get('/api/schedules');
//   const events = response.data.map(item => ({
//     title: item.title,
//     start: item.date,
//   }));

//   var calendarEl = document.getElementById('trainerCalendar');
//   calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: 'dayGridMonth',
//     events: events,
//     eventClick: function (info) {
//       openSidebar(info.event); // 클릭한 이벤트 정보를 넘김
//       console.log(info.event);
//     },
//   });

//   // 닫기 버튼 클릭하면 사이드바 닫기
//   document.getElementById('close-sidebar-button').addEventListener('click', closeSidebar);

//   calendar.render();
// });

// function openSidebar(event) {
//   const sidebar = document.querySelector('.sidebar');
//   sidebar.innerHTML = ''; // 사이드바 초기화

//   const title = document.createElement('h2');
//   title.textContent = event.title;

//   // 원하는 이벤트 정보를 사이드바에 추가할 수 있음
//   const eventDetails = document.createElement('p');
//   eventDetails.textContent = `이벤트 날짜: ${event.start}`;

//   sidebar.appendChild(title);
//   sidebar.appendChild(eventDetails);

//   sidebar.classList.add('active');
// }

// function closeSidebar() {
//   const sidebar = document.querySelector('.sidebar');
//   sidebar.classList.remove('active');
// }
