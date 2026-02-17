import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import { Appointment } from '../../domain/entities/appointment.ts';
import type { UseCase } from './use-case.ts';

type CreateAppointmentInput = {
  title: string;
  description: string;
  duration: number;
  clientName: string;
  startDate: Date;
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
    const { title, description, duration, clientName, startDate } = input;
    const appointment = Appointment.create(
      title,
      description,
      duration,
      clientName,
      startDate,
    );

    const savedAppointment = await this.appointmentRepository.save(appointment);

    return {
      id: savedAppointment.id,
    };
  }
}
