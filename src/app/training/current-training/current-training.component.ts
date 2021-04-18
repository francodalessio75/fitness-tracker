import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer:number;

  @Output() trainingExit = new EventEmitter();

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    this.timer = setInterval(()=>{
      this.progress += 2;
        if(this.progress >= 100){
          clearInterval(this.timer);
        }
      }
      ,500
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
        this.trainingExit.emit();
      }else{
        this.startOrResumeTimer();
      }
    });
  }


}
