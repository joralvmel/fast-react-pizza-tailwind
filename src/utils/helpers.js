/**
 * Formats a number as currency using the specified locale and currency.
 *
 * @param {number} value - The number to format as currency.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

/**
 * Formats a date string into a localized date format.
 *
 * @param {string} dateStr - The date string to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

/**
 * Calculates the number of minutes left between the current time and a given date.
 * @param {string} dateStr - The date string to calculate the minutes left from.
 * @returns {number} The number of minutes left.
 */
export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
