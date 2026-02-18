import { DatabaseAppointmentRepository } from '../../database/repositories/database-appointment.repository.ts';
import { AppointmentController } from '../controllers/appointment.controller.ts';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';
import { FindAppointmentById } from '../../../application/use-cases/find-appointment-by-id.ts';
import { FindAppointmentsPage } from '../../../application/use-cases/find-appointments-page.ts';

export const buildAppointmentController = () => {
  const appointmentRepository = new DatabaseAppointmentRepository();
  const findAppointmentById = new FindAppointmentById(appointmentRepository);
  const findAppointmentsPage = new FindAppointmentsPage(appointmentRepository);
  const createAppointmentUseCase = new CreateAppointment(appointmentRepository);

  return new AppointmentController(
    findAppointmentById,
    findAppointmentsPage,
    createAppointmentUseCase,
  );
};
