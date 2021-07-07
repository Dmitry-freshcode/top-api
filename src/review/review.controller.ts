import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { AdValidationPipe } from 'src/pipes/ad-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.creat(dto);
  }

  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = `Name ${dto.name}\n` + `Title: ${dto.description}`;
    return this.telegramService.sendMessage(message);
  }

  @Delete(':id')
  @AuthGuard()
  async delete(@Param('id', AdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId', AdValidationPipe) productId: string,
    @UserEmail() email: string,
  ) {
    return this.reviewService.findByProductId(productId);
  }
}
