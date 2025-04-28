import { IsString } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  title: string;
  amount: number;
  @IsString()
  category: string;
}
