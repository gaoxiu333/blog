import { Controller, Get } from '@nestjs/common';
import { StacksService } from 'src/stacks/stacks.service';
import * as _ from 'lodash';
@Controller('stacktop')
export class StacktopController {
  constructor(private readonly sService: StacksService) {}
  @Get()
  async getTop(m = 5) {
    const data = await this.sService.getAllStack();
    return _.take(_.shuffle(data), m);
  }
}
