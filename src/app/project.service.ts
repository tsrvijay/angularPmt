import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from './user-list/user';
import { HttpErrorResponse} from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Project } from './model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  private _wsurl:string = "http://localhost:8080";
  

  addProject(project){  
    console.log(project);
    this.http.post(`${this._wsurl}/Project/save`, project)
        .subscribe(res => console.log('Done'));
  }

  deleteProject(project:Project){  
      console.log(project);
      this.http.post(`${this._wsurl}/Project/delete`, project)
          .subscribe(res => console.log('Done'));
    }

  getProjects(sortBy):Observable<Project>{
    //this.http.post(this._url,)
    
    return this.http.get<Project[]>(`${this._wsurl}/Project/findAll/`+sortBy).pipe(
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
