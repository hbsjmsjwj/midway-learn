import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Project } from '../model/project';

@Provide()
export class ProjectService {
  @InjectEntityModel(Project)
  projectModel: Repository<Project>;

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
