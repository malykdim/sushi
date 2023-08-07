import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { Data } from 'src/assets/gourmet-data-backup';

@NgModule({
	declarations: [
		LandingComponent
	],
	imports: [
    CommonModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: LandingComponent
			}
		])
	],
	exports: [
		LandingComponent
	],
  providers: [ Data ]
})
export class LandingModule { }
