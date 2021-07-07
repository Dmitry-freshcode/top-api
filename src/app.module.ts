import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';

@Module({
  imports: [
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    FilesModule,
    TelegramModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
