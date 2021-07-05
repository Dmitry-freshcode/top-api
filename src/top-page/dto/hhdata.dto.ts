import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class HhDataDto {
  @ApiProperty()
  @IsNumber()
  count: number;
  @ApiProperty()
  @IsNumber()
  juniorSalary: number;
  @ApiProperty()
  @IsNumber()
  middleSalary: number;
  @ApiProperty()
  @IsNumber()
  seniorSalary: number;
}
