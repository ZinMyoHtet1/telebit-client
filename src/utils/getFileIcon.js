import {
  videoIcon,
  imageIcon,
  audioIcon,
  docIcon,
  pdfIcon,
  txtIcon,
  xlsIcon,
  zipIcon,
  powerpointIcon,
  exeIcon,
  defaultFileIcon,
} from "./../assets/fileIcons";

function getFileIcon(contentType, extension) {
  const type = contentType.split("/")[0];
  //   const extension = file.name.split(".").pop().toLowerCase();

  // Images
  if (type === "image") return imageIcon;

  // Audio
  if (type === "audio") return audioIcon;

  // Video
  if (type === "video") return videoIcon;

  // TXT
  if (type === "text") return txtIcon;

  // Application types
  if (type === "application") {
    // PDF
    if (extension === "pdf") return pdfIcon;
    // Word
    if (["doc", "docx"].includes(extension)) return docIcon;
    // Excel
    if (["xls", "xlsx"].includes(extension)) return xlsIcon;
    // PowerPoint
    if (["ppt", "pptx"].includes(extension)) return powerpointIcon;
    // Archives
    if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) return zipIcon;
    // Executables
    if (["exe", "msi", "dmg", "app"].includes(extension)) return exeIcon;
  }

  // Default file icon
  return defaultFileIcon;
}

export default getFileIcon;
