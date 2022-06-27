import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { join } from 'path';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1655260656697_1380',
    egg: {
      port: 7002,
    },
    orm: {
      /**
       * 单数据库实例
       */
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'jyapi',
      synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
      logging: false,
    },
    jwt: {
      secret: 'jwjkw', // fs.readFileSync('xxxxx.key')
      expiresIn: '2d', // https://github.com/vercel/ms
    },
    // security: {
    //   csrf: false,
    // },
    grpcServer: {
      services: [
        {
          url: 'localhost:7002',
          protoPath: join(appInfo.appDir, 'proto/helloworld.proto'),
          package: 'helloworld'
        },
        {
          protoPath: join(appInfo.appDir, 'proto/hero.proto'),
          package: 'hero',
        },
        {
          protoPath: join(appInfo.appDir, 'proto/helloworld.proto'),
          package: 'helloworld',
        },
      ],
    },
  } as MidwayConfig;
};
