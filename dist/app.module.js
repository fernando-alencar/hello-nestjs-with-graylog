"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const GelfTransport = require('winston-gelf');
const options = {
    gelfPro: {
        fields: {},
        adapterName: 'udp',
        adapterOptions: {
            host: '127.0.0.1',
            port: 12201,
        }
    }
};
const gelfTransport = new GelfTransport(options);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new winston.transports.Console(),
                    gelfTransport
                ],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        exports: [nest_winston_1.WinstonModule]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map