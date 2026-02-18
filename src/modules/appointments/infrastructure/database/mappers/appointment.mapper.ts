import { AppointmentEntity } from '../entities/appointment.entity.ts';
import { Appointment } from '../../../domain/entities/appointment.ts';

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

  static toDomain(orm: AppointmentEntity): Appointment {
    return Appointment.rehydrate(
      orm.id,
      orm.title,
      orm.description,
      orm.clientName,
      orm.startDate,
      orm.endDate,
    );
  }
}
