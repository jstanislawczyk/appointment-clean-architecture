export class AppointmentDate {
  private constructor(readonly date: Date) {}

  public static create(date: Date): AppointmentDate {
    const now = new Date();

    if (date < now) {
      throw new Error('Appointment date cannot be in the past');
    }

    return new AppointmentDate(date);
  }
}
