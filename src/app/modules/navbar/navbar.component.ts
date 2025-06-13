import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getUserRole().subscribe({
      next: res => {
        this.userRole = res.role;
      },
      error: () => {
        this.userRole = '';
      }
    });
  }
}
