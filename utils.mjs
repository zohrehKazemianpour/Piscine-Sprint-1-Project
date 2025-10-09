export function addMonths(dateString, months) {
  const [year, month, day] = dateString.split("-").map(Number);
  const d = new Date(year, month - 1, day);

  d.setMonth(d.getMonth() + months);

  if (d.getDate() < day) {
    d.setDate(0);
  }

  return d;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function setIntervalDates(startDate) {
  const [year, month, day] = startDate.split("-").map(Number);
  const baseDate = new Date(year, month - 1, day);

  const oneWeekLater = new Date(baseDate);
  oneWeekLater.setDate(baseDate.getDate() + 7);

  const oneMonthLater = addMonths(startDate, 1);
  const threeMonthsLater = addMonths(startDate, 3);
  const sixMonthsLater = addMonths(startDate, 6);

  const oneYearLater = new Date(baseDate);
  oneYearLater.setFullYear(baseDate.getFullYear() + 1);

  return [
    formatDate(oneWeekLater),
    formatDate(oneMonthLater),
    formatDate(threeMonthsLater),
    formatDate(sixMonthsLater),
    formatDate(oneYearLater),
  ];
}
