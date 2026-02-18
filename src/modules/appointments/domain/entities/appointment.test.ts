import { it, describe } from 'node:test';
import assert from 'node:assert';
import { Appointment } from './appointment.ts';
import { generateDatesInFuture } from '../../tests/utils/date.ts';

describe('Appointment Entity', () => {
  it('should create an appointment with valid data', () => {
    // Arrange
    const title = 'Meeting with John';
    const description = 'Discuss project requirements';
    const clientName = 'John Doe';
    const { startDate, endDate } = generateDatesInFuture();

    // Act
    const appointment = Appointment.create(
      title,
      description,
      clientName,
      startDate,
      endDate,
    );

    // Assert
    assert.strictEqual(appointment.title, title);
    assert.strictEqual(appointment.description, description);
    assert.strictEqual(appointment.clientName, clientName);
    assert.strictEqual(appointment.startDate.toDate(), startDate);
    assert.strictEqual(appointment.endDate.toDate(), endDate);
  });

  it('should throw an error if end date is before start date', () => {
    // Arrange
    const title = 'Meeting with John';
    const description = 'Discuss project requirements';
    const clientName = 'John Doe';
    const startDate = new Date('2024-07-01T10:00:00Z');
    const endDate = new Date('2024-07-01T09:00:00Z');

    // Act & Assert
    assert.throws(() => {
      Appointment.create(title, description, clientName, startDate, endDate);
    }, /End date must be after start date/);
  });

  it('should throw an error if duration exceeds 2 hours', () => {
    // Arrange
    const title = 'Meeting with John';
    const description = 'Discuss project requirements';
    const clientName = 'John Doe';
    const startDate = new Date('2024-07-01T10:00:00Z');
    const endDate = new Date('2024-07-01T13:00:00Z');

    // Act & Assert
    assert.throws(() => {
      Appointment.create(title, description, clientName, startDate, endDate);
    }, /Duration cannot exceed 7200 seconds/);
  });

  it('should throw an error if dates are in the past', () => {
    // Arrange
    const title = 'Meeting with John';
    const description = 'Discuss project requirements';
    const clientName = 'John Doe';
    const startDate = new Date('2020-07-01T10:00:00Z');
    const endDate = new Date('2020-07-01T11:00:00Z');

    // Act & Assert
    assert.throws(() => {
      Appointment.create(title, description, clientName, startDate, endDate);
    }, /Appointment date cannot be in the past/);
  });
});
