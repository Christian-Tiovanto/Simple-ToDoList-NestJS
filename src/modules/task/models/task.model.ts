import { TaskStatus } from 'src/enums/task-status';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskDesc: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @Column()
  @ManyToOne(() => User)
  user: User;
}
