import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import { ProjectComponent } from '../project/project.component';


import {MatTableModule} from '@angular/material';

import { MatTableDataSource,MAT_DIALOG_DATA,MatSort,MatPaginator } from '@angular/material';
import { ParentTask } from '../model/parentTask'; 
import { ProjectService } from '../project.service';
import { TaskService } from '../task.service';
import { TaskAddComponent } from '../task-add/task-add.component';
import { Project } from '../model/project';


@Component({
  selector: 'app-parenttask-search',
  templateUrl: './parenttask-search.component.html',
  styleUrls: ['./parenttask-search.component.css']
})
export class ParenttaskSearchComponent implements OnInit {

  parentTaskDataSource: MatTableDataSource<ParentTask>; 
  public ParentTasks =[]; 
  displayedColumns = ['title', 'parentTaskId'];
  searchKey: string;
  errorMsg:string; 
  project:Project;
  
  constructor(public dialogRef: MatDialogRef<TaskAddComponent>,public parentTaskService: TaskService,@Inject(MAT_DIALOG_DATA) dialogData ) { 
// update project id as parameter

    this.project = dialogData.filterObject;
    this.parentTaskService.getParentTasks(this.project.projectId).subscribe(
      data => {
        this.ParentTasks = data;
        
        console.log('Data Returned...................'); 
        console.log(data);
        console.log('Data Mapped...................');  
        console.log(this.ParentTasks);    
        this.parentTaskDataSource = new MatTableDataSource(this.ParentTasks); 
        this.searchKey = dialogData.filterString;
    console.log('Printing search key...'+ dialogData.managerId);
    

    console.log('printing userDataSource');
    console.log(this.parentTaskDataSource);
      }, error => this.errorMsg = error);
    console.log('Data Returned');
    console.log(this.ParentTasks); 
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

  public modelCellClick(parentTask){
    console.log('Cell click event called11');
    console.log(parentTask); 
    console.log(parentTask.title);
    console.log(parentTask.project);
    this.dialogRef.close();
    
    this.parentTaskService.updateParentTaskSelection(parentTask);
  }
  

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.parentTaskDataSource.filter = filterValue; 
  }
}
