import { Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService{
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise: Exercise;

  public exerciseChanged = new Subject<Exercise>()

  private exercises : Exercise[] = [];

  startExercise( selectedId:string){
    const selectedExercise = this.availableExercises.find( exercise => exercise.id === selectedId );
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.exercises.push({...this.runningExercise, date:new Date(), state:"completed"});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress:number){
    this.exercises.push({
      ...this.runningExercise,
      date:new Date(),
      state:"cancelled",
      duration: this.runningExercise.duration * ( progress  / 100 ),
      calories: this.runningExercise.calories * ( progress  / 100 ) });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getAvailableExericses(){
    return this.availableExercises.slice();
  }

  getRunningexercise():Exercise{
    return {...this.runningExercise};
  }

  getCompletedOrCancelledExercises(){
    return this.exercises.slice();
  }
}
