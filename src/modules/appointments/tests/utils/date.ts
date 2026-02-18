export const generateDatesInFuture = () => {
  const oneHour = 3_600_000;
  const twoHoursFromNow = new Date(Date.now() + 2 * oneHour);
  const startDate = twoHoursFromNow;
  const endDate = new Date(twoHoursFromNow.getTime() + oneHour);

  return { startDate, endDate };
};
