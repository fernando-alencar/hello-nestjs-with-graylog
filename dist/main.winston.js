"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
const GelfTransport = require('winston-gelf');
const options = {
    gelfPro: {
        fields: {
            env: process.env.NODE_ENV,
            facility: 'fp-backend'
        },
        adapterName: 'udp',
        adapterOptions: {
            host: 'graylog.develop.k8s.facepassbrasil.com.br',
            port: 12201,
        }
    }
};
const logger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new GelfTransport(options)
    ]
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger
    });
    logger.log('Hello there');
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.winston.js.map