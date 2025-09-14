import { Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
{path: 'student', component:StudentsListComponent},
{path:'', redirectTo:'student', pathMatch:'full'},
{path: 'form', component:StudentFormComponent},
  { path: 'form/:id', component: StudentFormComponent }  
];
