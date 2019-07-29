import { User } from '../user-list/user';

export interface Project {
   
    projectId: number;
    startDate: string;
    endDate:string;
    priority:number;
    noOfTasks:number;
    completedTasks:number;
    status:string;
    manager:User;
  }
  