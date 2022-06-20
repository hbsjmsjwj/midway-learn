import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';
import * as jwt from '@midwayjs/jwt';
import * as egg from '@midwayjs/web';

@Configuration({
  imports: [egg],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
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
export class ContainerConfiguration {}

@Configuration({
  imports: [jwt],
})
export class AutoConfiguration {
  //...
}
