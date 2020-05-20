import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [

  ],
  entryComponents: [

  ],
  exports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
