import { Module } from '@nestjs/common';
import { StacklistService } from './stacklist.service';
import { StacklistController } from './stacklist.controller';
import { PrismaService } from 'src/prisma.service';
import { StacksService } from 'src/stacks/stacks.service';

@Module({
  controllers: [StacklistController],
  providers: [StacklistService, PrismaService, StacksService],
})
export class StacklistModule {}
