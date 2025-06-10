import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import {NavbarComponent} from '../../navbar/navbar.component'; // Import NavbarComponent if needed

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent]
})
export class TaskCreateComponent {
  taskForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pending', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.taskForm.invalid) {
      return; // Just show validation errors now
    }

    this.taskService.createTask(this.taskForm.value).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}

