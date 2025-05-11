import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandlingFilter } from './filters/exception-handling/exception-handling.filter';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   const httpAdapterHost = app.get(HttpAdapterHost);
   app.useGlobalFilters(new ExceptionHandlingFilter(httpAdapterHost));
   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
