import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LEVEL1, LEVEL2, Student } from '../../student/student.module';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  studentForm!: FormGroup;
  studentList: Student[] = [];
  level1Options = LEVEL1;
  level2Options: typeof LEVEL2 = [];

  @Input() dialogVisible: boolean = false;
  @Input() student: Student | null = null;
  @Output() save = new EventEmitter<Student>();
  @Output() dialogVisible_emitter = new EventEmitter<boolean>();
  
    constructor(private route: ActivatedRoute, private router: Router) { }
    
    
    ngOnInit(): void {
      this.createForm();
      
      // Load students
    const oldData = localStorage.getItem('StdData');
    if (oldData) this.studentList = JSON.parse(oldData);

    // Level1 changes ==> filter Level2
    this.studentForm.get('studyLevel1Id')?.valueChanges.subscribe(level1Id => {
      this.level2Options = LEVEL2.filter(l2 => l2.level1Id === +level1Id);
      this.studentForm.get('studyLevel2Id')?.setValue(null);
    });

    // Edit mode ==> ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const student = this.studentList.find(s => s.id === +id);
      if (student) {
        this.studentForm.patchValue(student);
        this.level2Options = LEVEL2.filter(l2 => l2.level1Id === student.studyLevel1Id);
      } else {
        // this.studentForm.reset();
        this.level2Options = [];
      }
      this.dialogVisible = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.studentForm) {
      if (this.student) {
        this.level2Options = LEVEL2.filter(l2 => l2.level1Id === this.student!.studyLevel1Id);
        this.studentForm.patchValue({
          ...this.student,
          dob: this.formatAsDateInput(this.student.dob)
        });
      } else {
        // this.studentForm.reset();
        this.level2Options = [];
      }
    }
  }
  //  Initializ
  private createForm() {
    this.studentForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      studyLevel1Id: new FormControl(null, Validators.required),
      studyLevel2Id: new FormControl(null, Validators.required)
    });
  }


  private formatAsDateInput(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d.toISOString().substring(0, 10);
  }


  send(status: boolean) {
    this.dialogVisible = status;
    this.dialogVisible_emitter.emit(status);
  }

  onSave() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      alert('Please fill all required fields correctly!');
      return;
    }

    const student: Student = {
      ...this.studentForm.value,
      id: this.studentForm.value.id ||
        (this.studentList.length ? Math.max(...this.studentList.map(s => s.id)) + 1 : 1)
    };

    const index = this.studentList.findIndex(s => s.id === student.id);
    if (index > -1) {
      // Edit
      this.studentList[index] = student;
    } else {
      // Add new
      this.studentList.unshift(student);
    }

    localStorage.setItem('StdData', JSON.stringify(this.studentList));
    alert('Student saved successfully!');
    this.send(false);
  }

}
