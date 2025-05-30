import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateCourseComponent } from './create-course.component';

@NgModule({
  declarations: [
    CreateCourseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateCourseComponent
  ]
})
export class CreateCourseModule { }
