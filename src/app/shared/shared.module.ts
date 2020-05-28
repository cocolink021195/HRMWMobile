import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';


import { HrmComboboxDialogComponent } from './controls/hrm-combobox-dialog/hrm-combobox-dialog.component';
import { GhostListComponent } from './controls/ghost-list/ghost-list.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,


  ],
  declarations: [
    HrmComboboxDialogComponent,
    GhostListComponent,



    
  ],
  entryComponents: [
    HrmComboboxDialogComponent,
    GhostListComponent,



  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatRadioModule,


    HrmComboboxDialogComponent,
    GhostListComponent,



    
  ],
  providers: [{ provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } }],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
