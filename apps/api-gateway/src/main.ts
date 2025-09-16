import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
 
  await app.startAllMicroservices();

  const port = process.env.PORT!;
  
  await app.listen(port);
  
  console.log(`Running at localhost:${port}`)
}
bootstrap();
