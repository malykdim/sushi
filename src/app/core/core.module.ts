import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';
import { BrandComponent } from './header/brand/brand.component';
import { NavigationComponent } from './header/navigation/navigation.component';
import { Data } from "src/assets/gourmet-data-backup";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    BrandComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
   providers: [ Data ]
})
export class CoreModule {}
