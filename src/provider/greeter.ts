import {
  MSProviderType,
  Provider,
  Provide,
  GrpcMethod,
} from '@midwayjs/decorator';
import { helloworld } from '../domain/helloworld';

/**
 * 实现 helloworld.Greeter 接口的服务
 */
@Provider(MSProviderType.GRPC, { package: 'helloworld' })
export class Greeter implements helloworld.Greeter {
  @GrpcMethod()
  async sayHello(request: helloworld.HelloRequest) {
    return { message: 'Hello ' + request.name };
  }
}
