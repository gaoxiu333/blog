import { Controller, Get, Query } from '@nestjs/common';
import { StacksService } from 'src/stacks/stacks.service';

@Controller('stacklist')
export class StacklistController {
  constructor(private readonly sService: StacksService) {}

  @Get()
  findAll(@Query('tag') tag?: string) {
    return this.sService.getAllStack(tag);
  }
}
