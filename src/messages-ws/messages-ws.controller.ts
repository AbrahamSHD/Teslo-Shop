import { Controller } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';

@Controller('messages-ws')
export class MessagesWsController {
  constructor(private readonly messagesWsService: MessagesWsService) {}
}
