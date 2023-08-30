getCompanyBtn = () => {
  location.href = `/companyMain`;
};

getDetailCompanyBtn = companyId => {
  location.href = `/detailCompany?companyId=${companyId}`;
};

getDetailTrainerBtn = (companyId, trainerId) => {
  location.href = `/detailTrainer?companyId=${companyId}&trainerId=${trainerId}`;
};

getCommunityBtn = () => {
  location.href = `/communityMain`;
};

getDetailCommunityBtn = postId => {
  location.href = `/detailCommunity?postId=${postId}`;
};

createPostBtn = () => {
  location.href = `/createPost`;
};

getChatListBtn = () => {
  location.href = `/chatMain`;
};

joinChatroom = (userId, trainerId) => {
  location.href = `/chatRoom?roomId=${userId}${trainerId}&userId=${userId}&trainerId=${trainerId}`;
};
