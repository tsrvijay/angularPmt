import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './project/project.component';

import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from './user-search/user-search.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

const appRoutes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'userSearch', component: UserSearchComponent }
];

@NgModule({
  
  declarations: [
    AppComponent,
    UserListComponent,
    TaskListComponent, 
    ProjectComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatMomentDateModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,         
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    NgbModule,
    Ng2SearchPipeModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
  ]
  ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


