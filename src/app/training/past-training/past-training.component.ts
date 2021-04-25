import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date','name','calories','duration','state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor( private trainingService : TrainingService ) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
