import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../kanban-board/kanban-board.component';

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent {
  task: Task;
  selectedTrainerId: string;
  trainers = [
    { id: 't1', name: 'John Smith', initials: 'JS' },
    { id: 't2', name: 'Emily Johnson', initials: 'EJ' },
    { id: 't3', name: 'Michael Brown', initials: 'MB' },
    { id: 't4', name: 'Sarah Wilson', initials: 'SW' },
    { id: 't5', name: 'David Lee', initials: 'DL' }
  ];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {
    this.task = data.task 
      ? { ...data.task } 
      : {
          id: '',
          title: '',
          description: '',
          trainer: { id: '', name: '', initials: '' },
          priority: 'medium',
          status: 'todo'
        };
    
    this.selectedTrainerId = this.task.trainer.id;
  }

  onSave() {
    if (this.isValid()) {
      // Update trainer information based on selection
      const selectedTrainer = this.trainers.find(t => t.id === this.selectedTrainerId);
      if (selectedTrainer) {
        this.task.trainer = selectedTrainer;
      }
      
      this.dialogRef.close({ action: 'save', task: this.task });
    }
  }

  onCancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  onDelete() {
    this.dialogRef.close({ action: 'delete', taskId: this.task.id });
  }

  isValid(): boolean {
    return !!(
      this.task.title && 
      this.selectedTrainerId && 
      this.task.priority && 
      this.task.status
    );
  }
}
