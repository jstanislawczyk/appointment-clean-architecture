import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import { Appointment } from '../../domain/entities/appointment.ts';
import type { UseCase } from './use-case.ts';
import { DateRange } from '../../domain/value-objects/date-range.ts';
import { NotFoundError } from '../../domain/errors/not-found.ts';

export type FindAppointmentsPageInput = {
  page: number;
  pageSize: number;
};

export class FindAppointmentsPage implements UseCase<
  FindAppointmentsPageInput,
  Appointment[]
> {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(input: FindAppointmentsPageInput): Promise<Appointment[]> {
    const { page, pageSize } = input;

    return this.appointmentRepository.findPage(page, pageSize);
  }
}
