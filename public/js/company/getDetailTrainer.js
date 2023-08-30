const urlParams = new URLSearchParams(window.location.search);
// const numberPattern = /\/(\d+)$/;
// const match = numberPattern.exec(currentURL);
// const numberValue = match[1];
// console.log(numberValue);
const companyId = urlParams.get('companyId');
const trainerId = urlParams.get('trainerId');

// 트레이너 상세 조회
axios.get(`/api/companys/${companyId}/trainers/${trainerId}`).then(function (response) {
  const result = response.data.data;

  $('#trainers').empty();
  const trainerId = result.trainerId;
  const userId = result.userId;
  const imageUrl = result.imageUrl;
  const trainerName = result.trainerName;
  const career = result.career;
  const ptContent = result.ptContent;
  const type = 'trainer';

  let temp_html = `
      <div id="trainer">
        <button onclick="createContractBtn(${trainerId})">계약</button>
        <div>trainerId : ${trainerId}</div>
        <div>userId : ${userId}</div>
        <div>imageUrl : ${imageUrl}</div>
        <div>trainerName : ${trainerName}</div>
        <div>career : ${career}</div>
        <div>ptContent : ${ptContent}</div>
      </div>
      <button onclick="createReviewBtn(${trainerId}, '${type}')">리뷰 작성</button>`;
  $('#trainers').append(temp_html);
});

// 트레이너 리뷰
axios
  .get(`/api/review/${trainerId}/trainer`)
  .then(function (response) {
    const result = response.data;

    if (result.length <= 0) {
      $('#reviews').empty();
      let temp_html = `<div>리뷰가 없습니다.</div>`;
      $('#reviews').append(temp_html);
    } else {
      $('#reviews').empty();
      for (let i = 0; result.length > i; i++) {
        const reviewId = result[i].reviewId;
        const userId = result[i].userId;
        const content = result[i].content;
        const grade = result[i].grade;
        const type = 'review';
        console.log(result[i]);

        let t = `
      <div id="review">
        <div>reviewId : ${reviewId}</div>
        <div>userId : ${userId}</div>
        <div>content : ${content}</div>
        <div>grade : ${grade}</div>
        <button onclick="reportBtn(${reviewId}, '${type}')">신고 버튼</button>
        <button onclick="deleteReviewBtn(${reviewId})">삭제 버튼</button>
      </div>
      `;
        $('#reviews').append(t);
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
