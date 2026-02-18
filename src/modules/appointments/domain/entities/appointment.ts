import { randomUUID } from 'node:crypto';
import { DomainError } from '../../../../shared/errors/domain.error.ts';
import { AppointmentDate } from '../value-objects/appointment-date.ts';

export class Appointment {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly clientName: string,
    readonly startDate: AppointmentDate,
    readonly endDate: AppointmentDate,
  ) {}

  public static create(
    title: string,
    description: string,
    clientName: string,
    startDate: Date,
    endDate: Date,
  ): Appointment {
    if (endDate < startDate) {
      throw new DomainError('End date must be after start date');
    }

    const twoHours = 7200;
    const duration = (endDate.getTime() - startDate.getTime()) / 1000;

    if (duration > twoHours) {
      throw new DomainError(`Duration cannot exceed ${twoHours} seconds`);
    }

    const appointmentStartDate = AppointmentDate.create(startDate);
    const appointmentEndDate = AppointmentDate.create(endDate);
    const id = randomUUID();

    return new Appointment(
      id,
      title,
      description,
      clientName,
      appointmentStartDate,
      appointmentEndDate,
    );
  }

  public static rehydrate(
    id: string,
    title: string,
    description: string,
    clientName: string,
    startDate: Date,
    endDate: Date,
  ): Appointment {
    const appointmentStartDate = AppointmentDate.create(startDate);
    const appointmentEndDate = AppointmentDate.create(endDate);

    return new Appointment(
      id,
      title,
      description,
      clientName,
      appointmentStartDate,
      appointmentEndDate,
    );
  }
}
