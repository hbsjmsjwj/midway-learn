import { Inject, Controller, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { ProjectService } from '../service/project';

@Controller('/api')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Inject()
  projectService: ProjectService;

  @Get('/addProject')
  async getUser(): Promise<any> {
    const pro = await this.projectService.addProject();
    return { success: true, message: 'OK', data: pro };
  }
}
