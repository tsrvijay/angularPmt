import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user-list/user';
import { HttpErrorResponse} from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url:string = "/assets/data/user.json";
  private _wsurl:string = "http://localhost:8080";

  
  manager:User;
  private messageSource = new BehaviorSubject<User>(this.manager);
  managerUpdated=this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  updateManagerSelection(user:User){
    this.messageSource.next(user);
  }
  getManagerSelection(){

  }

  addUser(firstName:string,lastName:string,employeeId:string,userId:number){  
    const obj = {
    firstName,
    lastName,
    employeeId,
    userId
  };
  console.log(obj);
  this.http.post(`${this._wsurl}/User/save`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteUser(user){  
    console.log(user);
     this.http.post(`${this._wsurl}/User/delete`, user)
         .subscribe(res => console.log('Done'));
    }

  getUsers(sortBy):Observable<User[]>{
    
    return this.http.get<User[]>(`${this._wsurl}/User/findAll/`+sortBy).pipe(
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
