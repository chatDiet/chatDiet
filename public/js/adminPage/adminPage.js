const gotoInquirysButton = document.getElementById('view-inquiries-button');
gotoInquirysButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/inquirys';
});

const gotoReportsButton = document.getElementById('view-reports-button');
gotoReportsButton.addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/reports';
});
