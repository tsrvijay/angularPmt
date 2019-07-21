import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from '../user.service';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  angForm: FormGroup;
  searchForm: FormGroup;
  
  constructor(private fb: FormBuilder,private _userService:UserService) {
    this.createForm();
   }

  public firstName:string="";
  public lastName:string="";
  public employeeId:string="";
  public users =[];
  public user:User;
  public errorMsg="";

  ngOnInit() {
    this.refreshUser();
  }

  private refreshUser(sortBy) {
    console.log('refresh called')
      this._userService.getUsers(sortBy).subscribe(data => this.users = data, error => this.errorMsg = error);
    console.log('refresh completed')
  }

  public addUser(firstName,lastName,employeeId,userId){
    console.log('test');
    this._userService.addUser(firstName,lastName,employeeId,userId);
    this.refreshUser('firstName');
   }
  public deleteUser(user){
    //this.angForm.setValue(user);
    this._userService.deleteUser(user);    
    console.log(user);
    this.refreshUser('firstName');
  }
  public findAll(sortBy){
    console.log(sortBy);
    this.refreshUser(sortBy);
  }
  
  public editUser(user){
    this.angForm.setValue(user);
    this.firstName=user.firstName;
    this.lastName=user.lastName;
    this.employeeId=user.employeeId;
    
    console.log(user);
  }
  public reset(){
    this.angForm.reset();
    this.firstName="";
    this.lastName="";
    this.employeeId="";
    console.log('button called');
  }

  createForm() {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      employeeId: ['', Validators.required ],
      userId: ['', Validators.nullValidator ]
    });

    this.searchForm = this.fb.group({
      search: ['', Validators.required ]
    });
  }

}
