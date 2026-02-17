import type { Appointment } from '../entities/appointment.ts';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<Appointment>;
}
