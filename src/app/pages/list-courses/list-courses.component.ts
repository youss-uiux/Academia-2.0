import { Component, OnInit } from '@angular/core';
import { Course } from './list-courses.types';
import { ListCoursesService } from './list-courses.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'list-courses.component.html'
})

export class ListCoursesComponent implements OnInit{
    courses:Course[]=[];

    constructor(private courseService: ListCoursesService) { }

    ngOnInit(){
        this.courseService.getCourses().subscribe({
            next: (data) => {
              this.courses = data;
            },
            error: (err) => {
              console.error('Error fetching courses', err);
            }
          });
    }
}
