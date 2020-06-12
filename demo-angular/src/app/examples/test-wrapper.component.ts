import { Component } from "@angular/core";
import { android as androidApp } from 'tns-core-modules/application'

import sf = de.superfusion.android.ausweisapp_sdk_wrapper.api
import JSONObject = org.json.JSONObject

@Component({
    selector: 'example',
    template: `<pre>{{result}}</pre>`
})
export class Example {

    start(): void {
        let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
        const wrapper = sf.AusweisappSDKWrapper.getInstance(foregroundActivity) as sf.AusweisappSDKWrapper
        const callbacks = [
            new sf.MessageCallbackPair(sf.Message.__ANY_MESSAGE,
                new sf.IMessageCallback({
                    onMessage: (message: sf.Message, jsonObject: JSONObject) => {
                        console.log(`received`, `message:${message}`, `${jsonObject.toString(2)}`)
                    }
                }))
        ]
        wrapper.onReady(new sf.AusweisappSDKConnector.IAusweisappSDKConnectorListener({
            onReady: () => {
                console.log(`SDK wrapper is ready now`)
                wrapper.getCommander().exec(sf.Command.SET_PIN, new JSONObject().put('value', '123456'), callbacks)
            },
            onDisconnect: () => {
                console.log(`SDK wrapper disconnected`)
            },
            onError: (throwable: java.lang.Throwable) => {
                console.log(`SDK wrapper failed:`, `${throwable}`)
            }
        }))

    }

}