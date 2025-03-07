import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../kanban-board/kanban-board.component';

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() onTaskClick = new EventEmitter<Task>();
}
