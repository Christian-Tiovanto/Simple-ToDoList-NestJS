import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;
}
