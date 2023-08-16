import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { SharedModule } from "../shared/shared.module";
import { ItemDetailsResolverService } from './item-details/item-details-resolver.service';
import { AuthGuard } from '../services/auth/auth.guard';
import { ChefGuard } from '../services/auth/chef.guard';
import { Data } from 'src/assets/gourmet-data-backup';

import { MenuComponent } from './menu/menu.component';
import { MenuItemsListComponent } from './menu-items-list/menu-items-list.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemCreateComponent } from './item-create/item-create/item-create.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemRemoveComponent } from './item-remove/item-remove.component';
import { IngredientsComponent } from './item-create/ingredients/ingredients.component';
import { ResolveGourmetService } from '../services/gourmet/resolveGourmet.service';

const routes: Routes = [
	{
		path: '',
		children: [
      { path: '', component: MenuComponent },
      { path: 'create', component: ItemCreateComponent, resolve: {items: ResolveGourmetService} },
      { path: ':id', component: ItemDetailsComponent, resolve: {items: ResolveGourmetService} },
      {
        path: ':id/edit',
        component: ItemEditComponent,
        canActivate: [ AuthGuard, ChefGuard ],
        resolve: {items: ResolveGourmetService}
      },
      {
        path: ':id/remove',
        component: ItemRemoveComponent,
        canActivate: [ AuthGuard, ChefGuard ],
        resolve: {items: ResolveGourmetService}
      }
		],
    resolve: {items: ResolveGourmetService}
	},
];

@NgModule({
    declarations: [
        MenuComponent,
        MenuItemsListComponent,
        ItemComponent,
        ItemEditComponent,
        ItemRemoveComponent,
        ItemDetailsComponent,
        ItemCreateComponent,
        IngredientsComponent,
    ],
    exports: [RouterModule],
    providers: [Data],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class MenuModule { }
