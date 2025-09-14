import { Injectable } from '@angular/core';
import { Student } from '../student/student.module';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private key = 'app.students.v1';

  constructor() { }

  // get all list Student
  getStudents(): Student[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  // Save Student List
  saveStudents(list: Student[]): void {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  // EDIT Or ADD
  upsert(student: Student): void {
    const list = this.getStudents();
    const index = list.findIndex(s => s.id === student.id);
    if (index > -1) {
      list[index] = student; // Edit
    } else {
      student.id = list.length ? Math.max(...list.map(s => s.id)) + 1 : 1; //NEW ID
      list.push(student); // ADD
    }
    this.saveStudents(list);
  }
  
}
