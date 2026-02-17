import { randomUUID } from 'node:crypto';
import { DomainError } from '../../../../shared/errors/domain.error.ts';
import { AppointmentDate } from '../value-objects/appointment-date.ts';

export class Appointment {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly duration: number, // In seconds
    readonly clientName: string,
    readonly startDate: AppointmentDate,
  ) {}

  public static create(
    title: string,
    description: string,
    duration: number,
    clientName: string,
    startDate: Date,
  ): Appointment {
    if (duration < 0) {
      throw new DomainError('Duration must be a positive number');
    }

    const twoHours = 7200;

    if (duration > twoHours) {
      throw new DomainError(`Duration cannot exceed ${twoHours} seconds`);
    }

    const appointmentDate = AppointmentDate.create(startDate);
    const id = randomUUID();

    return new Appointment(
      id,
      title,
      description,
      duration,
      clientName,
      appointmentDate,
    );
  }
}
