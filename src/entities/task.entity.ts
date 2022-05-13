import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author_id: number;

  @Column({
    type: 'enum',
    enum: ['active', 'checked', 'done', 'rejected'],
    default: 'active',
  })
  status: string;

  @Column('varchar')
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'author_id' })
  user: User;
}
