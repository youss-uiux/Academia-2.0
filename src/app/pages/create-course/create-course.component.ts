import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateCourseService } from './create-course.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
    selector: 'create-course-cmp',
    moduleId: module.id,
    templateUrl: 'create-course.component.html'
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

    constructor(private fb: FormBuilder,private createCourseService: CreateCourseService) { }

  

    onFileChange(event: any, controlName: string): void {
        const file = event.target.files[0];
        if (file) {
        this.files[controlName] = file;
        this.courseForm.patchValue({ [controlName]: file });
        }
    }

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
