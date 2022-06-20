import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Project } from '../model/project';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class ProjectService {
  @InjectEntityModel(Project)
  projectModel: Repository<Project>;

  async hasPro(project_id) {
    const data = await this.projectModel.findOne({
      where: { id: project_id },
    });
    return data;
  }
  async addProject() {
    const project = new Project();
    project.name = 'first Pro';
    project.description = '自己的第一个测试项目';
    project.isPublished = false;
    const projectResult = await this.projectModel.save(project);
    return {
      code: 200,
      type: 'add project',
      result: projectResult,
    };
  }
}
