import { it, describe } from 'node:test';
import assert from 'node:assert';
import type { AppointmentRepository } from '../../domain/repositories/appointment.repository.ts';
import {
  CreateAppointment,
  type CreateAppointmentInput,
} from './create-appointment.ts';
import { generateDatesInFuture } from '../../tests/utils/date.ts';

describe('Create Appointment', () => {
  it('should create an appointment successfully', async () => {
    // Arrange
    const inMemoryAppointmentRepository: AppointmentRepository = {
      async existsOverlapping() {
        return false;
      },
      async save(appointment) {
        return appointment;
      },
    };
    const createAppointment = new CreateAppointment(
      inMemoryAppointmentRepository,
    );
    const { startDate, endDate } = generateDatesInFuture();
    const input: CreateAppointmentInput = {
      title: 'Meeting with John',
      description: 'Discuss project requirements',
      clientName: 'John Doe',
      startDate,
      endDate,
    };

    // Act
    const output = await createAppointment.execute(input);

    // Assert
    assert.ok(output.id);
  });

  it('should throw an error if appointment overlaps with an existing appointment', async () => {
    // Arrange
    const overlappingAppointmentRepository: AppointmentRepository = {
      async existsOverlapping() {
        return true;
      },
      async save(appointment) {
        return appointment;
      },
    };
    const createAppointment = new CreateAppointment(
      overlappingAppointmentRepository,
    );
    const { startDate, endDate } = generateDatesInFuture();
    const input: CreateAppointmentInput = {
      title: 'Meeting with John',
      description: 'Discuss project requirements',
      clientName: 'John Doe',
      startDate,
      endDate,
    };

    // Act & Assert
    await assert.rejects(async () => {
      await createAppointment.execute(input);
    }, /Appointment overlaps with an existing/);
  });
});
