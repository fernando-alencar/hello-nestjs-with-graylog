import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
const GelfTransport = require('winston-gelf');

const options = {
  gelfPro: {
    fields: {
    },
    adapterName: 'udp', // optional; currently supported "udp", "tcp" and "tcp-tls"; default: udp
    adapterOptions: { // this object is passed to the adapter.connect() method        
      host: '127.0.0.1', // optional; default: 127.0.0.1
      port: 12201, // optional; default: 12201
    }
  }
}

const gelfTransport = new GelfTransport(options);

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
        gelfTransport
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [WinstonModule]
})
export class AppModule {}
