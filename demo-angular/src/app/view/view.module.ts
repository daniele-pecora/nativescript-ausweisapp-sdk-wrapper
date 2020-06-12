import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { InsertCardViewComponent } from "./insert-card/insert-card.component";
import { EnterNumberViewComponent } from "./enter-number/enter-number.component";
import {NumberPadComponent} from './number-pad/number-pad.component';
import { WorkflowStartComponent } from './workflow-start/workflow-start.component'

@NgModule({
    declarations: [
        InsertCardViewComponent,
        EnterNumberViewComponent,
        NumberPadComponent,
        WorkflowStartComponent
    ],
    entryComponents: [
        InsertCardViewComponent,
        EnterNumberViewComponent,
        NumberPadComponent,
        WorkflowStartComponent
    ],
    exports: [
        InsertCardViewComponent,
        EnterNumberViewComponent,
        NumberPadComponent,
        WorkflowStartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewModule { }
