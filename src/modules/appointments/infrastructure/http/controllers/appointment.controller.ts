import type { Request, Response } from 'express';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';

export class AppointmentController {
  constructor(private readonly createAppointment: CreateAppointment) {}

  async create(request: Request, response: Response) {
    try {
      const { title, description, duration } = request.body;

      const result = await this.createAppointment.execute({
        title,
        description,
        duration,
      });

      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
