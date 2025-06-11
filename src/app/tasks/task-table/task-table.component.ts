import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnChanges {
  @Input() tasks: any[] = [];
  @Input() enableActions: boolean = false;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  pageSize = 10;
  pageIndex = 0;
  paginatedTasks: any[] = [];

  ngOnChanges(): void {
    this.setPaginatedTasks();
  }

  setPaginatedTasks() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.tasks.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPaginatedTasks();
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
