import { NgModule } from "@angular/core";
import { TrainingComponent } from '../training/training.component';
import { CurrentTrainingComponent } from '../training/current-training/current-training.component';
import { NewTrainingComponent } from '../training/new-training/new-training.component';
import { PastTrainingComponent } from '../training/past-training/past-training.component';
import { StopTrainingComponent } from '../training/current-training/stop-training.component';
import { SharedModule } from "../shared/shared.module";
import { TrainingRouterModule } from "./training.routing.module";
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from '../material.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent

  ],
  imports:[
    SharedModule,
    TrainingRouterModule,
    MatDialogModule
 ],
 entryComponents:[StopTrainingComponent],
  exports:[]
})
export class TrainingModule{

}
