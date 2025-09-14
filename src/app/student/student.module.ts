import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StudentModule { 
  
}
export interface Student {
  id: number;
  name: string;
  phone: string;
  dob: string;
  studyLevel1Id: number;
  studyLevel2Id: number;
  
}

export interface Level1 {
  id: number;
  name: string;
}

export interface Level2 {
  id: number;
  name: string;
  level1Id: number;
}
//static Datang generate service services/local-storage

export const LEVEL1: Level1[] = [
  { id: 1, name: 'AinShams' },
  { id: 2, name: 'Cairo' }
];

export const LEVEL2: Level2[] = [
  { id: 1, name: 'IT', level1Id: 1 },
  { id: 2, name: 'Fashion', level1Id: 1 },
  { id: 3, name: 'Commerce', level1Id: 2 },
  { id: 4, name: 'Economic', level1Id: 2 }
];

