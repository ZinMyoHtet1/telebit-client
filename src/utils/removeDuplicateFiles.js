function removeDuplicateFiles(files) {
  const uniqueFiles = [];
  const fileMap = new Map(); // Tracks seen file keys

  files.forEach((item) => {
    // Handle both raw File and { parentId, file }
    const f = item.file instanceof File ? item.file : item;

    const fileKey = `${f.name}-${f.size}-${f.lastModified}`;

    if (!fileMap.has(fileKey)) {
      fileMap.set(fileKey, true);
      uniqueFiles.push(item); // keep original structure
    }
  });

  return uniqueFiles;
}

export default removeDuplicateFiles;
