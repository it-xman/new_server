import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {

    // https设置
    // const httpsOptions = {
    //     key: fs.readFileSync('/mnt/config/certs/private.key'),
    //     cert: fs.readFileSync('/mnt/config/certs/public.crt'),
    // };
    const app = await NestFactory.create(AppModule, {
        // httpsOptions
    });


    app.enableCors();
    const options = new DocumentBuilder()
        .setTitle('Admin后台管理API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
    const PORT = process.env.ADMIN_PORT || 3000
    await app.listen(PORT);
    console.log(`http://localhost:${PORT}/api-docs`)

}

bootstrap();
