import { Component, OnInit } from '@angular/core';
import { Course } from './list-courses.types';
import { ListCoursesService } from './list-courses.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'list-courses.component.html'
})

export class ListCoursesComponent implements OnInit{
    courses:Course[]=[];

    constructor(
        private courseService: ListCoursesService,
        private route :Router
    ) { }

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

    viewCourse(course:Course){
        console.log(course);
        this.route.navigate(['course',course.id]);
    }
}
