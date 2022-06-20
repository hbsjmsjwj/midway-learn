import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Interface } from '../model/interface';
import { Project } from '../model/project';

@Provide()
export class InterfaceService {
  @InjectEntityModel(Interface)
  interfaceModel: Repository<Interface>;

  @InjectEntityModel(Project)
  projectModel: Repository<Project>;

  async addInterface(params) {
    console.log(params);
    const { path, method, title, project_id, description, res_body } = params;
    const hasPro = await this.projectModel.findOne({
      where: { id: project_id },
    });
    if (!hasPro)
      return {
        msg: -1,
        data: '项目不存在',
      };
    const inter = new Interface();
    inter.path = path;
    inter.method = method;
    inter.title = title;
    inter.project_id = project_id;
    inter.description = description;
    inter.res_body = res_body;
    const interResult = this.interfaceModel.save(inter);

    return {
      code: 200,
      type: 'add project',
      result: interResult,
    };
  }

  async getInterface() {
    return this.interfaceModel.find();
  }
}
