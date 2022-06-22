import { Inject, Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IMiddleware } from '@midwayjs/core';

import { ProjectService } from '../service/project';
type NextFunction = () => Promise<any>;
@Middleware()
export class MockMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  projectService: ProjectService;
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      let path = ctx.path;
      let header = ctx.request.header;
      if (path.indexOf('/mock/') !== 0) {
        // 不是mock接口
        if (next) await next();
        return true;
      }

      ctx.set('Access-Control-Allow-Origin', header.origin);
      ctx.set('Access-Control-Allow-Credentials', 'true');
      let paths = path.split('/');
      let projectId = paths[2];
      const hasProId = await this.projectService.hasPro(projectId);
      if (!hasProId) {
        return (ctx.body = {
          code: '-1',
          data: `数据库没有此项目${projectId}`,
          message: `项目不存在`,
        });
      }

      return (ctx.body = {
        data: 'mock',
      });
    };
  }
  static getName(): string {
    return 'report';
  }
}
