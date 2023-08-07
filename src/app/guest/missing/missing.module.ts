import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MissingComponent } from './missing/missing.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MissingComponent },
    ]
  },
];


@NgModule({
  declarations: [
    MissingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MissingComponent
  ]
})
export class MissingModule { }
