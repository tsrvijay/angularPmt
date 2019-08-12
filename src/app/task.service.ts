import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user-list/user';
import { HttpErrorResponse} from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ParentTask } from './model/parentTask';
import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  constructor(private http: HttpClient) { }
  private _wsurl:string = "http://localhost:8080";
  
  parentTask:ParentTask;
  private messageSource = new BehaviorSubject<ParentTask>(this.parentTask);
  parentTaskUpdated=this.messageSource.asObservable();

  updateParentTaskSelection(parentTask:ParentTask){
    this.messageSource.next(parentTask);
  }

  editTask:Task;
  private taskMessageSource = new BehaviorSubject<Task>(this.editTask);
  taskUpdated=this.taskMessageSource.asObservable();

  updateTaskSelection(editTask:Task){
    this.taskMessageSource.next(editTask);
  }

  public updateTaskStatus(task:Task){  
    console.log(task);
    task.status='COMPLETED';
    this.http.post(`${this._wsurl}/Task/updateStatus`, task)
        .subscribe(res => console.log('Done'));
  } 

  addParentTask(task){  
    console.log('Printing in service : ');
    console.log(task);
    this.http.post(`${this._wsurl}/ParentTask/save`, task)
        .subscribe(res => console.log('Done'));
  }
  addTask(task){  
    console.log('Printing in service : ');
    console.log(task);
    this.http.post(`${this._wsurl}/Task/save`, task)
        .subscribe(res => console.log('Done'));
  }
  deleteProject(project:ParentTask){  
      console.log(project);
      this.http.post(`${this._wsurl}/Project/delete`, project)
          .subscribe(res => console.log('Done'));
    }
    
getParentTasks(projectId):Observable<ParentTask[]>{ 
    console.log('Project Id ' + projectId);
    return this.http.get<ParentTask[]>(`${this._wsurl}/ParentTask/findAll/`+projectId).pipe(
      retry(1),
      catchError(err => {
        console.log(err);
        this.errorHandler(err);
        return of(null);
      })
   );
  }
  getTasks(projectId):Observable<Task[]>{ 
    console.log('Project Id ' + projectId); 
    return this.http.get<Task[]>(`${this._wsurl}/Task/findByProjectId/`+projectId).pipe(
      retry(1),
      catchError(err => {
        console.log(err);
        this.errorHandler(err);
        return of(null);
      })
   );
  }
  errorHandler(error: HttpErrorResponse){
    throw throwError(error.message || "Server Error");
  };

}
