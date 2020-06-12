# Ausweisapp SDK Wrapper API

This library provides a simple event based api based on the [Ausweisapp SDK](https://www.ausweisapp.bund.de/sdk) for Android.

## Send commands

Sending commands to Ausweisapp SDK requires an instance of `AusweisappSDKWrapper`.

Following code block shows precisely how to send the command `SET_PIN`, passing  
the payload containing the PIN and receiving the result.

```typescript
import { android as androidApp } from 'tns-core-modules/application'
import sf = de.superfusion.android.ausweisapp_sdk_wrapper.api
import JSONObject = org.json.JSONObject

//...

let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
const wrapper = sf.AusweisappSDKWrapper.getInstance(foregroundActivity) as sf.AusweisappSDKWrapper
const callbacks = [
    new sf.MessageCallbackPair(sf.Message.__ANY_MESSAGE,
        new sf.IMessageCallback({
            onMessage: (message: Message, jsonObject: JSONObject) => {
                console.log(`received`, `message:${message}`, `${jsonObject.toString(2)}`)
            }
        }))
]
wrapper.onReady(new sf.AusweisappSDKConnector.IAusweisappSDKListener({
    onReady: () => {
        console.log(`SDK wrapper is ready now`)
        wrapper.getCommander().exec(Command.SET_PIN, new JSONObject().put('value', '123456'), callbacks)
    },
    onDisconnect: () => {
        console.log(`SDK wrapper disconnected`)
    },
    onError: (throwable: java.lang.Throwable) => {
        console.log(`SDK wrapper failed:`, `${throwable}`)
    }
}))

//...
```


## Workflow

A workflow executes a sequence of commands required for a specific purpose.  

This workflow will provide the data stored on the ID card.

An instance of a workflow can only run once.

```typescript
import { android as androidApp } from 'tns-core-modules/application'
import sf = de.superfusion.android.ausweisapp_sdk_wrapper.api
import JSONObject = org.json.JSONObject

//...

let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
const ausweisappSDKWrappper = sf.AusweisappSDKWrapper.getInstance(foregroundActivity) as sf.AusweisappSDKWrapper

const workflowListener: sf.Workflow.IWorkflowListener =
    new sf.Workflow.IWorkflowListener(
        {
            onListen: () => {
                // workflow has started to listen to any incoming message from Ausweisapp SDK
                // e.g. Card has been added or removed
            },
            onError(exception: sf.CommandServiceException) {
                // error occurred during workflow execution
                console.log('exception', exception)
            },
            onStart: () => {
                // workflow has been started
            },
            onFinish: (command: sf.Command, message: sf.Message, jsonResult: JSONObject) => {
                // workflow has finished
            },
            onCancel: () => {
                // workflow has been cancelled
            },
            onPayloadForCommand: (command: sf.Command) => {
                if (sf.Command.SET_PIN === command) {
                    console.log('Waiting for entering PIN/CAN/PUK ...')
                    try {
                        const payload: JSONObject = new JSONObject()
                        payload.put('value', "123456")
                        return payload
                    } catch (e) {
                        console.error(e)
                    }

                } else
                    if (sf.Command.RUN_AUTH === command) {
                        try {
                            const payload: JSONObject = new JSONObject()
                            payload.put('tcTokenURL', 'https://my-backend/get-saml-request')
                            return payload
                        } catch (e) {
                            console.error(e)
                        }
                    }
            },
            onMessageState: (command: sf.Command, message: sf.Message, jsonResult: JSONObject, text: string) => {
                /** do something usefull with the reponse to the command */
                console.log(`\n***\n${command} -> ${message}\n***\n${text}`)
            }
        })

const workflow: sf.WorkflowMinimalAuth = new sf.WorkflowMinimalAuth(ausweisappSDKWrappper)
workflow.workflowListener = workflowListener
// start listening to incoming messages. (e.g. Card added/removed)
workflow.listen()
// start workflow
workflow.start()
```

This represents the workflow **minimal-successful-authentication** from the sdk 
https://www.ausweisapp.bund.de/sdk/workflow.html#minimal-successful-authentication


#### Creating a workflow

A workflow combines commands in a sequence so a single tasks can be completed.

Creating a workflow is based on chaining command calls with their callbacks.

To see the full list of commands and what message they responde
see [Ausweisapp SDK official API doc](https://www.ausweisapp.bund.de/sdk/)
at https://www.ausweisapp.bund.de/sdk/commands.html


```java
        const secondCommander = ausweisappSDKWrappper.getCommander()
            .prepare(sf.Command.SET_PIN)
            .on(sf.Message.BAD_STATE, new sf.IMessageCallback({
                onMessage: (message: sf.Message, result: org.json.JSONObject) => {
                    /* do something here */
                }
            }))
        const firstCommander = ausweisappSDKWrappper.getCommander()
            .prepare(sf.Command.ACCEPT)
            .on(sf.Message.BAD_STATE, new sf.IMessageCallback({
                onMessage: (message: sf.Message, result: org.json.JSONObject) => {
                    /* do something here */
                }
            }))
            .on(sf.Message.INSERT_CARD, new sf.IMessageCallback({
                onMessage: (message: sf.Message, result: org.json.JSONObject) => {
                    secondCommander.exec()
                }
            }))

        firstCommander.exec(payload)
```


## Low level

There is also a very low level implementation that wraps the Ausweisapp SDK as described at https://www.ausweisapp.bund.de/sdk/.

The activity should inhert from `AusweisappSDKConnectorActivity` and as a connector `AusweisappSDKConnector` has to be used.

The activity is equally configured as the `AusweisappSDKWrapperActivity`.

This example component shows very well how to use it.

```typescript
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
```