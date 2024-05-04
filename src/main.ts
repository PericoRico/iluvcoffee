import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true //Con esto no hace falta decorar con type los DTO
      }
    }
  ));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor);
  //app.useGlobalGuards(new ApiKeyGuard()); no sep uede usar si tiene inyeccion de dependencias

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffe')
    .setDescription('The Coffees API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); //ruta para montar el swagger , instancia de la app, el documento

  await app.listen(3000);
}
bootstrap();
