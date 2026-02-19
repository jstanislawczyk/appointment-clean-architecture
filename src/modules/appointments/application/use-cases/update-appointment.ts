import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import type { UseCase } from './use-case.ts';
import { NotFoundError } from '../../domain/errors/not-found.ts';
import { DateRange } from '../../domain/value-objects/date-range.ts';

export type UpdateAppointmentInput = {
  id: string;
  title: string | undefined;
  description: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

export type UpdateAppointmentOutput = {
  id: string;
};

export class UpdateAppointment implements UseCase<
  UpdateAppointmentInput,
  UpdateAppointmentOutput
> {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    input: UpdateAppointmentInput,
  ): Promise<UpdateAppointmentOutput> {
    const { id, title, description, startDate, endDate } = input;

    const existingAppointment = await this.appointmentRepository.findById(id);

    if (!existingAppointment) {
      throw new NotFoundError(`Appointment with id=${id} not found`);
    }

    const updatedAppointment = existingAppointment.update(
      title,
      description,
      startDate,
      endDate,
    );

    const dateRangeToCheck = new DateRange(
      updatedAppointment.startDate.toDate(),
      updatedAppointment.endDate.toDate(),
    );

    const hasOverlapingAppointment =
      await this.appointmentRepository.existsOverlapping(dateRangeToCheck);

    if (hasOverlapingAppointment) {
      throw new Error('Appointment overlaps with an existing appointment');
    }

    await this.appointmentRepository.update(updatedAppointment);

    return {
      id: updatedAppointment.id,
    };
  }
}
