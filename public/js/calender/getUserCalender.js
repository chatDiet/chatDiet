let calendar;

const typeMapping = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  exercise: '운동',
};

document.addEventListener('DOMContentLoaded', async function () {
  const response = await axios
    .get('/api/calenders')
    .then(function (response) {
      const events = response.data.map(item => ({
        title: '[' + typeMapping[item.type] + ']' + item.title,
        start: new Date(item.date),
        url: `/calender/${item.calenderId}`,
      }));

      var calendarEl = document.getElementById('calendar');
      calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        displayEventTime: false,
        scrollTime: '08:00:00',
        dayMaxEvents: true,
        locale: 'ko',
        events: events,

        eventClick: function (info) {
          info.jsEvent.preventDefault(); // don't let the browser navigate

          if (info.event.url) {
            location.href = info.event.url;
          }
        },
      });
      calendar.render();
    })
    .catch(function (error) {
      alert('로그인이 필요한 서비스입니다.');
      location.href = '/login';
    });
});
