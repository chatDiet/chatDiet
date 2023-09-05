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
