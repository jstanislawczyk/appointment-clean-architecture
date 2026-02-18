import type { Request, Response } from 'express';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';
import { createAppointmentDtoSchema } from '../dtos/create-appointment.dto.ts';
import { FindAppointmentById } from '../../../application/use-cases/find-appointment-by-id.ts';
import { NotFoundError } from '../../../domain/errors/not-found.ts';

export class AppointmentController {
  constructor(
    private readonly findAppointmentById: FindAppointmentById,
    private readonly createAppointment: CreateAppointment,
  ) {}

  async findAll(request: Request, response: Response) {
    // Placeholder for future implementation
    return response.status(200).json({ message: 'List of appointments' });
  }

  async findById(request: Request, response: Response) {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'Appointment ID is required' });
    }

    if (typeof id !== 'string') {
      return response
        .status(400)
        .json({ error: 'Appointment ID must be a string' });
    }

    try {
      const appointment = await this.findAppointmentById.execute({ id });
      return response.status(200).json(appointment);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return response.status(404).json({
          error: error.message,
        });
      }

      return response.status(500).json({ error: error.message });
    }
  }

  async create(request: Request, response: Response) {
    const parsedBody = createAppointmentDtoSchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        error: 'Validation failed',
        details: parsedBody.error.issues,
      });
    }

    const { title, description, clientName, startDate, endDate } =
      parsedBody.data;

    try {
      const result = await this.createAppointment.execute({
        title,
        description,
        clientName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
