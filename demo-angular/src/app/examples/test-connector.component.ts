import { Component } from "@angular/core";
import { android as androidApp } from 'tns-core-modules/application'

import sf = de.superfusion.android.ausweisapp_sdk_wrapper.api

@Component({
    selector: 'example',
    template: `<pre>{{result}}</pre>`
})
export class Example {

    start(): void {
        let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
        const callback = new AusweisappSDKCallbackImpl({
            onReceive: (jsonString: string) => {
                console.log(`received message:`, `${JSON.stringify(JSON.parse(jsonString), null, 2)}`)
            }
        })
        const connector = sf.AusweisappSDKConnector.getInstance(foregroundActivity)
            .setCallback(callback)
        connector.onReady(new sf.AusweisappSDKConnector.IAusweisappSDKConnectorListener({
            onReady: () => {
                console.log(`SDK connector is ready now`)
                connector.send(callback.getSessionID(), JSON.stringify({ cmd: 'SET_PIN', value: '123456' }))
            },
            onDisconnect: () => {
                console.log(`SDK connector disconnected`)
            },
            onError: (throwable: java.lang.Throwable) => {
                console.log(`SDK connector failed:`, `${throwable}`)
            }
        }))

    }

}

export class AusweisappSDKCallbackImpl extends sf.AusweisappSDKConnector.AusweisappSDKCallback {
    constructor(private implementation: { onReceive: (jsonString: string) => void }) { super() }
    onReceive(jsonString: string) { this.implementation.onReceive(jsonString) }
}