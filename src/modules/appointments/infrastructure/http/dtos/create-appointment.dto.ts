import z from 'zod';

export const createAppointmentDtoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(64, 'Title must be at most 64 characters'),
  description: z
    .string()
    .max(200, 'Description must be at most 200 characters'),
  duration: z
    .number()
    .positive('Duration must be a positive number')
    .max(7200, 'Duration must be at most 2 hours'),
  clientName: z.string().min(1, 'Client name is required'),
  startDate: z.iso.datetime('Invalid date format, expected ISO 8601 string'),
});
