import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  showModal = false;
  editForm!: FormGroup;
  editingTaskId!: number;
  submittedEdit = false;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['',Validators.required],
      status: ['', Validators.required],
      duedate: ['', Validators.required],
      priority: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

 editTask(id: number) {
  this.submittedEdit = false; // reset flag
  this.editingTaskId = id;
  this.taskService.getTaskById(id).subscribe(task => {
    this.editForm.patchValue(task);
    this.showModal = true;
  });
}
  updateTask() {
    this.submittedEdit = true;

    if (this.editForm.invalid) {
      return;
    }

    this.taskService.updateTask(this.editingTaskId, this.editForm.value).subscribe(() => {
      this.showModal = false;
      this.loadTasks();
      this.submittedEdit = false; // Reset for next time
    });
  }


  delete(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks(); // Refresh list after deletion
        },
        error: err => {
          console.error('Failed to delete task:', err);
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.submittedEdit = false;
  }

}
