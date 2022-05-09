import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  alias: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: ['active', 'review', 'blocked'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @DeleteDateColumn()
  deleted_at: Timestamp;

  @OneToMany(() => Task, (tasks) => tasks.user)
  tasks: Task[];
}
