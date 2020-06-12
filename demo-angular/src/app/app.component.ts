import { Component } from "@angular/core";
import { SelectedIndexChangedEventData } from 'tns-core-modules/ui/tab-view';
import { isAndroid } from "tns-core-modules/platform";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
    }
}
