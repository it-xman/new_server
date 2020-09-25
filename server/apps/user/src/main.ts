import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  // https设置
  // const httpsOptions = {
  //     key: fs.readFileSync('/mnt/config/certs/private.key'),
  //     cert: fs.readFileSync('/mnt/config/certs/public.crt'),
  // };
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.setGlobalPrefix('v1');
  const options = new DocumentBuilder()
    .setTitle('User服务API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('user-docs', app, document);
  const PORT = process.env.SERVER_PORT || 3003;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/user-docs`);

}

bootstrap();
