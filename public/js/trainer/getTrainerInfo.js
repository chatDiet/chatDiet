axios
  .get('/api/trainer')
  .then(function (response) {
    const result = response.data.data;
    $('.main-section').empty();
    const trainerId = result.trainerId;
    const trainerName = result.trainerName;
    const imageUrl = result.imageUrl;
    const companyId = result.companyId;
    const career = result.career;
    const ptContent = result.ptContent;

    let temp_html = `
      <div id="myTainerInfo">
        <div>        
        <img id="image" src="${imageUrl}" />
          <div id="trainerName">트레이너 이름 : ${trainerName}</div>
        </div>
        <div>
          <div id="career">경력 : ${career}</div>
          <div id="ptContent">수업 내용 : ${ptContent}</div>
        </div>
      </div>
      <button onclick=updateTrainerInfoBtn(${companyId},${trainerId})>정보 수정</button>
      `;
    $('.main-section').append(temp_html);
  })
  .catch(function (error) {
    alert('업체 등록 후 이용가능합니다.');
    location.href = '/createtrainer';
  });
