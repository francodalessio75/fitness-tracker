import { Injectable, Output } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { Exercise } from "./exercise.model";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


@Injectable()
export class TrainingService{
  private fbSub : Subscription[] = [];

  //observable to assign to database result
  exercisesAsObservable:Observable<Exercise[]>;

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  //observable triggered when a single exercise changes, used to notify to training component
  //if the training activity is in progress or not
  public exerciseChanged = new Subject<Exercise>();
  //observable triggered when exercises collection changes
  public exercisesChanged = new Subject<Exercise[]>();
  //observable to synchronize with finished exercises on the DB
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private readonly db:AngularFirestore,
    private uIService : UIService ){}

  startExercise( selectedId:string){
    const selectedExercise = this.availableExercises.find( exercise => exercise.id === selectedId );
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.addDataToDatabase({...this.runningExercise, date:new Date(), state:"completed"});
      this.runningExercise = null;
      this.exerciseChanged.next(null);
  }

  cancelExercise(progress:number){
    this.addDataToDatabase({
      ...this.runningExercise,
      date:new Date(),
      state:"cancelled",
      duration: this.runningExercise.duration * ( progress  / 100 ),
      calories: this.runningExercise.calories * ( progress  / 100 ) });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchAvailableExercises(){
    this.uIService.loadingStateChanged.next(true);
    this.fbSub.push(
      this.db.collection('availableExercises').valueChanges({idField:'id'})
      .subscribe( (exercises : Exercise[]) => {
        //assigns exercises to the local array
        this.availableExercises = exercises;
        //notifies to listeners that array has changed
        this.exercisesChanged.next([...this.availableExercises]);
        this.uIService.loadingStateChanged.next(false);
        }
      , error => {
        this.uIService.loadingStateChanged.next(false);
        this.uIService.showSnackbar('Fetching exercises failed! Please try again later' + error.message, null, 3000);
        //to avoid to show a select without content calls the observable with null so the select will be emty but correc
        this.exercisesChanged.next(null);
      })
    );
  }

  getRunningexercise():Exercise{
    return {...this.runningExercise};
  }

  addDataToDatabase(exercise : Exercise ){
    this.db.collection('finishedExercises').add(exercise);
  }

  fetchCompletedOrCancelledExercises(){
    this.fbSub.push(
      this.db.collection('finishedExercises').valueChanges()
        .subscribe( ( finishedExercises : Exercise[] ) => {
          this.finishedExercisesChanged.next( finishedExercises );
      }, error => {
        this.uIService.showSnackbar('Fetching completed / finished exercises failed! Please try again later' + error.message, null, 3000);
      })
    );
  }

  /**
   * called by auth.service on logout
   */
  cancelSubscription(){
    this.fbSub.forEach( sub => {
      sub.unsubscribe();
    });
  }
}
