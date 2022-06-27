import { Controller, Get, Inject } from '@midwayjs/decorator';
import { PhotoService } from '../service/photo';
import { AuthJwt } from '../service/auth';

@Controller('/')
export class HomeController {
  @Inject()
  testService: PhotoService;

  @Get('/test')
  async testLink() {
    const photo = await this.testService.savePhoto();
    console.log('test调用的photo');
    return photo;
  }
  @Inject()
  testJwtServcer: AuthJwt;
  @Get('/testSign')
  async testSign() {
    const tk = await this.testJwtServcer.invokeSign();
    console.log('测试jwt',tk);
    return {
      code:200,
      tk
    };
  }
}
