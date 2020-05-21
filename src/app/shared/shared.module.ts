import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,

  ],
  declarations: [

  ],
  entryComponents: [

  ],
  exports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,

  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
