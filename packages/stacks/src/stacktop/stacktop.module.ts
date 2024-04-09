import { Module } from '@nestjs/common';
import { StacktopService } from './stacktop.service';
import { StacktopController } from './stacktop.controller';
import { StacksService } from 'src/stacks/stacks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StacktopController],
  providers: [StacktopService, StacksService, PrismaService],
})
export class StacktopModule {}
