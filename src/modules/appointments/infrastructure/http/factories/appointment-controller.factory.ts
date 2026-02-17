import { DatabaseAppointmentRepository } from '../../database/repositories/database-appointment.repository.ts';
import { AppointmentController } from '../controllers/appointment.controller.ts';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';

export const buildAppointmentController = () => {
  const appointmentRepository = new DatabaseAppointmentRepository();
  const createAppointmentUseCase = new CreateAppointment(appointmentRepository);

  return new AppointmentController(createAppointmentUseCase);
};
