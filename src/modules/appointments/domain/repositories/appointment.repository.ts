import type { Appointment } from '../entities/appointment.ts';
import type { DateRange } from '../value-objects/date-range.ts';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<Appointment>;
  existsOverlapping(dateRange: DateRange): Promise<boolean>;
}
