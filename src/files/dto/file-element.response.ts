import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileElementResponse {
  @ApiProperty()
  @IsString()
  url: string;
  @ApiProperty()
  @IsString()
  name: string;
}
