
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { ProjectComponent } from '../project/project.component';


import { UserService } from '../user.service';
import {User} from '../user-list/user';
import {MatTableModule} from '@angular/material';

import { MatTableDataSource,MAT_DIALOG_DATA,MatSort,MatPaginator } from '@angular/material';
import { Project } from '../model/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {

  projectDataSource: MatTableDataSource<Project>;
  public projects =[]; 
  displayedColumns = ['projectName', 'status', 'priority','projectId'];
  searchKey: string;
  errorMsg:string; 
  
  constructor(public dialogRef: MatDialogRef<ProjectComponent>,public projectService: ProjectService,@Inject(MAT_DIALOG_DATA) dialogData ) { 

    this.projectService.getProjects('projectName').subscribe(
      data => {
        this.projects = data;
        
        console.log('Data Returned...................'); 
        console.log(data);
        console.log(this.projects);    
        this.projectDataSource = new MatTableDataSource(this.projects); 
        this.searchKey = dialogData.filterString;
    console.log('Printing search key...'+ dialogData.managerId);
    console.log('printing userDataSource');
    console.log(this.projectDataSource);
      }, error => this.errorMsg = error);
    console.log('Data Returned');
    console.log(this.projects); 
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

  public modelCellClick(project){
    console.log('Cell click event called');
    console.log(project.projectId);
    console.log(project.projectName);
    this.dialogRef.close();
    
    this.projectService.updateProjectSelection(project);
  }
  

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.projectDataSource.filter = filterValue;
  }
}
