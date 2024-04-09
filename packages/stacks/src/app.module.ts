import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StacklistModule } from './stacklist/stacklist.module';
import { StacktopModule } from './stacktop/stacktop.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), StacklistModule, StacktopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
