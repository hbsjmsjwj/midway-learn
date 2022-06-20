import { Inject, Middleware } from '@midwayjs/decorator';
import { Context } from 'egg';
// import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

type NextFunction = () => Promise<any>;

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      next()
      return
      // // 判断下有没有校验信息
      // if (!ctx.headers['authorization']) {
      //   console.log('没有 authorization');
      //   throw new httpError.UnauthorizedError();
      //   return;
      // }

      // // 从 header 上获取校验信息
      // const parts = ctx.get('authorization').trim().split(' ');

      // if (parts.length === 2) {
      //   const scheme = parts[0];
      //   const token = parts[1];

      //   if (/^Bearer$/i.test(scheme)) {
      //     try {
      //       //jwt.verify方法验证token是否有效
      //       await this.jwtService.verify(token, {
      //         complete: true,
      //       });
      //     } catch (error) {
      //       //token过期 生成新的token
      //       const newToken = getToken(user);
      //       //将新token放入Authorization中返回给前端
      //       ctx.set('Authorization', newToken);
      //     }
        // }
      // }
    };
  }
}
