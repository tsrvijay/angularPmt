import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';

import { UserSearchComponent} from '../user-search/user-search.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { User } from '../user-list/user';
import { Project } from '../model/project';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { ParentTask } from '../model/parentTask';
import { ParenttaskSearchComponent } from '../parenttask-search/parenttask-search.component';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  startDate = new Date(new Date().getTime());
  endDate = new Date(new Date().getTime()+86400000);
  parentTaskSelect = true;
  myModel =true;
  searchUserForm: FormGroup;
  searchProjectForm: FormGroup;
  
  parentTaskForm:FormGroup;
  parentTaskSearch:FormControl;  
  endDateCntl:FormControl;
  startDateCntl:FormControl;
  taskAddForm: FormGroup;
  parentTaskSearchDisable:boolean; 
  
  errorMsg:string;
  public manager:User;
  public projects=[{ "projectId": 123, "projectName":"Apt 360", "startDate": "08/02/2019", "endDate":"08/02/201", "priority":1, "noOfTasks":10,
    "completedTasks":2, "status":"completed", 
    manager:{"userId":2,"firstName":"Keevin","lastName":"Joe","employeeId":"emp2"}},
    { "projectId": 124, "projectName":"GET NG", "startDate": "08/15/2019", "endDate":"08/20/2019", "priority":1, "noOfTasks":10,
    "completedTasks":10, "status":"completed", 
    manager:{"userId":2,"firstName":"Keevin","lastName":"Joe","employeeId":"emp2"}}];
  public project:Project;
  public parentTask:ParentTask;

  constructor(private fb: FormBuilder,private modalService: MatDialog,private userService:UserService,private projectService:ProjectService,private taskService:TaskService) {
    this.createForm();
   }

  ngOnInit() {
    this.userService.managerUpdated.subscribe(message => { 
      this.manager = message;
      if (this.manager != null)
        this.taskAddForm.patchValue({userId: this.manager.firstName + ' ' + this.manager.lastName});
    });
    this.projectService.projectUpdated.subscribe(message => { 
      this.project = message;
      if (this.project != null)
        this.taskAddForm.patchValue({projectName: this.project.projectName});
    });

    this.taskService.parentTaskUpdated.subscribe(message => { 
      this.parentTask = message;
      if (this.parentTask != null)
        this.taskAddForm.patchValue({parentTask: this.parentTask.title});
    });
  }

  createForm() {
    this.endDateCntl = new FormControl(this.endDate,[Validators.required]); 
    this.startDateCntl = new FormControl(this.startDate,[Validators.required]); 
    this.taskAddForm = this.fb.group({
      projectName: ['', Validators.required ],
      task: ['', Validators.required ], 
      priority: ['', Validators.required ],
      userId: ['', Validators.required ],
      parentTaskSelect:['', Validators.nullValidator],
      parentTask:['', Validators.required],
      startDate:['', Validators.required ],
      endDate:['', Validators.required ],
      startDateCntl:['',Validators.required ],
      endDateCntl:['',Validators.required ],  
      parentTaskSearch:['',Validators.nullValidator ],
      userSearch:['',Validators.nullValidator ]      
    });

    this.searchUserForm = this.fb.group({
      userSearch:['',Validators.nullValidator ]     

    });
    this.searchProjectForm = this.fb.group({
      projectSearch:['',Validators.nullValidator ]      

    });
    this.parentTaskForm = this.fb.group({
      parentTaskSearch:['',Validators.nullValidator ]      

    });

  } 

  setDefaultDate(){
    console.log('Default date funcation called');
    this.startDate = new Date(new Date().getTime());
    this.endDate = new Date(new Date().getTime()+86400000);
    this.startDateCntl.setValue(this.startDate);
    this.endDateCntl.setValue(this.endDate);
  }

  public reset(){
    this.taskAddForm.reset();
    this.setDefaultDate();
    console.log('reset called');
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

  public addTask(taskName){
    console.log('Inside add Task'+taskName);
    console.log(this.project);

    if (this.taskAddForm.get('parentTaskSelect').value){
      const parentTask = {title:taskName,project:this.project};
      console.log('Task details ' + parentTask);
       this.taskService.addParentTask(parentTask);
    }else{
      const parentTask = {title:taskName,project:this.project};

     const task = {task:taskName,parentTask:parentTask,project:this.project,
        startDate:this.startDateCntl.value,endDate:this.endDateCntl.value,priority:10,
      status:"Open",user:this.manager};
      console.log('Task details ' + parentTask);
      
        this.taskService.addTask(task);
    }
  }

  public searchParentTask(content){
    console.log('Printing parent task');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.maxWidth="100%"; 
    
    dialogConfig.data = {filterObject:this.project};
    this.modalService.open(ParenttaskSearchComponent, dialogConfig);
    console.log(this.parentTask); 
  }


  public searchManager(content){
    console.log('Printing manager');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.maxWidth="100%"; 
    
    dialogConfig.data = {filterString:this.searchUserForm.getRawValue()};
    this.modalService.open(UserSearchComponent, dialogConfig);
    console.log(this.manager); 
  }

  toggleControl(){
    console.log('Inside toggle');
    console.log(this.taskAddForm.get('parentTaskSelect').value);

    if(!this.taskAddForm.get('parentTaskSelect').value){
      this.parentTaskSearchDisable=true;
      this.taskAddForm.get('userId').disable();
      this.taskAddForm.get('priority').disable();
      this.taskAddForm.get('parentTask').disable();
      this.taskAddForm.get('endDateCntl').disable();
    }else{
      this.parentTaskSearchDisable=false;
      this.taskAddForm.get('userId').enable(); 
      this.taskAddForm.get('priority').enable();
      this.taskAddForm.get('parentTask').enable();
      this.taskAddForm.get('endDateCntl').enable();
    }
  }
}
