import { Component, OnInit, NgZone } from '@angular/core';
import { android as androidApp } from 'tns-core-modules/application'

import AusweisappSDKConnector = de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector
import AusweisappSDKCallback = de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback
import IAusweisappSDKListener = de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.IAusweisappSDKConnectorListener

export class AusweisappSDKCallbackImpl extends AusweisappSDKCallback {
    constructor(private implementation: { onReceive: (jsonString: string) => void }) { super() }
    onReceive(jsonString: string) { this.implementation.onReceive(jsonString) }
}
@Component({
    selector: 'ExampleSDKConnector',
    template: `
    <ActionBar><Label text="Example Connector"></Label></ActionBar>
    <StackLayout>
    <Label class="description" text="This example shows how the SDK-Connector works and send command GET_INFO" textWrap="true"></Label>
    <Button text="Tap to start" (tap)="start()" [isEnabled]="!running"></Button>
    <TextView [text]="result"></TextView>
    </StackLayout>
    `
})
export class ExampleSDKConnectorComponent implements OnInit {

    running: boolean
    result = ''

    constructor(private ngZone: NgZone) {
    }

    ngOnInit(): void { }

    updateRunning(running: boolean) {
        this.ngZone.run(() => { this.running = running })
    }

    updateLog(...text: string[]) {
        this.ngZone.run(() => {
            // any action that affects ui should made be run in a zone
            for (const aText of text)
                this.result += `\n${aText}`
        })
    }
    start(): void {
        this.result = `Start: ${new Date()}`
        this.updateRunning(true)
        this.updateLog(`Starting SDK connector...`)
        let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
        const callback = new AusweisappSDKCallbackImpl({
            onReceive: (jsonString: string) => {
                this.updateLog(`received message:`, `${JSON.stringify(JSON.parse(jsonString), null, 2)}`)
                this.updateRunning(false)
            }
        })
        const connector = AusweisappSDKConnector.getInstance(foregroundActivity)
            .setCallback(callback)
        connector.onReady(new IAusweisappSDKListener({
            onReady: () => {
                this.updateLog(`SDK connector is ready now`)
                this.updateRunning(true)
                // connector.send(callback.getSessionID(), JSON.stringify({ cmd: 'SET_PIN', value: '123456' }))
                connector.send(callback.getSessionID(), JSON.stringify({ cmd: 'GET_INFO' }))
            },
            onDisconnect: () => {
                this.updateLog(`SDK connector disconnected`)
                this.updateRunning(false)
            },
            onError: (throwable: java.lang.Throwable) => {
                this.updateLog(`SDK connector failed:`, `${throwable}`)
                this.updateRunning(false)
            }
        }))

    }
}