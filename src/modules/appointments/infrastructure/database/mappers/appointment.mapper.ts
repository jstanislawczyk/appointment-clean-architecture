import { AppointmentEntity } from '../entities/appointment.entity.ts';
import type { Appointment } from '../../../domain/entities/appointment.ts';

export class AppointmentMapper {
  static toEntity(appointment: Appointment): AppointmentEntity {
    const orm = new AppointmentEntity();
    orm.id = appointment.id;
    orm.title = appointment.title;
    orm.description = appointment.description;
    orm.clientName = appointment.clientName;
    orm.startDate = appointment.startDate.toDate();
    orm.endDate = appointment.endDate.toDate();

    return orm;
  }
}
