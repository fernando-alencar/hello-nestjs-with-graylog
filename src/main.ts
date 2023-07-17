import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
const GelfTransport = require('winston-gelf');

const options = {
  gelfPro: {
    fields: {
      env: process.env.NODE_ENV,
      facility: 'app'
    },
    adapterName: 'udp', // optional; currently supported "udp", "tcp" and "tcp-tls"; default: udp
    adapterOptions: { // this object is passed to the adapter.connect() method        
      host: 'localhost', // optional; default: 127.0.0.1
      port: 12201, // optional; default: 12201
    }
  }
}

const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console(),
    new GelfTransport(options)
  ]
})


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger

  });
  logger.log('Hello there');

  await app.listen(3001);
}
bootstrap();
