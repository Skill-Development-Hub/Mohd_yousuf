import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from '../../students.service';
import { DataSource } from '@angular/cdk/collections';

export interface UserData {
  number: number;
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'name', 'age', 'email'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private StudentsService: StudentsService,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<UserData>();
  }

  ngOnInit() {
    this.getTrainers(); // Fetch students when the component initializes
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTrainers = () => {
    this.StudentsService.getTrainers().subscribe(trainers => {
      console.log(trainers);
      this.dataSource.data = trainers; 
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


