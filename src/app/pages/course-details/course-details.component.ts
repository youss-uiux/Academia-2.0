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

  imageBlobUrl: string | null = null;
  videoBlobUrl: string | null = null;
  audioBlobUrl: string | null = null;
  pdfBlobUrl: string | null = null;

  constructor(private route: ActivatedRoute, private courseService: CourseDetailsService) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(courseId).subscribe({
      next: (data) =>{
        this.course = data;
       // Ensuite, pour chaque média, on traite séparément
       this.loadMedia(this.course.imageUrl, 'image');
       this.loadMedia(this.course.videoUrl, 'video');
       this.loadMedia(this.course.audioUrl, 'audio');
       this.loadMedia(this.course.pdfUrl, 'pdf');
      } ,
      error: (err) => console.error(err)
    });
  }


  extractMediaInfo(url: string): { type: string, filename: string } | null {
    const regex = /\/media\/(video|audio|pdf|image)\/([^\/]+)$/;
    const match = url.match(regex);
  
    if (match) {
      const type = match[1];
      const filename = match[2];
      return { type, filename };
    }
  
    return null;
  }

  loadMedia(url: string, expectedType: string): void {
    if (!url) return;

    const mediaInfo = this.extractMediaInfo(url);
    if (mediaInfo && mediaInfo.type === expectedType) {
      this.courseService.getMedia(mediaInfo.type, mediaInfo.filename).subscribe({
        next: (blob) => {
          const objectUrl = URL.createObjectURL(blob);
          switch (expectedType) {
            case 'image': this.imageBlobUrl = objectUrl; break;
            case 'video': this.videoBlobUrl = objectUrl; break;
            case 'audio': this.audioBlobUrl = objectUrl; break;
            case 'pdf': this.pdfBlobUrl = objectUrl; break;
          }
        },
        error: (err) => console.error(`Erreur lors du chargement du ${expectedType}:`, err)
      });
    }
  }
}

