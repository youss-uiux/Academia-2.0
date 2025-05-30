import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  private apiUrl = 'https://localhost:7080/api/Courses';

  constructor(private http: HttpClient) { }

  createCourse(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
