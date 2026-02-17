import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public clientName: string;

  @Column()
  public duration: number;

  @Column({ type: 'datetime' })
  public startDate: Date;
}
