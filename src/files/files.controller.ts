import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesServer: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @AuthGuard()
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [new MFile(file)];
    if (file.mimetype.includes('image')) {
      const buffer = await this.filesServer.convertToWebp(file.buffer);
      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split('.')}.webp`,
          buffer,
        }),
      );
    }
    return this.filesServer.saveFile(saveArray);
  }
}
