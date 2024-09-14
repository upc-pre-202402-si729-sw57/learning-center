import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Course} from "../../model/course.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-course-create-and-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    NgIf
  ],
  templateUrl: './course-create-and-edit.component.html',
  styleUrl: './course-create-and-edit.component.css'
})
export class CourseCreateAndEditComponent {
  // Attributes
  @Input() course!: Course;
  @Input() editMode: boolean = false;
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() courseUpdated = new EventEmitter<Course>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('courseForm', { static: false }) courseForm!: NgForm;

  // Methods
  constructor() {
    this.course = new Course({});
  }

  // Private methods
  private resetEditState() {
    this.course = new Course({});
    this.editMode = false;
    this.courseForm.resetForm();
  }

  // Event Handlers
  onSubmit() {
    if (this.courseForm.form.valid) {
      let emitter = this.editMode ? this.courseUpdated : this.courseAdded;
      emitter.emit(this.course);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }



}
