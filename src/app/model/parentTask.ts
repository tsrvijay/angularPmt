import { User } from '../user-list/user';
import { Project } from './project';

export interface ParentTask {
    parentTaskId: number;
    title: string;
    project: Project;
  }
  