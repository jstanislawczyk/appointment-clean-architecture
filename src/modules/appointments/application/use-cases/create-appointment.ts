import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import { Appointment } from '../../domain/entities/appointment.ts';
import type { UseCase } from './use-case.ts';
import { DateRange } from '../../domain/value-objects/date-range.ts';

export type CreateAppointmentInput = {
  title: string;
  description: string;
  clientName: string;
  startDate: Date;
  endDate: Date;
};

export type CreateAppointmentOutput = {
  id: string;
};

export class CreateAppointment implements UseCase<
  CreateAppointmentInput,
  CreateAppointmentOutput
> {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    input: CreateAppointmentInput,
  ): Promise<CreateAppointmentOutput> {
    const { title, description, clientName, startDate, endDate } = input;
    const appointment = Appointment.create(
      title,
      description,
      clientName,
      startDate,
      endDate,
    );
    const dateRangeToCheck = new DateRange(
      appointment.startDate.toDate(),
      appointment.endDate.toDate(),
    );

    const hasOverlapingAppointment =
      await this.appointmentRepository.existsOverlapping(dateRangeToCheck);

    if (hasOverlapingAppointment) {
      throw new Error('Appointment overlaps with an existing appointment');
    }

    const savedAppointment = await this.appointmentRepository.save(appointment);

    return {
      id: savedAppointment.id,
    };
  }
}
