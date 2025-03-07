import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { KanbanService } from '../../services/kanban.service';


export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  trainer: {
    id: string;
    name: string;
    initials: string;
  };
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'done';
}



@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {
  columns: Column[] = [];

  constructor(
    private kanbanService: KanbanService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.kanbanService.getColumns().subscribe((columns: Column[]) => {
      this.columns = columns;
    });
  }

  getConnectedLists(): string[] {
    return this.columns.map(column => column.id + '-list');
  }

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Reordering within the same column
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const columnId = event.container.id.replace('-list', '');
      this.kanbanService.reorderTasks(columnId, event.container.data);
    } else {
      // Moving to a different column
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      // Update the task status based on the new column
      const task = event.container.data[event.currentIndex];
      const newStatus = event.container.id.replace('-list', '') as any;
      
      this.kanbanService.updateTask(task.id, { status: newStatus });
    }
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        this.kanbanService.addTask(result.task);
      }
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'save') {
          this.kanbanService.updateTask(result.task.id, result.task);
        } else if (result.action === 'delete') {
          this.kanbanService.deleteTask(result.taskId);
        }
      }
    });
  }
}