import { IsString } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  title: string;
  amount: number;
  @IsString()
  category: string;
}
