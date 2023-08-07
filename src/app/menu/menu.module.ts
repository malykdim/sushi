import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { MenuItemsListComponent } from './menu-items-list/menu-items-list.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemRemoveComponent } from './item-remove/item-remove.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { Data } from 'src/assets/gourmet-data-backup';
import { ItemDetailsResolverService } from './item-details/item-details-resolver.service';
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
	{
		path: '',
		children: [
		{ path: '', component: MenuComponent },
		{ path: ':id', component: ItemDetailsComponent, resolve: {items: ItemDetailsResolverService} },
		{ path: ':id/edit', component: ItemEditComponent, resolve: {items: ItemDetailsResolverService} },
		{ path: ':id/remove', component: ItemRemoveComponent, resolve: {items: ItemDetailsResolverService} }
		]
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
    ],
    exports: [RouterModule],
    providers: [Data],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class MenuModule { }
