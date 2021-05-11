import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date','name','calories','duration','state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private finishedExercisesSubscription:Subscription;



  constructor( private trainingService : TrainingService ) { }

  ngOnInit(): void {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe( ( exercises : Exercise[] ) =>
      this.dataSource.data = exercises );

    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    if(this.finishedExercisesSubscription){
      this.finishedExercisesSubscription.unsubscribe();
    }
  }

}
