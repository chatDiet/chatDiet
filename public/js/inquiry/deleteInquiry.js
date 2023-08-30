import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const deleteInquiryButton = document.getElementById('delete-inquiry-button');

deleteInquiryButton.addEventListener('click', () => {
  const inquiryId = '여기에_삭제할_조회_아이디_입력'; // 실제로 삭제할 조회 아이디로 교체해야 합니다.

  axios
    .delete(`/api/inquiries/${inquiryId}`)
    .then(response => {
      console.log('삭제 성공:', response.data);
      // 삭제가 성공한 경우 수행할 작업을 여기에 추가할 수 있습니다.
    })
    .catch(error => {
      console.error('삭제 실패:', error);
      // 삭제가 실패한 경우 처리할 작업을 여기에 추가할 수 있습니다.
    });
});
