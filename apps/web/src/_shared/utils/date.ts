/**
 * Date utility functions
 */

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_TIME_FORMAT = "HH:mm:ss";
const DEFAULT_DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;

/**
 * Returns the current date as an ISO string
 */
export function getCurrentDate(): string {
  return new Date().toISOString();
}

/**
 * Formats a date with sensible defaults
 */
export function formatDate(
  date: Date | string | number,
  format: string = DEFAULT_DATE_FORMAT,
): string {
  const dateObj = typeof date === "object" ? date : new Date(date);

  // Simple formatting logic - can be replaced with a date library like date-fns
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

/**
 * Checks if a date is in the past
 */
export function isPastDate(date: Date | string | number): boolean {
  const dateObj = typeof date === "object" ? date : new Date(date);
  const now = new Date();
  return dateObj < now;
}

/**
 * Checks if a date is in the future
 */
export function isFutureDate(date: Date | string | number): boolean {
  const dateObj = typeof date === "object" ? date : new Date(date);
  const now = new Date();
  return dateObj > now;
}

/**
 * Adds days to a date
 */
export function addDays(date: Date | string | number, days: number): Date {
  const dateObj = typeof date === "object" ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

/**
 * Gets the difference between two dates in days
 */
export function getDaysDifference(
  startDate: Date | string | number,
  endDate: Date | string | number,
): number {
  const start = typeof startDate === "object" ? startDate : new Date(startDate);
  const end = typeof endDate === "object" ? endDate : new Date(endDate);

  // Remove time portion for accurate day calculation
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.floor((endUtc - startUtc) / (1000 * 60 * 60 * 24));
}
