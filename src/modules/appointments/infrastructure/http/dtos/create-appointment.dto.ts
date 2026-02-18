import z from 'zod';

export const createAppointmentDtoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(64, 'Title must be at most 64 characters'),
  description: z
    .string()
    .max(200, 'Description must be at most 200 characters'),
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.iso.datetime('Invalid date format, expected ISO 8601 string'),
  endDate: z.iso.datetime('Invalid date format, expected ISO 8601 string'),
});
