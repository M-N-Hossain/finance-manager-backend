import { CreateUserDto } from './create-userDto';

export class UpdateUserDto extends CreateUserDto {
  updatedAt: Date;
}
