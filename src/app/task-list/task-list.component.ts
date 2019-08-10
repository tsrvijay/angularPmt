import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { Task } from '../model/task';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
   
  
  public project:Project={ "projectId": 123, "projectName":"Apt 360", "startDate": "08/02/2019", "endDate":"08/02/201", "priority":1, "noOfTasks":10,
    "completedTasks":2, "status":"completed", 
    manager:{"userId":2,"firstName":"Keevin","lastName":"Joe","employeeId":"emp2"}};
  public tasks=[{"taskId":123,task:"Sample Taskaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa",startDate:"01/01/2019",endDate:"01/01/2019",priority:111,
  project:this.project,status:"Completed",
  user:{"userId":2,"firstName":"Keevin","lastName":"Joe","employeeId":"emp2"},
  parentTask:{parentTaskId:124,title:"Parent Taskhhhhhhhhhhhhhhhhh hhhhhhhhhh h h hhhh h",project:this.project}}];
  
  searchProjectForm: FormGroup;
  taskListForm: FormGroup;
  errorMsg:String;
 
  constructor(private fb: FormBuilder,private modalService: MatDialog,private projectService:ProjectService,private taskService:TaskService) {
    this.createForm();
   }

  ngOnInit() {
    this.projectService.projectUpdated.subscribe(message => { 
      this.project = message;
      if (this.project != null){
        this.taskListForm.patchValue({projectName: this.project.projectName});
        this.listAllTasks();
      }
    });

  }
  public searchProject(content){
    console.log('Printing manager');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.maxWidth="100%"; 
    
    dialogConfig.data = {filterString:this.searchProjectForm.getRawValue()};
    this.modalService.open(ProjectSearchComponent, dialogConfig);
    
    console.log(this.searchProjectForm); 
  }
  createForm() {
    this.taskListForm = this.fb.group({
      projectName: ['', Validators.required ],
    });

    this.searchProjectForm = this.fb.group({
      projectSearch:['',Validators.nullValidator ]      

    });
  }
  listAllTasks(){
    console.log('inside list All Tasks');
    this.taskService.getTasks(this.project.projectId).subscribe(data => this.tasks = data, error => this.errorMsg = error);
  }

  public sortByStartDate(){
    console.log(this.tasks);

    this.tasks.sort((a,b)=>{
      if (a.startDate > b.startDate) { 
        return 1;
      } else if (b.startDate > a.startDate) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.tasks);
  }


  public sortByEndDate(){
    console.log(this.tasks);

    this.tasks.sort((a,b)=>{
      if (a.endDate > b.endDate) { 
        return 1;
      } else if (b.endDate > a.endDate) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.tasks);
  }
  public sortByPriority(){
    console.log(this.tasks);

    this.tasks.sort((a,b)=>{
      if (a.priority > b.priority) { 
        return 1;
      } else if (b.priority > a.priority) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.tasks);
  }
  public sortByTask(){
    console.log(this.tasks);

    this.tasks.sort((a,b)=>{
      if (a.task > b.task) { 
        return 1;
      } else if (b.task > a.task) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.tasks);
  }

}
