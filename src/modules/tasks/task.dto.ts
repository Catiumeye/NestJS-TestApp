import { IsIn, IsInt, IsString, Length } from 'class-validator';
import { CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export class TaskDto {
  id: number;

  @IsInt({ message: "Incorrect author's id" })
  author_id: number;

  @IsString({ message: 'Status must be a string' })
  @IsIn(['active', 'checked', 'done', 'rejected'], {
    message: 'Incorrect status value',
  })
  status: string;

  @IsString({ message: 'Title must be a string' })
  @Length(1, 255, { message: 'The title can have a length from 1 to 255' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_id: Timestamp;
}
