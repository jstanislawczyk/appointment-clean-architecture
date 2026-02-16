import express, { type Express } from 'express';
import { appointmentRoutes } from './modules/appointments/infrastructure/http/routes/appointment.routes.ts';
import { buildAppointmentController } from './modules/appointments/infrastructure/http/factories/appointment-controller.factory.ts';

export function createApp(): Express {
  const app = express();

  const appointmentController = buildAppointmentController();

  app.use(express.json());
  app.use('/appointments', appointmentRoutes(appointmentController));

  return app;
}
