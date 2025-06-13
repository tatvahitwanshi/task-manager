import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskTableComponent } from '../task-table/task-table.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    TaskTableComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  searchTerm: string = '';

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
      description: ['', Validators.required],
      status: ['', Validators.required],
      duedate: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.filteredTasks = res;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  onSearch() {
    const lowerSearch = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(lowerSearch)
    );
  }

  editTask(id: number) {
    this.submittedEdit = false;
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
      this.submittedEdit = false;
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
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
