import type { Request, Response } from 'express';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';
import { createAppointmentDtoSchema } from '../dtos/create-appointment.dto.ts';

export class AppointmentController {
  constructor(private readonly createAppointment: CreateAppointment) {}

  async create(request: Request, response: Response) {
    const parsedBody = createAppointmentDtoSchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        error: 'Validation failed',
        details: parsedBody.error.issues,
      });
    }

    const { title, description, duration, clientName, startDate } =
      parsedBody.data;

    try {
      const result = await this.createAppointment.execute({
        title,
        description,
        duration,
        clientName,
        startDate: new Date(startDate),
      });

      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
