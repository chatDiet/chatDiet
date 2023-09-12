document.addEventListener('DOMContentLoaded', async () => {
  const editButton = document.getElementById('edit-button');
  const deleteButton = document.getElementById('delete-button');

  axios.get(`/api/companys/owner`).then(function (response) {
    const result = response.data;

    const imageUrls = result.imageUrl.split(',');

    const smallImagesContainer = document.getElementById('companyImage');

    for (const imageUrl of imageUrls) {
      const imgElement = document.createElement('img');
      imgElement.src = imageUrl;
      imgElement.classList.add('small-image');
      smallImagesContainer.appendChild(imgElement);
    }

    const infoBox = document.getElementById('info-box');
    infoBox.innerHTML = `
        <h2 id="company-name">${result.companyName}</h2>
        <p id="company-address">${result.map}</p>
        <div class="info-item">
          <h3>운영시간</h3>
          <p>${result.time}</p>
        </div>
        <div class="info-item">
          <h3>운영 프로그램</h3>
          <p>${result.additional}</p>
        </div>
        <div class="info-item">
          <h3>부가 서비스</h3>
          <p>${result.service}</p>
        </div>
        <div class="info-item">
          <h3>전화번호</h3>
          <p>+82 ${result.phoneNumber}</p>
        </div>
        <div class="info-item">
          <h3>바로가기</h3>
          <p><a href="${result.link}">업체 홈페이지</a></p>
        </div>
      `;

    // 업체 리뷰 조회
    axios
      .get(`/api/review/${result.companyId}/company`)
      .then(function (response) {
        const result = response.data;
        for (let i = 0; result.length > i; i++) {
          const content = result[i].content;
          const grade = result[i].grade;
          const companyReview = document.getElementById('companyReview');
          companyReview.innerHTML = `<div>
                                        <div>${content}</div>
                                        <div>${grade}</div>
                                    </div>`;
        }
      })
      .catch(function (error) {});
    axios
      .get(`/api/companys/${result.companyId}/trainer`)
      .then(function (response) {
        const result = response.data.data;

        const trainerList = document.getElementById('trainer');
        trainerList.innerHTML = '';

        for (let i = 0; result.length > i; i++) {
          const trainerContainer = document.createElement('div'); // 새로운 컨테이너 생성
          trainerContainer.classList.add('trainer-card');

          trainerContainer.innerHTML = `<button class="trainer-card">
          <img src="${result[i].imageUrl}" alt="Trainer Image" class="trainer-image">
          <p>${result[i].trainerName}</p>
          <p>${result[i].career}</p>
          <button onclick="deleteTrainerBtn(${result[i].companyId}, ${result[i].trainerId})">트레이너 삭제</button>
        </button>`;

          trainerList.appendChild(trainerContainer);
        }
      })
      .catch(function (error) {});

    // 업체 수정 버튼
    editButton.addEventListener('click', async () => {
      window.location.href = `/putOwnerCompany?companyId=${result.companyId}`;
    });

    // 업체 삭제 버튼
    deleteButton.addEventListener('click', async () => {
      const confirmDelete = confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        try {
          const deleteResponse = await axios.delete(`/api/company/${result.companyId}`);
          if (deleteResponse.status === 200) {
            alert('업체 정보가 삭제되었습니다.');
            window.location.href = '/getOwnerCompany';
          } else {
            alert('업체 정보 삭제에 실패했습니다.');
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    });
  });
});

deleteTrainerBtn = (companyId, trainerId) => {
  const confirmDelete = window.confirm('삭제하시겠습니까?');

  if (confirmDelete) {
    axios
      .delete(`/api/companys/${companyId}/trainers/${trainerId}`)
      .then(function (response) {
        alert('트레이너 삭제 성공');
        location.reload();
      })
      .catch(function (error) {
        alert(error);
      });
  }
};
