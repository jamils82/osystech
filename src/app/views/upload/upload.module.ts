import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './upload.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
  ],
  declarations: [ UploadComponent ]
})
export class UploadModule { }
