export interface AppointmentRepository {
  save(appointment: any): Promise<void>;
}
