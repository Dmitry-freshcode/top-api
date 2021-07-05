import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('top-page')
@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @AuthGuard()
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.creat(dto);
  }


  @Get(':id')
  async get(@Param('id') id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return topPage;
  }

  @AuthGuard()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.topPageService.deleteById(id);
  }

  @AuthGuard()
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updated = await this.topPageService.updateById(id, dto);
    if (!updated) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return updated;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return topPage;
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
}
