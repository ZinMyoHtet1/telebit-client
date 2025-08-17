// const userId = "dusoshsuofusfjjcso";

function generateUploadId() {
  return Math.random().toString(36).substring(2, 16) + Date.now();
}

export default generateUploadId;
