import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './list-courses.types';

@Injectable({
  providedIn: 'root'
})
export class ListCoursesService {

  private apiUrl = '/api/Courses/popular';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }
}
