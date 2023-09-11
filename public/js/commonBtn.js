getDetailCompanyBtn = companyId => {
  location.href = `/detailCompany?companyId=${companyId}`;
};

getDetailTrainerBtn = (companyId, trainerId) => {
  location.href = `/detailTrainer?companyId=${companyId}&trainerId=${trainerId}`;
};

getDetailCommunityBtn = postId => {
  location.href = `/detailCommunity?postId=${postId}`;
};

createPostBtn = () => {
  location.href = `/createPost`;
};

joinChatroom = (userId, trainerId) => {
  location.href = `/chatRoom?roomId=${userId}${trainerId}&userId=${userId}&trainerId=${trainerId}`;
};

updateTrainerInfoBtn = (companyId, trainerId) => {
  location.href = `/updateTrainerInfo?companyId=${companyId}&trainerId=${trainerId}`;
};

trainerChatRoomBtn = (userId, trainerId) => {
  location.href = `/trainerChatRoom?roomId=${userId}${trainerId}&userId=${userId}&trainerId=${trainerId}`;
};
