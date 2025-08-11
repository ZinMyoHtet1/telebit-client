function formatName(name, maxLength) {
  const ellipsis = "...";

  if (typeof name !== "string") {
    return "";
  }

  if (name.length <= maxLength) {
    return name;
  }

  return name.substring(0, maxLength - ellipsis.length) + ellipsis;
}

export default formatName;
