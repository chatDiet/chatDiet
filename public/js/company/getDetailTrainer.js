const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('companyId');
const trainerId = urlParams.get('trainerId');

// 트레이너 상세 조회
axios.get(`/api/companys/${companyId}/trainers/${trainerId}`).then(function (response) {
  const result = response.data.data;

  $('#trainers').empty();
  const trainerId = result.trainerId;
  const imageUrl = result.imageUrl;
  const trainerName = result.trainerName;
  const career = result.career;
  const ptContent = result.ptContent;
  const type = 'trainer';

  let temp_html = `
      <div id="trainer">
        <div><img id="image" src="${imageUrl}" /></div>
        <div>트레이너 이름 : ${trainerName}</div>
        <div>경력 : ${career}</div>
        <div>PT 내용 : ${ptContent}</div>
      </div>
      <div id="button">
        <button onclick="createContractBtn(${trainerId})">계약하기</button>
        <button id="createReviewBtn" onclick="createReviewBtn(${trainerId}, '${type}')">리뷰 작성</button>
      </div>`;

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
        const content = result[i].content;
        const grade = result[i].grade;
        const type = 'review';

        let t = `
      <div id="review">
        <div>내용 : ${content}</div>
        <div>평점 : ${grade}</div>
        <button onclick="reportBtn(${reviewId}, '${type}')">신고 버튼</button>
        <button onclick="deleteReviewBtn(${reviewId})">삭제 버튼</button>
      </div>
      `;
        $('#reviews').append(t);
      }
    }
  })
  .catch(function (error) {});
