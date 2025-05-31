import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCourseService } from './create-course.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'create-course-cmp',
    moduleId: module.id,
    templateUrl: 'create-course.component.html',
    styleUrls: ['create-course.component.css']
})

export class CreateCourseComponent implements OnInit{
    ngOnInit(){
        this.courseForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            tag1: [''],
            tag2: [''],
            auteur: ['', Validators.required],
            date: ['', Validators.required],
            imageFile: [null],
            videoFile: [null],
            audioFile: [null],
            pdfFile: [null]
        });
    }
    courseForm: FormGroup;
    files: { [key: string]: File } = {};
    imagePreviewUrl: SafeUrl | null = null;
    videoPreviewUrl: SafeUrl | null = null;
    audioPreviewUrl: SafeUrl | null = null;
    pdfPreviewUrl: SafeUrl | null = null;

    constructor(
        private fb: FormBuilder,
        private createCourseService: CreateCourseService,
        private sanitizer: DomSanitizer
    ) { }

  

    onSubmit(): void {
        if (this.courseForm.valid) {
          const formData = new FormData();
      
          Object.keys(this.courseForm.controls).forEach(key => {
            let value = this.courseForm.get(key)?.value;
      
            
            if (key === 'date' && value) {
              const dateObj = new Date(value);
              value = dateObj.toISOString(); 
            }
      
            if (this.files[key]) {
              formData.append(key, this.files[key]);
            } else {
              formData.append(key, value);
            }
          });
      
          this.createCourseService.createCourse(formData)
            .subscribe({
              next: (response) => {
                console.log('Course created successfully', response);
                this.showCustomHtml(response);
                this.courseForm.reset();
              },
              error: (err) => {
                console.error('Error creating course', err);
              }
            });
      
        } else {
          console.log('Form not valid');
        }
      }

      onFileChange(event: any, controlName: string): void {
        const file = event.target.files[0];
        if (file) {
          this.files[controlName] = file;
          this.courseForm.patchValue({ [controlName]: file });
      
          const objectUrl = URL.createObjectURL(file);
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      
          switch (controlName) {
            case 'imageFile':
              this.imagePreviewUrl = safeUrl;
              break;
            case 'videoFile':
              this.videoPreviewUrl = safeUrl;
              break;
            case 'audioFile':
              this.audioPreviewUrl = safeUrl;
              break;
            case 'pdfFile':
              this.pdfPreviewUrl = safeUrl;
              break;
          }
        }
      }

      clearPreview(type: string): void {
        switch (type) {
          case 'image':
            this.imagePreviewUrl = null;
            this.courseForm.get('imageFile')?.setValue(null);
            delete this.files['imageFile'];
            break;
          case 'video':
            this.videoPreviewUrl = null;
            this.courseForm.get('videoFile')?.setValue(null);
            delete this.files['videoFile'];
            break;
          case 'audio':
            this.audioPreviewUrl = null;
            this.courseForm.get('audioFile')?.setValue(null);
            delete this.files['audioFile'];
            break;
          case 'pdf':
            this.pdfPreviewUrl = null;
            this.courseForm.get('pdfFile')?.setValue(null);
            delete this.files['pdfFile'];
            break;
        }
      
        // Libérer les URLs Blob pour éviter les fuites mémoire
        if (this.imagePreviewUrl) {
          URL.revokeObjectURL(this.imagePreviewUrl as string);
        }
        if (this.videoPreviewUrl) {
          URL.revokeObjectURL(this.videoPreviewUrl as string);
        }
        if (this.audioPreviewUrl) {
          URL.revokeObjectURL(this.audioPreviewUrl as string);
        }
        if (this.pdfPreviewUrl) {
          URL.revokeObjectURL(this.pdfPreviewUrl as string);
        }
      }
      
      
      showCustomHtml(response:any) {
        Swal.fire({
          title: '<strong>Votre cours a été crée avec succès</strong>',
          icon: 'info',
          html:
            `<b>Le nom du cours : ${response.title}</b>` ,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down',
        });
      }
      
}
