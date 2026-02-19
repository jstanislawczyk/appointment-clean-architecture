import { createAppointmentDtoSchema } from './create-appointment.dto.ts';

export const updateAppointmentDtoSchema = createAppointmentDtoSchema
  .pick({
    title: true,
    description: true,
    startDate: true,
    endDate: true,
  })
  .partial();
