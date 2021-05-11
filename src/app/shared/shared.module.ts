import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports : [
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ],
  exports:[
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule{

}
