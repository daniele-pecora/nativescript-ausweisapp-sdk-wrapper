import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ExampleSDKConnectorComponent } from "./examples/example-sdkconnector.component";
import { ExampleSDKWrapperComponent } from "./examples/example-sdkwrapper.component";
import { ExampleSDKWorkflow } from "./examples/example-sdkworkflow.component";
import { ViewModule } from "./view/view.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        ViewModule
    ],
    declarations: [
        AppComponent,
        ExampleSDKWorkflow,
        ExampleSDKConnectorComponent,
        ExampleSDKWrapperComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
