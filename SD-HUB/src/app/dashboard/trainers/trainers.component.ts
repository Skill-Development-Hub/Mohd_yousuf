import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../../students.service';
import { TrainerDialogComponent } from './trainer-dialog/trainer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserData {
  id?: number;
  contactNumber: number;
  name: string;
  currentBatch: string;
  email: string;
  course: string;
}

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'course', 'contactNumber', 'email', 'currentBatch', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<UserData>();
  }

  ngOnInit() {
    this.getTrainers(); // Fetch trainers when the component initializes
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTrainers() {
    this.studentsService.getTrainers().subscribe(trainers => {
      console.log('Fetched trainers:', trainers);
      this.dataSource.data = trainers;
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(TrainerDialogComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.addTrainer(result).subscribe({
          next: (response) => {
            this.snackBar.open('Trainer added successfully!', 'Close', { duration: 3000 });
            this.getTrainers(); // Refresh the list
          },
          error: (error) => {
            console.error('Error adding trainer:', error);
            this.snackBar.open('Failed to add trainer', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditDialog(trainer: UserData) {
    const dialogRef = this.dialog.open(TrainerDialogComponent, {
      width: '400px',
      data: { mode: 'edit', trainer: trainer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.updateTrainer(result).subscribe({
          next: (response) => {
            this.snackBar.open('Trainer updated successfully!', 'Close', { duration: 3000 });
            this.getTrainers(); // Refresh the list
          },
          error: (error) => {
            console.error('Error updating trainer:', error);
            this.snackBar.open('Failed to update trainer', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteTrainer(trainer: UserData) {
    if (confirm(`Are you sure you want to delete ${trainer.name}?`)) {
      this.studentsService.deleteTrainer(trainer.id!).subscribe({
        next: (response) => {
          this.snackBar.open('Trainer deleted successfully!', 'Close', { duration: 3000 });
          this.getTrainers(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting trainer:', error);
          this.snackBar.open('Failed to delete trainer', 'Close', { duration: 3000 });
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


