import { TopLevelCategory } from '../top-page.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class FindTopPageDto {
  @ApiProperty()
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
