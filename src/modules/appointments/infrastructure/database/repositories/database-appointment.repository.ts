import { dataSource } from '../data-source.ts';
import type { AppointmentRepository } from '../../../domain/repositories/appointment.repository.ts';
import { AppointmentMapper } from '../mappers/appointment.mapper.ts';
import type { Appointment } from '../../../domain/entities/appointment.ts';
import { AppointmentEntity } from '../entities/appointment.entity.ts';

export class DatabaseAppointmentRepository implements AppointmentRepository {
  private readonly appointmentRepository: AppointmentRepository;

  constructor() {
    this.appointmentRepository = dataSource.getRepository(AppointmentEntity);
  }

  async save(appointment: Appointment): Promise<void> {
    const ormEntity = AppointmentMapper.toEntity(appointment);
    await this.appointmentRepository.save(ormEntity);
  }
}
