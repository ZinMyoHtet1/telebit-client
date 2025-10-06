function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000); // years
  if (interval >= 1)
    return interval === 1 ? "a year ago" : interval + " years ago";

  interval = Math.floor(seconds / 2592000); // months
  if (interval >= 1)
    return interval === 1 ? "a month ago" : interval + " months ago";

  interval = Math.floor(seconds / 86400); // days
  if (interval >= 1)
    return interval === 1 ? "a day ago" : interval + " days ago";

  interval = Math.floor(seconds / 3600); // hours
  if (interval >= 1)
    return interval === 1 ? "an hour ago" : interval + " hours ago";

  interval = Math.floor(seconds / 60); // minutes
  if (interval >= 1)
    return interval === 1 ? "a minute ago" : interval + " minutes ago";

  return seconds <= 1 ? "just now" : seconds + " seconds ago";
}

export default timeAgo;
