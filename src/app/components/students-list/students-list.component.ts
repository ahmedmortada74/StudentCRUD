import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../student/student.module';
import { CommonModule } from '@angular/common';
import { LEVEL1, LEVEL2 } from '../../student/student.module';
import { Router, RouterLink } from "@angular/router";
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { StudentFormComponent } from '../student-form/student-form.component';



@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterLink, StudentFormComponent, ButtonModule, TableModule, ButtonModule, CommonModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']

})

export class StudentsListComponent implements OnInit {
  constructor (private router: Router){}
  @ViewChild('dt2') dt2: any;
  localStorageService: any;
  @Input() visible = false;
  selectedStudents: Student[] = [];
  studentDialog: boolean = false;
  student: any = {};
  submitted: boolean = false;
  studentList: Student[] = [];
  
  ngOnInit(): void {
    const data = localStorage.getItem('StdData');
    if (data) this.studentList = JSON.parse(data);
  }
  //Filter Name Or Phone
  applyFilter(event: Event, dt: Table) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

 
  openNew() {
    this.student = {};
    this.submitted = false;
    this.studentDialog = true;
    
  }
     onSave(student: Student) {
    let x = this.localStorageService.upsert(student);
    // this.studentList = this.localStorageService.getStudents();
     this.studentList = [...this.localStorageService.getStudents()];
    this.studentDialog = false;
  }
  // Edit
  editStudent(student: Student) {
    this.student = { ...student };
    this.studentDialog = true;
  }

  // Delete 
  deleteSelectedStudents() {
    if (confirm('Are you sure you want to delete selected students?')) {
      this.studentList = this.studentList.filter(s => !this.selectedStudents.includes(s));
      this.selectedStudents = [];
      localStorage.setItem('StdData', JSON.stringify(this.studentList));
    }
  }

  // Delete 
  deleteStudent(student: Student) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentList = this.studentList.filter(s => s.id !== student.id);
      localStorage.setItem('StdData', JSON.stringify(this.studentList));
    }
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

  getLevel1Name(id: any) {
    return LEVEL1.find(l => l.id === +id)?.name || '';
  }

  getLevel2Name(id: any) {
    return LEVEL2.find(l => l.id === +id)?.name || '';
  }

}
