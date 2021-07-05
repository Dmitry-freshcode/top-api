import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TopPageAdvantageDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  description: string;
}
