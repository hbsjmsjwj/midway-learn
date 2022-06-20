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
    console.log('jwj-');
    return async (ctx: Context, next: NextFunction) => {
      console.log('jwj');
      let path = ctx.path;
      // let header = ctx.request.header;
      if (path.indexOf('/mock/') !== 0) {
        // 不是mock接口
        if (next) await next();
        return true;
      }

      next();
      let paths = path.split('/');
      let peojectId = paths[2];
      console.log('mock---', paths, peojectId);
      return (ctx.body = 'mock');
    };
  }
  static getName(): string {
    return 'report';
  }
}
