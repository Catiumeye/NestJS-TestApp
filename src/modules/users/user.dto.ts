import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  id: number;

  @Length(3, 16, { message: 'Can be from 3 to 16 symbols' })
  alias: string;

  @Length(6, 54, { message: 'Can be from 6 to 54 symbols' })
  @IsEmail()
  email: string;

  @Length(6, 255, { message: 'Can be from 6 to 255 symbols' })
  password: string;
}
