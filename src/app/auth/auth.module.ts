import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
      path: '',
      children: [
        // will check if it is signup or signin mode and load the associated form
        { path: '', component: AuthComponent },
        { path: 'signup', component: AuthComponent },
        { path: 'login', component: AuthComponent },
        { path: 'logout', component: LogoutComponent } // logout & navigate to landing page
      ]
    },
];


@NgModule({
    declarations: [
        AuthComponent,
        LogoutComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class AuthModule { }
