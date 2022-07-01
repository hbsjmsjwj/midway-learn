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
    grpcServer: {
      services: [
        {
          protoPath: join(appInfo.appDir, 'proto/helloworld.proto'),
          package: 'helloworld',
        },
      ],
    },
    consul: {
      // 启动consul服务 consul agent -dev
      provider: {
        // 注册本服务
        register: true,
        // 应用正常下线反注册
        deregister: true,
        // consul server 主机
        host: '127.0.0.1', // 此处修改 consul server 的地址
        // consul server 端口
        port: 8500, // 端口也需要进行修改
        // 调用服务的策略(默认选取 random 具有随机性)
        strategy: 'random',
      },
      service: {
        address: '127.0.0.1', // 此处是当前这个 midway 应用的地址
        port: 7002, // midway应用的端口
        tags: ['tag1', 'tag2'], // 做泳道隔离等使用
        name: 'midway-egg',
        // others consul service definition
      },
    },
    rabbitmq: {
      url: {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: '/',
      },
    },
    otel: {
      tags: [], // optional
      // You can use the default UDPSender
      host: 'localhost', // optional
      port: 6832, // optional
      // OR you can use the HTTPSender as follows
      // endpoint: 'http://localhost:14268/api/traces',
      maxPacketSize: 65000, // optional
    },
    // security: {
    //   csrf: false,
    // },
  };
};
