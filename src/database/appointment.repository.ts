import { dataSource } from './data-source.js';
import { Appointment } from '../entities/appointment.js';

export const appointmentRepository = dataSource.getRepository(Appointment);
