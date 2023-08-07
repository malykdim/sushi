import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TerminalComponent } from "./snippets/terminal/terminal.component";
import { FlexRowDirective } from "./directives/flex-row.directive";
import { FlexColumnDirective } from "./directives/flex-column.directive";
import { LinkComponent } from './snippets/link/link.component';
import { HighlightCardComponent } from './snippets/highlight-card/highlight-card.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { HiddenSelectionComponent } from './components/hidden-selection/hidden-selection.component';
import { LoaderSmallComponent } from './snippets/loader-small/loader-small.component';

@NgModule({
  declarations: [
    TerminalComponent,
    FlexRowDirective,
    FlexColumnDirective,
    LinkComponent,
    HighlightCardComponent,
    CardContainerComponent,
    HiddenSelectionComponent,
    LoaderSmallComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TerminalComponent,
    FlexRowDirective,
    FlexColumnDirective,
    LinkComponent,
    HighlightCardComponent,
    CardContainerComponent,
    HiddenSelectionComponent,
    LoaderSmallComponent
  ]
})
export class SharedModule {}
