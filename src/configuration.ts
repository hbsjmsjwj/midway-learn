import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';
import * as egg from '@midwayjs/web';
import * as consul from '@midwayjs/consul';
import * as rabbitmq from '@midwayjs/rabbitmq';

// import { MockMiddleware } from './middleware/mock.middleware';
import * as grpc from '@midwayjs/grpc';
import * as otel from '@midwayjs/otel';
import * as prometheus from '@midwayjs/prometheus';


export class MainConfiguration {}

/**************dev 启动不走bootstrap.js*  测试Jaeger 要先build 再 node bootstrap.js*********************************************************************** */

@Configuration({
  imports: [consul],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerConfiguration {}

@Configuration({
  imports: [egg, rabbitmq, grpc, otel,prometheus],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    // this.app.useMiddleware(MockMiddleware);
  }
}

@Configuration({
  imports: [
    orm, // 加载 orm 组件
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerConfiguratin {}

@Configuration({
  imports: [
    {
      component: swagger,
      enabledEnvironment: ['local'], //只在本地开启
    },
  ],
})
@Configuration({
  imports: [jwt],
})
export class AutoConfiguration {
  //...
}
