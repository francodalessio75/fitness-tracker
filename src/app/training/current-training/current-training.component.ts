import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer:number;

  constructor( private dialog: MatDialog, private trainingService:TrainingService ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    /** step calculation by dividing the exercise duration by 100 that are total steps training duration.
     * In this way the single step duration is proportional to the exercise duration
     */
    const step = this.trainingService.getRunningexercise()?.duration / 100 * 1000;
    this.timer = setInterval(()=>{
      this.progress += 2;
        if(this.progress >= 100){
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }
      ,step
    );
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data:{
        progress:this.progress
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if( result ){
        this.trainingService.cancelExercise(this.progress);
      }else{
        this.startOrResumeTimer();
      }
    });
  }


}
