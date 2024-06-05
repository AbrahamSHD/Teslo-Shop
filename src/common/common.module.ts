import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';

@Module({
  providers: [BcryptAdapter],
  imports: [],
  exports: [BcryptAdapter],
})
export class CommonModule {}
