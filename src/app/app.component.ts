import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Student} from './student/student.module';
import { StudentFormComponent } from './components/student-form/student-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent ,StudentFormComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  studentForm:FormGroup =new FormGroup({}) ;


  studentObj: Student = {
    id: 0,
    name: '',
    phone: '',
    dob: '',
    studyLevel1Id: 0,
    studyLevel2Id: 0
  };
  constructor(){
      this.createForm()
  }

  createForm(){
    this.studentForm = new FormGroup({
        id: new FormControl(this.studentObj.id),
      name: new FormControl(this.studentObj.name),
      phone: new FormControl(this.studentObj.phone),
      dob: new FormControl(this.studentObj.dob),
      gender: new FormControl(''),
      level: new FormControl(this.studentObj.studyLevel1Id)
    })
  }

}
