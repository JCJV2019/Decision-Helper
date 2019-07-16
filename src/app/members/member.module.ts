import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [MemberListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  exports: [MemberListComponent]
})
export class MemberModule { }
