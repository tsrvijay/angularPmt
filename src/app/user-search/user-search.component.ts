import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { ProjectComponent } from '../project/project.component';


import { UserService } from '../user.service';
import {User} from '../user-list/user';
import {MatTableModule} from '@angular/material';

import { MatTableDataSource,MAT_DIALOG_DATA,MatSort,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  //listData:MatTableDataSource<any>;
  userDataSource: MatTableDataSource<User>;
  //users: User[]; 
  public users =[]; 
  //= [{firstName:'Vijay',lastName:'Hari',employeeId:'emp1',userId:123},
  // {firstName:'Vijay',lastName:'Hari',employeeId:'emp1',userId:234},
  // {firstName:'Vijay',lastName:'Hari',employeeId:'emp2',userId:567},
  // {firstName:'Ajay',lastName:'Mathew',employeeId:'emp3',userId:789}];
  displayedColumns = ['firstName', 'lastName', 'employeeId','userId'];
  searchKey: string;
  errorMsg:string; 
  
  constructor(public dialogRef: MatDialogRef<ProjectComponent>,public userService: UserService,@Inject(MAT_DIALOG_DATA) dialogData ) { 

    this.userService.getUsers('firstName').subscribe(
      data => {
        this.users = data;
        
        console.log('Data Returned...................'); 
        console.log(data);
        console.log('Data Mapped...................');  
        console.log(this.users);    
        this.userDataSource = new MatTableDataSource(this.users); 
        this.searchKey = dialogData.filterString;
    console.log('Printing search key...'+ dialogData.managerId);
    

    console.log('printing userDataSource');
    console.log(this.userDataSource);
    //applyFilter(this.searchKey);
      }, error => this.errorMsg = error);
    console.log('Data Returned');
    console.log(this.users); 
    
    console.log(this.errorMsg);
    
    
  }

  ngOnInit() {

    
  }


  
  public modelOk(){
    this.dialogRef.close();
  }
  public modelCancel(){
    this.dialogRef.close();
  }

  public modelDismiss(){
    this.dialogRef.close();
  }

  public modelCellClick(user){
    console.log('Cell click event called');
    console.log(user.userId);
    console.log(user.lastName);
    this.dialogRef.close();
    console.log(user.employeeId);
    this.userService.updateManagerSelection(user);
    //this.projectComp.manager = user;
    //this.projectComp.projectForm.patchValue({managerId:'user.lastName'});
  }
  

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.userDataSource.filter = filterValue;
  }
}
