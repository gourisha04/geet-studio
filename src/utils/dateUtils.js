/**
 * Date utility helpers for Geet Studio
 * Enforces Asia/Kolkata (IST) timezone formatting and automatic calculations
 */

export function getFormattedISTDate(date = new Date()) {
  const options = {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const formatted = new Intl.DateTimeFormat('en-IN', options).format(date);
  return formatted.toUpperCase(); // e.g., "20 AUGUST 2026"
}

export function getFormattedISTDayMonth(date = new Date()) {
  const options = {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short'
  };
  return new Intl.DateTimeFormat('en-IN', options).format(date).toUpperCase();
}

/**
 * Calculates website update status based on latest published content timestamp
 * @param {Date|string} lastUpdateTimestamp 
 */
export function getWebsiteUpdateStatus(lastUpdateTimestamp = new Date()) {
  const now = new Date();
  const updateDate = new Date(lastUpdateTimestamp);

  // Compare in Asia/Kolkata calendar dates
  const nowIST = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  const updateIST = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(updateDate);

  const diffTime = Math.abs(new Date(nowIST) - new Date(updateIST));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (nowIST === updateIST) {
    return 'UPDATED TODAY';
  } else if (diffDays === 1) {
    return 'UPDATED YESTERDAY';
  } else {
    return `UPDATED ${getFormattedISTDate(updateDate)}`;
  }
}
