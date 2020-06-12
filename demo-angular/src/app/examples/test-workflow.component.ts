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

    }


    createWorkflow() {
        let payload = new JSONObject()

        let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
        const ausweisappSDKWrappper = sf.AusweisappSDKWrapper.getInstance(foregroundActivity) as sf.AusweisappSDKWrapper

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

    }
}