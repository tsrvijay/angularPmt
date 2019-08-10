import { User } from '../user-list/user';
import { ParentTask } from './parentTask';
import { Project } from './project';

export interface Task {
   
    taskId: number;
    task: string,
    parentTask:ParentTask;
    project:Project;
    startDate: string;
    endDate:string;
    priority:number;
    status:string;
    user:User;
  }
  