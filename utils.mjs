export function setIntervalDates(startDate) {
  const baseDate = new Date(startDate);
  const oneWeekLater = new Date(baseDate);
  oneWeekLater.setDate(baseDate.getDate() + 7);
  const oneMonthLater = new Date(baseDate);
  oneMonthLater.setMonth(baseDate.getMonth() + 1);
  const threeMonthsLater = new Date(baseDate);
  threeMonthsLater.setMonth(baseDate.getMonth() + 3);
  const sixMonthsLater = new Date(baseDate);
  sixMonthsLater.setMonth(baseDate.getMonth() + 6);
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