import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatePipe, OrderByPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DatePipe,
    OrderByPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    DatePipe,
    OrderByPipe
  ]
})
export class SharedModule {}
