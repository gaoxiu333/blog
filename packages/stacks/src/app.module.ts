import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StacklistModule } from './stacklist/stacklist.module';
import { StacktopModule } from './stacktop/stacktop.module';
import { StacksService } from './stacks/stacks.service';

@Module({
  imports: [StacklistModule, StacktopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
