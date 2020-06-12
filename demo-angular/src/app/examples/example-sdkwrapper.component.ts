import { Component, OnInit, NgZone } from '@angular/core';
import { android as androidApp } from 'tns-core-modules/application'

import AusweisappSDKWrapper = de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper
import IAusweisappSDKListener = de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.IAusweisappSDKConnectorListener
import MessageCallbackPair = de.superfusion.android.ausweisapp_sdk_wrapper.api.MessageCallbackPair
import IMessageCallback = de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback
import Command = de.superfusion.android.ausweisapp_sdk_wrapper.api.Command
import Message = de.superfusion.android.ausweisapp_sdk_wrapper.api.Message
import JSONObject = org.json.JSONObject


@Component({
    selector: 'ExampleSDKWrapper',
    template: `
    <ActionBar><Label text="Example Wrapper"></Label></ActionBar>
    <StackLayout>
    <Label class="description" text="This example shows how the SDK-Wrapper works and send command GET_INFO" textWrap="true"></Label>
    <Button text="Tap to start" (tap)="start()" [isEnabled]="!running"></Button>
    <TextView [text]="result"></TextView>
    </StackLayout>
    `
})
export class ExampleSDKWrapperComponent implements OnInit {

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
        this.updateLog(`Starting SDK wrapper...`)
        let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity

        const wrapper = AusweisappSDKWrapper.getInstance(foregroundActivity) as AusweisappSDKWrapper
        const callbacks = [
            new MessageCallbackPair(Message.__ANY_MESSAGE,
                new IMessageCallback({
                    onMessage: (message: Message, jsonObject: JSONObject) => {
                        this.updateLog(`received`, `message:${message}`, `${jsonObject.toString(2)}`)
                        this.updateRunning(false)
                    }
                }))
        ]
        wrapper.onReady(new IAusweisappSDKListener({
            onReady: () => {
                this.updateLog(`SDK wrapper is ready now`)
                this.updateRunning(true)
                // wrapper.getCommander().exec(Command.SET_PIN, new JSONObject().put('value', '123456'), callbacks)
                wrapper.getCommander().exec(Command.GET_INFO, new JSONObject(), callbacks)
            },
            onDisconnect: () => {
                this.updateLog(`SDK wrapper disconnected`)
                this.updateRunning(false)
            },
            onError: (throwable: java.lang.Throwable) => {
                this.updateLog(`SDK wrapper failed:`, `${throwable}`)
                this.updateRunning(false)
            }
        }))

    }
}