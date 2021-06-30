import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';

export function AuthGuard(): MethodDecorator {
  const decorators = [ApiBearerAuth('web'), UseGuards(JwtAuthGuard)];
  return applyDecorators(...decorators);
}
