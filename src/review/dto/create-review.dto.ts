import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto{
  @ApiProperty()
  name: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  rating: number;
  @ApiProperty()
  productId: string;
}
