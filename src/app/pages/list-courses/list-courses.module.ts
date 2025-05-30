import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListCoursesComponent } from './list-courses.component';

@NgModule({
  declarations: [
    ListCoursesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ListCoursesComponent
  ]
})
export class ListCoursesModule { }
