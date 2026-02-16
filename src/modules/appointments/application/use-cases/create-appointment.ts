import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import { Appointment } from '../../domain/entities/appointment.ts';
import type { UseCase } from './use-case.ts';

type CreateAppointmentInput = {
  title: string;
  description: string;
  duration: number;
};

type CreateAppointmentOutput = {
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
    const { title, description, duration } = input;
    const appointment = Appointment.create(title, description, duration);

    await this.appointmentRepository.save(appointment);

    return {
      id: appointment.id,
    };
  }
}
