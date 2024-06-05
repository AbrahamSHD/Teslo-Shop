import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsController } from './messages-ws.controller';

@Module({
  controllers: [MessagesWsController],
  providers: [MessagesWsService],
})
export class MessagesWsModule {}
