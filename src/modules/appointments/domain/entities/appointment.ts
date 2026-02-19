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
    if (!this.startDateIsBeforeEndDate(startDate, endDate)) {
      throw new DomainError('End date must be after start date');
    }

    if (!this.hasCorrectDuration(startDate, endDate)) {
      throw new DomainError(`Duration cannot exceed 7200 seconds`);
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
    const appointmentStartDate = AppointmentDate.rehydrate(startDate);
    const appointmentEndDate = AppointmentDate.rehydrate(endDate);

    return new Appointment(
      id,
      title,
      description,
      clientName,
      appointmentStartDate,
      appointmentEndDate,
    );
  }

  public isFinished(): boolean {
    const now = new Date();
    return this.endDate.toDate() < now;
  }

  public update(
    title?: string,
    description?: string,
    startDate?: Date,
    endDate?: Date,
  ): Appointment {
    if (this.isFinished()) {
      throw new DomainError('Cannot update a finished appointment');
    }

    const newTitle = title ?? this.title;
    const newDescription = description ?? this.description;
    const newStartDate = startDate ?? this.startDate.toDate();
    const newEndDate = endDate ?? this.endDate.toDate();

    if (!Appointment.startDateIsBeforeEndDate(newStartDate, newEndDate)) {
      throw new DomainError('End date must be after start date');
    }

    if (!Appointment.hasCorrectDuration(newStartDate, newEndDate)) {
      throw new DomainError(`Duration cannot exceed 7200 seconds`);
    }

    const appointmentStartDate = AppointmentDate.create(newStartDate);
    const appointmentEndDate = AppointmentDate.create(newEndDate);

    return new Appointment(
      this.id,
      newTitle,
      newDescription,
      this.clientName,
      appointmentStartDate,
      appointmentEndDate,
    );
  }

  private static hasCorrectDuration(startDate: Date, endDate: Date): boolean {
    const twoHours = 7200;
    const duration = (endDate.getTime() - startDate.getTime()) / 1000;

    return duration <= twoHours;
  }

  private static startDateIsBeforeEndDate(
    startDate: Date,
    endDate: Date,
  ): boolean {
    return startDate < endDate;
  }
}
