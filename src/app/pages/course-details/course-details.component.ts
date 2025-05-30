import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetailsService } from './course-details.service';
import { Course } from '../list-courses/list-courses.types';

@Component({
  selector: 'app-course-detail',
  templateUrl: 'course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {

  course!: Course;

  constructor(private route: ActivatedRoute, private courseService: CourseDetailsService) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(courseId).subscribe({
      next: (data) => this.course = data,
      error: (err) => console.error(err)
    });
  }
}

