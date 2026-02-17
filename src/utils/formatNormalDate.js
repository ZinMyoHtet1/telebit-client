function formatNormalDate(timestamp) {
  const date = new Date(Number(timestamp));

  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleString();
}

export default formatNormalDate;
