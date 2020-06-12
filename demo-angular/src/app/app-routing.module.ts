import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ExampleSDKConnectorComponent } from './examples/example-sdkconnector.component'
import { ExampleSDKWrapperComponent } from './examples/example-sdkwrapper.component'
import { ExampleSDKWorkflow } from "./examples/example-sdkworkflow.component";

const routes: Routes = [
    // { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "", redirectTo: "/(workflowOutlet:workflow//sdkconnectorOutlet:sdkconnector//sdkwrapperOutlet:sdkwrapper)", pathMatch: "full" },

    { path: "workflow", component: ExampleSDKWorkflow, outlet: 'workflowOutlet' },
    { path: "sdkconnector", component: ExampleSDKConnectorComponent, outlet: 'sdkconnectorOutlet' },
    { path: "sdkwrapper", component: ExampleSDKWrapperComponent, outlet: 'sdkwrapperOutlet' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
