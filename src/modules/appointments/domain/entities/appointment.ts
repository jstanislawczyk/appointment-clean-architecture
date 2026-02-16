import { randomUUID } from 'node:crypto';
import { DomainError } from '../../../../shared/errors/domain.error.ts';

export class Appointment {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly duration: number, // In seconds
  ) {}

  public static create(
    title: string,
    description: string,
    duration: number,
  ): Appointment {
    if (duration < 0) {
      throw new DomainError('Duration must be a positive number');
    }

    const twoHours = 7200;

    if (duration > twoHours) {
      throw new DomainError(`Duration cannot exceed ${twoHours} seconds`);
    }

    const id = randomUUID();

    return new Appointment(id, title, description, duration);
  }
}
