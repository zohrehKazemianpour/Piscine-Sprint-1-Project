export function addMonths(dateString, months) {
  // Parse safely as YYYY, MM, DD (no timezones)
  const [year, month, day] = dateString.split("-").map(Number);
  const d = new Date(year, month - 1, day);

  d.setMonth(d.getMonth() + months);

  // Handle overflow (e.g., Jan 31 → Feb 28)
  if (d.getDate() < day) {
    d.setDate(0);
  }

  return d;
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
    oneWeekLater.toISOString().split("T")[0],
    oneMonthLater.toISOString().split("T")[0],
    threeMonthsLater.toISOString().split("T")[0],
    sixMonthsLater.toISOString().split("T")[0],
    oneYearLater.toISOString().split("T")[0],
  ];
}