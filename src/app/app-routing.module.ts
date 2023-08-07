import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('../app/guest/landing/landing.module').then(m => m.LandingModule)},
  { path: 'user', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)},
  { path: 'menu', loadChildren: () => import('../app/menu/menu.module').then(m => m.MenuModule)},
  { path: '**', loadChildren: () => import('../app/guest/missing/missing.module').then(m => m.MissingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
