import type { Appointment } from '../entities/appointment.ts';
import type { DateRange } from '../value-objects/date-range.ts';

export interface AppointmentRepository {
  findPage(page: number, pageSize: number): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | undefined>;
  save(appointment: Appointment): Promise<Appointment>;
  existsOverlapping(dateRange: DateRange): Promise<boolean>;
  delete(id: string): Promise<void>;
}
