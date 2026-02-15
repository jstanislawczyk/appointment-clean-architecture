import { appointmentRepository } from '../database/appointment.repository.js';

export class AppointmentService {
  public async createAppointment(name: string, description: string) {
    const appointment = appointmentRepository.create({ name, description });
    return await appointmentRepository.save(appointment);
  }
}
