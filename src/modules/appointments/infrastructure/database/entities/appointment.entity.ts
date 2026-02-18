import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('appointments')
@Index(['startDate', 'endDate'])
export class AppointmentEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public clientName: string;

  @Column({ type: 'datetime' })
  public startDate: Date;

  @Column({ type: 'datetime' })
  public endDate: Date;
}
