import type { Request, Response } from 'express';
import { CreateAppointment } from '../../../application/use-cases/create-appointment.ts';
import { createAppointmentDtoSchema } from '../dtos/create-appointment.dto.ts';
import { FindAppointmentById } from '../../../application/use-cases/find-appointment-by-id.ts';
import { NotFoundError } from '../../../domain/errors/not-found.ts';
import type { FindAppointmentsPage } from '../../../application/use-cases/find-appointments-page.ts';
import { pageParamsDtoSchema } from '../dtos/page-params.dto.ts';
import type { DeleteAppointment } from '../../../application/use-cases/delete-appointment.ts';
import { PastDateError } from '../../../domain/errors/past-date.ts';
import type { UpdateAppointment } from '../../../application/use-cases/update-appointment.ts';
import { updateAppointmentDtoSchema } from '../dtos/update-appointment.dto.ts';

export class AppointmentController {
  constructor(
    private readonly findAppointmentById: FindAppointmentById,
    private readonly findAppointmentsPage: FindAppointmentsPage,
    private readonly createAppointment: CreateAppointment,
    private readonly updateAppointment: UpdateAppointment,
    private readonly deleteAppointment: DeleteAppointment,
  ) {}

  async findAll(request: Request, response: Response) {
    const parsedQueryParams = pageParamsDtoSchema.safeParse(request.query);

    if (!parsedQueryParams.success) {
      return response.status(400).json({
        error: 'Validation failed',
        details: parsedQueryParams.error.issues,
      });
    }

    const { page, pageSize } = parsedQueryParams.data;

    try {
      const appointments = await this.findAppointmentsPage.execute({
        page,
        pageSize,
      });
      return response.status(200).json(appointments);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
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

  async update(request: Request, response: Response) {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'Appointment ID is required' });
    }

    if (typeof id !== 'string') {
      return response
        .status(400)
        .json({ error: 'Appointment ID must be a string' });
    }

    const parsedBody = updateAppointmentDtoSchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        error: 'Validation failed',
        details: parsedBody.error.issues,
      });
    }

    const { title, description, startDate, endDate } = parsedBody.data;

    try {
      const result = await this.updateAppointment.execute({
        id,
        title,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      });

      return response.status(200).json(result);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return response.status(404).json({
          error: error.message,
        });
      }

      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request: Request, response: Response) {
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
      await this.deleteAppointment.execute({ id });
      return response.status(204).send();
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        return response.status(404).json({
          error: error.message,
        });
      }

      if (error instanceof PastDateError) {
        return response.status(400).json({
          error: error.message,
        });
      }

      return response.status(500).json({ error: error.message });
    }
  }
}
