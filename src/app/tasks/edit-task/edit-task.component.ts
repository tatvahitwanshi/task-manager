import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { NavbarComponent } from '../../navbar/navbar.component';
@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [''],
      dueDate: [''], // Match backend naming (camelCase)
      priority: ['']
    });

    this.taskService.getTaskById(this.taskId).subscribe(task => {
      this.taskForm.patchValue(task);
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
