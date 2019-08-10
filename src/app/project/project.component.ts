import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';

import { UserSearchComponent} from '../user-search/user-search.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { User } from '../user-list/user';
import { Project } from '../model/project';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  startDate = new Date(new Date().getTime());
  endDate = new Date(new Date().getTime()+86400000);
  dateSelect = true;
  myModel =true;
  endDateCntl:FormControl;
  startDateCntl:FormControl;
  projectForm: FormGroup;
  searchForm: FormGroup;
  errorMsg:string;
  public manager:User;
  public projects=[{ "projectId": 123, "projectName":"Apt 360", "startDate": "08/02/2019", "endDate":"08/02/201", "priority":1, "noOfTasks":10,
    "completedTasks":2, "status":"completed", 
    manager:{"userId":2,"firstName":"Keevin","lastName":"Joe","employeeId":"emp2"}},
    { "projectId": 124, "projectName":"GET NG", "startDate": "08/15/2019", "endDate":"08/20/2019", "priority":1, "noOfTasks":10,
    "completedTasks":10, "status":"completed", 
    manager:{"userId":2,"firstName":"Keevin","lastName":"Joe","employeeId":"emp2"}}];
  public project:Project;

  constructor(private fb: FormBuilder,private modalService: MatDialog,private userService:UserService,private projectService:ProjectService) {
    this.createForm();
    this.projectService.getProjects('projectName').subscribe(data => this.projects = data, error => this.errorMsg = error);
   }

  ngOnInit() {
    this.endDateCntl = new FormControl(this.endDate,[Validators.required]); 
    this.startDateCntl = new FormControl(this.startDate,[Validators.required]); 

    this.userService.managerUpdated.subscribe(message => { 
      this.manager = message;
      if (this.manager != null)
        this.projectForm.patchValue({managerId: this.manager.firstName + ' ' + this.manager.lastName});
    });
    
  }

  setDefaultDate(){
    console.log('Default date funcation called');
    this.dateSelect=true;
    this.startDate = new Date(new Date().getTime());
    this.endDate = new Date(new Date().getTime()+86400000);
    this.startDateCntl.setValue(this.startDate);
    this.endDateCntl.setValue(this.endDate);
  }

  createForm() {

    this.endDateCntl = new FormControl(this.endDate,[Validators.required]); 
    this.startDateCntl = new FormControl(this.startDate,[Validators.required]); 


    this.projectForm = this.fb.group({
      projectName: ['', Validators.required ],
      priority: ['', Validators.required ],
      managerId: ['', Validators.required ],
      dateSelect:['', Validators.nullValidator],
      startDate:['', Validators.required ],
      endDate:['', Validators.required ],
      startDateCntl:['',Validators.required ],
      endDateCntl:['',Validators.required ],
      
    });

    this.searchForm = this.fb.group({
      search: ['', Validators.required ]
    });
  }

  public addProject(projectName,priority,managerId){
    console.log('add Project Called');
    console.log(projectName);
    console.log(priority);
    console.log(managerId);
    
   
    console.log(this.startDate);
    const project = {projectName:projectName,priority:priority,manager:this.manager,startDate:this.startDateCntl.value,endDate:this.endDateCntl.value};
    
    console.log('Project details ' + project);
     this.projectService.addProject(project);
   }

   public sortByStartDate(){
    console.log(this.projects);

    this.projects.sort((a,b)=>{
      if (a.startDate > b.startDate) { 
        return 1;
      } else if (b.startDate > a.startDate) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.projects);
  }


  public sortByEndDate(){
    console.log(this.projects);
    //this.refreshUser(sortBy);

    this.projects.sort((a,b)=>{
      if (a.endDate > b.endDate) { 
        return 1;
      } else if (b.endDate > a.endDate) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.projects);
  }
  public sortByPriority(){
    console.log(this.projects);
    //this.refreshUser(sortBy);

    this.projects.sort((a,b)=>{
      if (a.priority > b.priority) { 
        return 1;
      } else if (b.priority > a.priority) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.projects);
  }
  public sortByCompleted(){
    console.log(this.projects);
    //this.refreshUser(sortBy);

    this.projects.sort((a,b)=>{
      if (a.completedTasks > b.completedTasks) { 
        return 1;
      } else if (b.completedTasks > a.completedTasks) { 
        return -1;
      } else {
        return 0; 
      }
    }); 
    console.log(this.projects);
  }

   public suspendProject(){
     // write a method to update project status as suspended.
    console.log('suspend Project Called');
   }
   public reset(){
    this.projectForm.reset();
    this.projectForm.patchValue({dateSelect:true});
    this.setDefaultDate();
    console.log('reset called');
  }
   public findAll(sortBy){
    console.log(sortBy);
  }


  public updateProject(project:Project){
   this.manager = project.manager;
   this.projectForm.patchValue({managerId:this.manager.firstName});
   this.projectForm.patchValue({projectId:project.projectId,projectName:project.projectName,startDate:project.startDate,endDate:project.endDate,priority:project.priority, managerId:this.manager.firstName});
   this.startDateCntl.setValue(project.startDate);
   this.endDateCntl.setValue(project.endDate);
    
    console.log(project);
  }
  public searchManager(content){
    console.log('Printing manager');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.maxWidth="100%";
    
    dialogConfig.data = {filterString:this.searchForm.getRawValue()};
    this.modalService.open(UserSearchComponent, dialogConfig);
    console.log(this.manager); 
  }

  public modelOk(){
    console.log('Model Ok button called');
  }
}
