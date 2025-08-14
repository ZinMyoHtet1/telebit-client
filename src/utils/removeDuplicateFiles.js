function removeDuplicateFiles(files) {
  const uniqueFiles = [];
  const fileMap = new Map(); // To track seen files
  files.forEach((file) => {
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

    if (!fileMap.has(fileKey)) {
      fileMap.set(fileKey, true);
      uniqueFiles.push(file);
    }
  });
  return uniqueFiles;
}

export default removeDuplicateFiles;
