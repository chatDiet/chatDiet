function joinChatroom(userId, trainerId) {
  location.href = `chat.html?roomId=${userId}${trainerId}&userId=${userId}&trainerId=${trainerId}`;
}
