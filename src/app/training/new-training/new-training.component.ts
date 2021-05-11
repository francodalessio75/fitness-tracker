
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises:Exercise[];
  private exerciseSubs : Subscription;
  private isLoadingSubs : Subscription;
  isLoading:boolean = true;

  constructor(
    private trainingService:TrainingService,
    private uIService : UIService ) { }

  ngOnInit(): void {
    //subscribes available exercises observable to synchronize exercises with the db
    this.exerciseSubs = this.trainingService.exercisesChanged.subscribe( exs => {
      this.exercises = exs;
    });
    //triggers the observable service by calling the fetch method
    this.trainingService.fetchAvailableExercises();
    this.isLoadingSubs = this.uIService.loadingStateChanged.subscribe( isLoading => this.isLoading = isLoading );
  }

  fetchAgainExercises(){
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining( form:NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(){
    if( this.isLoadingSubs ){
      this.exerciseSubs.unsubscribe();
    }
    if( this.exerciseSubs ){
      this.exerciseSubs.unsubscribe();
    }
  }

}
