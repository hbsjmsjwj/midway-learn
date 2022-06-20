import { Provide, Inject } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class AuthJwt {
  @Inject()
  jwtService: JwtService;

  async invokeSign() {
    const tk = await this.jwtService.signSync({
      name: 'jwj',
      age: 25,
      gender: '男',
    });
    return tk;
  }
}
