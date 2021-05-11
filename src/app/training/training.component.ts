import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining = false;
  exerciseStartedSubscription:Subscription;

  constructor( private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.exerciseStartedSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        this.onGoingTraining =  exercise === null ? false : true;
      }
    );
  }

  ngOnDestroy():void{
    if(this.exerciseStartedSubscription){
      this.exerciseStartedSubscription.unsubscribe();
    }
  }

}
