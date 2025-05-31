import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetailsService } from './course-details.service';
import { Course } from '../list-courses/list-courses.types';

interface MediaItem {
  url: string;
  type: string;
  blobUrl: string | null;
  filename: string;
}

@Component({
  selector: 'app-course-detail',
  templateUrl: 'course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  mediaItems: MediaItem[] = [];

  constructor(
    private route: ActivatedRoute, 
    private courseService: CourseDetailsService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCourseById(courseId).subscribe({
      next: (data) => {
        this.course = data;
      },
      error: (err) => console.error(err)
    });
  }

  private initMediaItems(): void {
    // Réinitialise la liste des médias
    this.mediaItems = [];

    // Ajoute tous les médias disponibles
    if (this.course.imageUrl) {
      this.addMediaItem(this.course.imageUrl, 'image');
    }
    if (this.course.videoUrl) {
      this.addMediaItem(this.course.videoUrl, 'video');
    }
    if (this.course.audioUrl) {
      this.addMediaItem(this.course.audioUrl, 'audio');
    }
    if (this.course.pdfUrl) {
      this.addMediaItem(this.course.pdfUrl, 'pdf');
    }

    // Vous pourriez aussi gérer plusieurs médias du même type ici
    // Par exemple si course.imagesUrls est un tableau
  }

  private addMediaItem(url: string, type: string): void {
    const mediaInfo = this.extractMediaInfo(type,url);
    if (mediaInfo) {
      this.mediaItems.push({
        url,
        type: mediaInfo.type,
        blobUrl: null,
        filename: mediaInfo.filename
      });
    }
  }

  private loadAllMedia(): void {
    this.mediaItems.forEach(item => {
      this.loadMedia(item);
    });
  }

  private loadMedia(item: MediaItem): void {
    this.courseService.getMedia(item.type, item.filename).subscribe({
      next: (blob) => {
        // Créez l'URL Blob de manière sécurisée
        const reader = new FileReader();
        reader.onload = (event) => {
          item.blobUrl = event.target?.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error: (err) => console.error(`Erreur lors du chargement du ${item.type}:`, err)
    });
  }

  extractMediaInfo(type:string ,url: string): { type: string, filename: string } | null {
    const regex = /\/(media|Uploads)\/(video|audio|pdf|Images)\/([^\/]+)$/;
    const match = url.match(regex);
  
    if (match) {
      return {
        type: type,
        filename: match[2]
      };
    }
    return null;
  }

  getMediaByType(type: string): MediaItem[] {
    return this.mediaItems.filter(item => item.type === type);
  }
}