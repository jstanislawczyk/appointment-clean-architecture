import { NotFoundError } from '../../domain/errors/not-found.ts';
import { PastDateError } from '../../domain/errors/past-date.ts';
import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import type { UseCase } from './use-case.ts';

export type DeleteAppointmentInput = {
  id: string;
};

export class DeleteAppointment implements UseCase<
  DeleteAppointmentInput,
  void
> {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(input: DeleteAppointmentInput): Promise<void> {
    const appointment = await this.appointmentRepository.findById(input.id);

    if (!appointment) {
      throw new NotFoundError(`Appointment with id=${input.id} not found`);
    }

    if (appointment.isFinished()) {
      throw new PastDateError('Cannot delete a finished appointment');
    }

    await this.appointmentRepository.delete(input.id);
  }
}
