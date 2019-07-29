import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent} from '../user-search/user-search.component';
import {MatDialogRef} from '@angular/material/dialog';
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
  public manager:User;

  constructor(private fb: FormBuilder,private modalService: MatDialog,private userService:UserService,private projectService:ProjectService) {
    this.createForm();
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
    const project = {projectName:projectName,priority:priority,manager:this.manager,startDate:this.startDate,endDate:this.startDate};
    
    console.log('Project details ' + project);
     this.projectService.addProject(project);
    // this.refreshUser('firstName');
   }

   public suspendProject(){
    console.log('suspend Project Called');
   }
   public updateProject(){
    console.log('update Project Called');
   }
   public reset(){
    this.projectForm.reset();
    this.projectForm.patchValue({dateSelect:true});
    this.setDefaultDate();
    console.log('reset called');
  }
   public findAll(sortBy){
    console.log(sortBy);
   // this.refreshUser(sortBy);
  }

  public searchManager(content){
    console.log('Printing manager');
    //this.modalService.
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.maxWidth="100%";
    
    dialogConfig.data = {filterString:this.searchForm.getRawValue()};
    //dialogConfig.scrollStrategy
    this.modalService.open(UserSearchComponent, dialogConfig);
    console.log(this.manager); 
  }

  public modelOk(){
    console.log('Model Ok button called');
  }


}
