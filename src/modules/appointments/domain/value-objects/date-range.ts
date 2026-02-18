export class DateRange {
  constructor(
    readonly startDate: Date,
    readonly endDate: Date,
  ) {
    if (isNaN(startDate.getTime())) {
      throw new Error('Invalid start date');
    }

    if (isNaN(endDate.getTime())) {
      throw new Error('Invalid end date');
    }

    if (startDate >= endDate) {
      throw new Error('Start date must be before end date');
    }

    this.startDate = startDate;
    this.endDate = endDate;
  }

  public isDateInRange(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }
}
