import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;
}
