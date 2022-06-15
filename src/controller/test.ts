import { Controller, Get, Inject } from '@midwayjs/decorator';
import { PhotoService } from '../service/photo';

@Controller('/')
export class HomeController {
  @Inject()
  testService: PhotoService;

  @Get('/test')
  async testLink() {
    const photo = await this.testService.savePhoto();
    console.log('test调用的photo')
    return photo;
  }
}
