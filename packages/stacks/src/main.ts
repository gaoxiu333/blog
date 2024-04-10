import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

const rooot = process.cwd();

const httpsOptions = {
  key: fs.readFileSync(path.join(rooot, 'src', 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(rooot, 'src', 'cert', 'cert.pem')),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3002);
}
bootstrap();
