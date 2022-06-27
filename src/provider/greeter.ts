import {
  MSProviderType,
  Provide,
  Provider,
  GrpcMethod,
} from '@midwayjs/decorator';
import { helloworld } from '../domain/helloworld';

/**
 * 实现 helloworld.Greeter 接口的服务
 */
@Provide()
@Provider(MSProviderType.GRPC, { package: 'helloworld' })
export class Greeter implements helloworld.Greeter {
  @GrpcMethod()
  async sayHello(request: helloworld.HelloRequest) {
    console.log('rpc-', { message: 'Hello ' + request.name });
    return { message: 'Hello ' + request.name };
  }
}
