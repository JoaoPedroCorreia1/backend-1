/* eslint-disable prettier/prettier */

import {
  Controller
} from '@nestjs/common';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('Chat')
export class ChatController {
}
