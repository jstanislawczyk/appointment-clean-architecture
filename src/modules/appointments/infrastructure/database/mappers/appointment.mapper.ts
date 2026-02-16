import { AppointmentEntity } from '../entities/appointment.entity.ts';
import type { Appointment } from '../../../domain/entities/appointment.ts';

export class AppointmentMapper {
  static toEntity(appointment: Appointment): AppointmentEntity {
    const orm = new AppointmentEntity();
    orm.id = appointment.id;
    orm.title = appointment.title;
    orm.description = appointment.description;
    orm.duration = appointment.duration;

    return orm;
  }
}
