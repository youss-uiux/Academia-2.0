import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../list-courses/list-courses.types';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {

  private apiUrl = '/api/Courses/byId';

  constructor(private http: HttpClient) { }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getMedia(fileType: string, fileName: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', fileType);
    return this.http.get(`/api/Courses/Media/${fileType}/${fileName}`, { headers, responseType: 'blob' });
  }
}
