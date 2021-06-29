import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @Max(5)
  @Min(1, { message: 'Тест сообщения о ошибке' })
  @IsNumber()
  rating: number;
  @ApiProperty()
  @IsString()
  productId: string;
}
