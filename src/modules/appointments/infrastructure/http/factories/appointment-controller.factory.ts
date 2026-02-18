import { DatabaseAppointmentRepository } from '../../database/repositories/database-appointment.repository.ts';
import { AppointmentController } from '../controllers/appointment.controller.ts';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';
import { FindAppointmentById } from '../../../application/use-cases/find-appointment-by-id.ts';

export const buildAppointmentController = () => {
  const appointmentRepository = new DatabaseAppointmentRepository();
  const findAppointmentById = new FindAppointmentById(appointmentRepository);
  const createAppointmentUseCase = new CreateAppointment(appointmentRepository);

  return new AppointmentController(
    findAppointmentById,
    createAppointmentUseCase,
  );
};
