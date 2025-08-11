const userId = "dusoshsuofusfjjcso";

function generateUploadId() {
  return userId + Math.random().toString(36).substring(2, 10) + Date.now();
}

export default generateUploadId;
