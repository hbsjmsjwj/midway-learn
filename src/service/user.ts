import { Provide } from '@midwayjs/decorator';
import { Trace } from '@midwayjs/otel';
import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  
  @Trace('mw-egg-user.get')
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName2',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
