import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { NOT_FOUND_PRODUCT } from './product.constants';
import { AdValidationPipe } from 'src/pipes/ad-validation.pipe';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.creat(dto);
  }

  @Get(':id')
  async get(@Param('id', AdValidationPipe) id: string): Promise<ProductModel> {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(NOT_FOUND_PRODUCT);
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id', AdValidationPipe) id: string) {
    const deletedProduct = await this.productService.deleteById(id);
    if (!deletedProduct) {
      throw new NotFoundException(NOT_FOUND_PRODUCT);
    }
  }

  @Patch(':id')
  async patch(
    @Param('id', AdValidationPipe) id: string,
    @Body() dto: ProductModel,
  ): Promise<ProductModel> {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (!updatedProduct) {
      throw new NotFoundException(NOT_FOUND_PRODUCT);
    }
    return updatedProduct;
  }

  @HttpCode(200)
  @Post('/find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
