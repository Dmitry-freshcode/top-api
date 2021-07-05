import { TopLevelCategory } from '../top-page.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HhDataDto } from './hhdata.dto';
import { TopPageAdvantageDto } from './advantage.dto';

export class CreateTopPageDto {

  @ApiProperty()
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
  @ApiProperty()
  @IsString()
  secondCategory: string;
  @ApiProperty()
  @IsString()
  alias: string;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  category: string;
  @ApiProperty({
    type: HhDataDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhDataDto;
  @ApiProperty({ type: TopPageAdvantageDto, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];
  @ApiProperty()
  @IsString()
  seoText: string;
  @ApiProperty()
  @IsString()
  tagsTitle: string;
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  tags: string[];
}
