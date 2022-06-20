import { Inject, Controller, Post, Body, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { InterfaceService } from '../service/interface';

@Controller('/api')
export class InterfaceController {
  @Inject()
  ctx: Context;

  @Inject()
  interfaceService: InterfaceService;

  @Post('/addInterface')
  async addInterface(@Body() params: any) {
    // const { path, method, title, project_id, description, res_body } = params;
    const inter = await this.interfaceService.addInterface(params);
    return {
      code: 200,
      data: inter,
    };
  }

  @Get('/getInterface')
  async getUser(): Promise<any> {
    const pro = await this.interfaceService.getInterface();
    return { success: true, message: 'OK', data: pro };
  }
}
