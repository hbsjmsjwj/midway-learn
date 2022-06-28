import { createApp, close } from '@midwayjs/mock';
import { Framework, createGRPCConsumer } from '@midwayjs/grpc';
import { join } from 'path';
import { helloworld } from '../src/domain/helloworld';
import * as consul from '@midwayjs/consul'

describe('test/index.test.ts', () => {

  it('should create multiple grpc service in one server', async () => {
    const baseDir = join(__dirname, '../');

    // 创建服务
    const app = await createApp<Framework>();

    // 调用服务
    const service = await createGRPCConsumer<helloworld.GreeterClient>({
      package: 'helloworld',
      protoPath: join(baseDir, 'proto', 'helloworld.proto'),
      url: 'localhost:6565'
    });

    const result = await service.sayHello().sendMessage({
      name: 'harry'
    });

    console.log('====================================',result)
    expect(result.message).toEqual('Hello harry');
    await close(app);
  });

});
