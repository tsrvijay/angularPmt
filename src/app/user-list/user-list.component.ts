import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from '../user.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
    this.refreshUser('firstName');
   }

  public firstName:string="";
  public lastName:string="";
  public employeeId:string="";
  public users =[];
  public user:User;
  public errorMsg="";

  ngOnInit() {
    
  }

  private refreshUser(sortBy) {
    console.log('refresh called')
      this._userService.getUsers(sortBy).subscribe(data => this.users = data, error => this.errorMsg = error);
  }

  public addUser(firstName,lastName,employeeId,userId){
    console.log('test');
    this._userService.addUser(firstName,lastName,employeeId,userId);
    this.refreshUser('firstName');
   }
  public deleteUser(user){
    this._userService.deleteUser(user);    
    console.log(user);
    this.refreshUser('firstName');
  }
  public findAll(sortBy){
    console.log(sortBy);
    this.refreshUser(sortBy);
  }

  public sortByLastName(){
    console.log(this.users);
    this.users.sort((a,b)=>{
      if (a.lastName > b.lastName) { 
        return 1;
      } else if (b.lastName > a.lastName) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.users);
  }
  public sortByFirstName(){
    console.log(this.users);

    this.users.sort((a,b)=>{
      if (a.firstName > b.firstName) { 
        return 1;
      } else if (b.firstName > a.firstName) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.users);
  }
  public sortByEmployeeId(){
    console.log(this.users);

    this.users.sort((a,b)=>{
      if (a.employeeId > b.employeeId) { 
        return 1;
      } else if (b.employeeId > a.employeeId) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log('After sort');
    console.log(this.users);
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
