import { Router } from 'express';
import type { AppointmentController } from '../controllers/appointment.controller.ts';

export function appointmentRoutes(controller: AppointmentController): Router {
  const router = Router();

  router.get('/', controller.findAll.bind(controller));
  router.get('/:id', controller.findById.bind(controller));
  router.post('/', controller.create.bind(controller));

  return router;
}
