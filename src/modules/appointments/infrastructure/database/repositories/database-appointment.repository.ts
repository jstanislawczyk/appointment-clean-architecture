import { dataSource } from '../data-source.ts';
import type { AppointmentRepository } from '../../../domain/repositories/appointment.repository.ts';
import { AppointmentMapper } from '../mappers/appointment.mapper.ts';
import { type Appointment } from '../../../domain/entities/appointment.ts';
import { AppointmentEntity } from '../entities/appointment.entity.ts';
import { type Repository } from 'typeorm';

export class DatabaseAppointmentRepository implements AppointmentRepository {
  private readonly appointmentRepository: Repository<AppointmentEntity>;

  constructor() {
    this.appointmentRepository = dataSource.getRepository(AppointmentEntity);
  }

  async findById(id: string): Promise<Appointment | undefined> {
    const result = await this.appointmentRepository.findOneBy({ id });

    if (!result) {
      return undefined;
    }

    return AppointmentMapper.toDomain(result);
  }

  async findPage(page: number, pageSize: number): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return appointmentEntities.map(AppointmentMapper.toDomain);
  }

  async save(appointment: Appointment): Promise<Appointment> {
    const ormEntity = AppointmentMapper.toEntity(appointment);
    await this.appointmentRepository.save(ormEntity);

    return appointment;
  }

  async existsOverlapping(dateRange: {
    startDate: Date;
    endDate: Date;
  }): Promise<boolean> {
    return this.appointmentRepository
      .createQueryBuilder('appointmentOverlap')
      .where('appointmentOverlap.startDate < :endDate', {
        endDate: dateRange.endDate,
      })
      .andWhere('appointmentOverlap.endDate > :startDate', {
        startDate: dateRange.startDate,
      })
      .getExists();
  }
}
