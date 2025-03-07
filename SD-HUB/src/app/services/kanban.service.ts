import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../staff/kanban-board/kanban-board.component';
import { Column } from '../staff/task-dialog/task-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {
  private initialColumns: Column[] = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Prepare Java Course',
          description: 'Create materials for the Java programming course',
          trainer: {
            id: 't1',
            name: 'John Smith',
            initials: 'JS'
          },
          dueDate: new Date('2025-07-15'),
          priority: 'high',
          status: 'todo'
        },
        {
          id: '2',
          title: 'Update Python Slides',
          description: 'Update the slides for the Python course with new examples',
          trainer: {
            id: 't2',
            name: 'Emily Johnson',
            initials: 'EJ'
          },
          dueDate: new Date('2025-07-20'),
          priority: 'medium',
          status: 'todo'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Record React Tutorial',
          description: 'Record video tutorials for the React.js course',
          trainer: {
            id: 't3',
            name: 'Michael Brown',
            initials: 'MB'
          },
          dueDate: new Date('2025-07-10'),
          priority: 'high',
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: '4',
          title: 'Review Angular Workshop',
          description: 'Review materials for the upcoming Angular workshop',
          trainer: {
            id: 't1',
            name: 'John Smith',
            initials: 'JS'
          },
          dueDate: new Date('2025-07-05'),
          priority: 'medium',
          status: 'review'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'Database Course Outline',
          description: 'Create outline for the SQL and NoSQL database course',
          trainer: {
            id: 't4',
            name: 'Sarah Wilson',
            initials: 'SW'
          },
          dueDate: new Date('2025-06-30'),
          priority: 'low',
          status: 'done'
        }
      ]
    }
  ];

  private columnsSubject = new BehaviorSubject<Column[]>(this.initialColumns);
  columns$ = this.columnsSubject.asObservable();

  constructor() {}

  getColumns() {
    return this.columns$;
  }

  updateTask(taskId: string, updates: Partial<Task>) {
    const columns = this.columnsSubject.value;
    const updatedColumns = columns.map(column => {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const updatedTasks = [...column.tasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...updates };
        return { ...column, tasks: updatedTasks };
      }
      return column;
    });
    this.columnsSubject.next(updatedColumns);
  }

  moveTask(taskId: string, targetColumnId: string) {
    const columns = this.columnsSubject.value;
    let taskToMove: Task | undefined;
    let sourceColumnId: string | undefined;

    // Find the task and its source column
    columns.forEach(column => {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        taskToMove = { ...column.tasks[taskIndex], status: targetColumnId as any };
        sourceColumnId = column.id;
      }
    });

    if (!taskToMove || !sourceColumnId) return;

    // Remove task from source column and add to target column
    const updatedColumns = columns.map(column => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, taskToMove!]
        };
      }
      return column;
    });

    this.columnsSubject.next(updatedColumns);
  }

  addTask(task: Omit<Task, 'id'>) {
    const columns = this.columnsSubject.value;
    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };

    const updatedColumns = columns.map(column => {
      if (column.id === task.status) {
        return {
          ...column,
          tasks: [...column.tasks, newTask]
        };
      }
      return column;
    });

    this.columnsSubject.next(updatedColumns);
    return newTask;
  }

  deleteTask(taskId: string) {
    const columns = this.columnsSubject.value;
    const updatedColumns = columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    }));
    this.columnsSubject.next(updatedColumns);
  }

  reorderTasks(columnId: string, tasks: Task[]) {
    const columns = this.columnsSubject.value;
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, tasks };
      }
      return column;
    });
    this.columnsSubject.next(updatedColumns);
  }
}
