import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serverConfig = configService.get('server');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Backup System')
    .setDescription('Backup Database')
    .setVersion('1.0')
    .addServer(serverConfig.address)
    .build();
  //const documentFactory = () => SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('api', app, documentFactory);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(serverConfig.documentPath, app, document);

  //await app.listen(process.env.PORT ?? 3000);
  await app.listen(serverConfig.port);
}
bootstrap();
