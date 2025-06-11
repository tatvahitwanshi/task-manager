import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskTableComponent } from '../tasks/task-table/task-table.component'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TaskTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
      }
    });
  }
}
