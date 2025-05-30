import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    constructor(private fb: FormBuilder) { }

  

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
            if (this.files[key]) {
            formData.append(key, this.files[key]);
            } else {
            formData.append(key, this.courseForm.get(key)?.value);
            }
        });

        // Tu peux ensuite envoyer formData à ton backend
        console.log('Form data ready to be submitted', formData);
        } else {
        console.log('Form not valid');
        }
    }
}
