function getNameWithoutExt(filename) {
  if (!filename) return "";

  const lastDotIndex = filename.lastIndexOf(".");

  // If no dot found or dot is first character (hidden files like .env)
  if (lastDotIndex <= 0) return filename;

  return filename.substring(0, lastDotIndex);
}

export default getNameWithoutExt;
