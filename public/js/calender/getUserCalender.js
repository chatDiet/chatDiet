let calendar;

const typeMapping = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  exercise: '운동',
};

document.addEventListener('DOMContentLoaded', async function () {
  const response = await axios.get('/api/calenders');
  //   console.log(response);
  const events = response.data.map(item => ({
    title: '[' + typeMapping[item.type] + ']' + item.title,
    start: new Date(item.date),
    url: `/calender/${item.calenderId}`,
  }));

  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    displayEventTime: false,
    events: events,
    eventClick: function (info) {
      console.log(info);
      info.jsEvent.preventDefault(); // don't let the browser navigate

      if (info.event.url) {
        // window.open(info.event.url);
        location.href = info.event.url;
      }
    },
  });
  calendar.render();
});
