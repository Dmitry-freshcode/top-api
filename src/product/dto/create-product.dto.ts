import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductCharacteristicsDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  value: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  image: string;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  oldPrice: number;
  @ApiProperty()
  @IsNumber()
  credit: number;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsString()
  advantages: string;
  @ApiProperty()
  @IsString()
  disAdvantages: string;
  @ApiProperty()
  @IsString({ each: true })
  category: string[];
  @ApiProperty()
  @IsString({ each: true })
  tags: string[];
  @ApiProperty({ type: ProductCharacteristicsDto, isArray: true })
  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  characteristics: ProductCharacteristicsDto[];
}
