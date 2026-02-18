import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import { Appointment } from '../../domain/entities/appointment.ts';
import type { UseCase } from './use-case.ts';
import { DateRange } from '../../domain/value-objects/date-range.ts';
import { NotFoundError } from '../../domain/errors/not-found.ts';

export type FindAppointmentByIdInput = {
  id: string;
};

export class FindAppointmentById implements UseCase<
  FindAppointmentByIdInput,
  Appointment | undefined
> {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    input: FindAppointmentByIdInput,
  ): Promise<Appointment | undefined> {
    const appointment = await this.appointmentRepository.findById(input.id);

    if (!appointment) {
      throw new NotFoundError(`Appointment with id=${input.id} not found`);
    }

    return appointment;
  }
}
