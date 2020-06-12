import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { android as androidApp } from 'tns-core-modules/application'
import { Observable } from 'rxjs'
import { Label } from 'tns-core-modules/ui/label';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';
import { isAndroid } from 'tns-core-modules/platform';
import { EventData } from 'tns-core-modules/ui/page/page';
import { Page } from 'tns-core-modules/ui/page/page';

import superfusion = de.superfusion.android.ausweisapp_sdk_wrapper
import AusweisappSDKWrapper = superfusion.api.AusweisappSDKWrapper
import IAusweisappSDKListener = superfusion.api.AusweisappSDKConnector.IAusweisappSDKConnectorListener
import MessageCallbackPair = superfusion.api.MessageCallbackPair
import IMessageCallback = superfusion.api.IMessageCallback
import Command = superfusion.api.Command
import Message = superfusion.api.Message
import JSONObject = org.json.JSONObject

import CommandServiceException = superfusion.api.CommandServiceException
import Workflow = superfusion.api.Workflow
import WorkflowMinimalAuth = superfusion.api.WorkflowMinimalAuth

import DataProvider = superfusion.demo.DataProvider
import DataProviderTask = DataProvider.DataProviderTask
import DataProviderTaskResult = DataProvider.DataProviderTaskResult

@Component({
    selector: 'ExampleSDKWorkflow',
    template: `
    <ActionBar><Label text="Example Workflow"></Label></ActionBar>
<StackLayout>
<Label class="description" text="This example shows how the SDK-Workflow works while doing a full authentication process" textWrap="true"></Label>
    <Button *ngIf="!workflowRunning" column="0" row="0" (onTap)="workflowStart($event)" text="Tap to start"></Button>
    <Button *ngIf="workflowRunning" column="0" row="0" (onTap)="workflowStop($event)" text="Stop"></Button>    

    <insert-card *ngIf="messageInsertCARD" (onCancel)="onCancelInsertCard($event)">
    </insert-card>
    
    <enter-number *ngIf="messageEnterPIN_CAN_PUK" [textHint]="enterNumberHint" (onCancel)="onCancelEnterNumber($event)"
        (onInputText)="onDoneEnterNumber($event)">
    </enter-number>

    <workflow-start *ngIf="!startInfoViewed">
    </workflow-start>

    <ScrollView col="0" row="1" (loaded)="onScrollViewLoaded($event)">
        <Label [hint]="initialHint" [text]="textLog" (loaded)="onTextViewLoaded($event)" textWrap="true">
        </Label>
    </ScrollView>
</StackLayout>
    `
})
export class ExampleSDKWorkflow implements OnInit, OnDestroy {
    textLog: string
    getXml: DataProviderTask
    DemoData = {
        PIN: '',
        TC_TOKEN_URL: 'https://test.governikus-eid.de/Autent-DemoApplication/RequestServlet?provider=demo_epa_20&redirect=true'
    }
    texts = {
        'SET_PIN': 'Enter PIN ***',
        'SET_CAN': 'Enter CAN ***',
        'SET_PUK': 'Enter PUK ***'
    }
    initialHint = 'Press button to start workflow'
    startInfoViewed: boolean

    currentMessage: string
    currentCommand: Command

    messageEnterPIN_CAN_PUK: boolean
    get messageInsertCARD() {
        return this.currentMessage === `${Message.INSERT_CARD}`
    }
    workflowRunning: boolean
    workflow: WorkflowMinimalAuth

    enterNumberHint = 'Enter number'

    scrollView: ScrollView

    constructor(private ngZone: NgZone, private _page: Page) {
        this._page.on(Page.navigatedToEvent, () => this.ngOnInit());
        this._page.on(Page.navigatedFromEvent, () => this.ngOnDestroy());
    }

    ngOnDestroy(): void {
        this.stopUpdateXMLAsync()
        if (this.workflow)
            this.workflow.cancel()
    }

    ngOnInit(): void {
        this.resetState();
        this.initWorkflow()
    }

    onTextViewLoaded(args: EventData) {
        const lbl = args.object as Label
        if (isAndroid) {
            lbl.android.setGravity(80) // https://developer.android.com/reference/android/view/Gravity#BOTTOM
        }
    }

    onScrollViewLoaded(args: EventData) {
        const scrollView = args.object as ScrollView
        this.scrollView = scrollView
    }

    workflowStart(event) {
        this.startInfoViewed = true
        this.textLog = ''
        if (this.workflow.isRunning())
            this.workflow.cancel()

        this.initWorkflow()
        this.workflowRunning = true
        this.workflow // .setWorkflowListener(workflowListener)
            .start()
    }

    workflowStop(event) {
        this.workflowRunning = false
        this.workflow.cancel()

        this.resetState();
    }

    private resetState() {
        this.ngZone.run(() => {
            this.DemoData.PIN = '';
            this.currentCommand = null;
            this.currentMessage = null;
        })
    }

    updateWorkflowState(running: boolean) {
        this.ngZone.run(() => {
            this.workflowRunning = running
        })
    }

    updateCurrentMessage(message: Message) {
        this.ngZone.run(() => {
            this.currentMessage = `${message}`
        })
    }

    updateCurrentCommand(command: Command) {
        this.ngZone.run(() => {
            this.currentCommand = command
        })
    }

    updateDialogEnterNumberVisibility(show: boolean) {
        this.ngZone.run(() => {
            /** make sure this runs on ui thread */
            this.messageEnterPIN_CAN_PUK = show
        })
    }

    initWorkflow() {
        const __this = this
        let foregroundActivity = androidApp.foregroundActivity as globalAndroid.app.Activity
        const ausweisappSDKWrappper = AusweisappSDKWrapper.getInstance(foregroundActivity) as AusweisappSDKWrapper

        const workflowListener: Workflow.IWorkflowListener =
            new Workflow.IWorkflowListener(
                {
                    onError(exception: CommandServiceException) {
                        this.updateWorkflowState(false)
                        console.log('exception', exception)
                    },
                    onListen: () => {

                    },
                    onStart: () => {

                    },
                    onFinish: (
                        command: Command,
                        message: Message,
                        jsonResult: JSONObject) => {
                        this.updateWorkflowState(false)
                    },
                    onCancel: () => {
                        this.updateWorkflowState(false)
                    },
                    onPayloadForCommand: (command: Command) => {
                        this.updateCurrentCommand(command)

                        if (this.workflowRunning) {

                        }
                        if (-1 != [
                            Command.SET_PIN
                            , Command.SET_CAN
                            , Command.SET_PUK].indexOf(command)) {
                            console.log('Waiting for entering PIN/CAN/PUK ...')
                            this.updateDialogEnterNumberVisibility(!this.DemoData.PIN)
                            if (!this.messageEnterPIN_CAN_PUK && this.DemoData.PIN) {
                                try {
                                    const payload: JSONObject = new JSONObject()
                                    payload.put('value', this.DemoData.PIN)
                                    return payload
                                } catch (e) {
                                    console.error(e)
                                }
                            }

                        } else
                            if (Command.RUN_AUTH === command) {
                                try {
                                    const payload: JSONObject = new JSONObject()
                                    payload.put('tcTokenURL', this.DemoData.TC_TOKEN_URL)
                                    return payload
                                } catch (e) {
                                    console.error(e)
                                }
                            }
                        return null
                    },
                    onMessageState: (
                        command: Command,
                        message: Message,
                        jsonResult: JSONObject,
                        text: string) => {

                        this.logText(`\n***\n${command} -> ${message}\n***\n${text}`)
                        this.updateCurrentMessage(message)

                        if (Message.AUTH === message) {
                            let urlToOpen: string = null;
                            jsonResult = jsonResult || new JSONObject()
                            if (null != jsonResult && jsonResult.has('result')) {
                                const result = jsonResult.getJSONObject('result')
                                const status = result.getString('major') || ''
                                if (status.endsWith('#ok')) {
                                    urlToOpen = jsonResult.has('url') ? jsonResult.getString('url') : null
                                }
                            }

                            if (null != urlToOpen) {
                                this.updateTextFromSAML(urlToOpen)
                            }
                        } else if (Command.RUN_AUTH === message) {

                        }
                    }
                })

        this.workflow = new WorkflowMinimalAuth(ausweisappSDKWrappper)
        this.workflow.workflowListener = workflowListener
    }

    logText(text: string) {
        console.log(text)
        this.ngZone.run(() => {
            this.textLog = `${this.textLog || ''}\n${text}`
        })
        if (this.scrollView)
            setTimeout(() => {
                this.ngZone.run(() => {
                    this.scrollView.scrollToVerticalOffset(this.scrollView.scrollableHeight, false);
                })
            }, 0);
    }

    updateTextFromSAML(urlToOpen: string) {
        this.stopUpdateXMLAsync()
        this.logText(`Loading SAML response from URL:\n${urlToOpen}`)
        this.getXml = new UpdateXMLAsync(
            (result) => {
                const loadXMLContent = result.xmlContentSAML
                const loadAttributesData = result.attributes
                    .toString()
                    .replace('{', '')
                    .replace('}', '')
                    .replace(new RegExp(', ', 'gi'), '\n')

                this.logText(`${loadXMLContent}\n${loadAttributesData}`)
            }
        )
        const params: string[] = [urlToOpen]
        this.getXml.execute(params)
    }

    startUpdateXMLAsync(urlToOpen: string): Observable<String> {
        return new Observable(observer => {
            const task = new DataProviderTask()
            const da = DataProvider.getInstance(urlToOpen)
            const loadXMLContent = da.loadXMLContent()
            const loadAttributesData = da.parseAttributesData(loadXMLContent)
                .toString()
                .replace('{', '')
                .replace('}', '')
                .replace(new RegExp(', ', 'gi'), '\n')
            observer.next(`${loadXMLContent}\n${loadAttributesData}`)
            observer.complete()
        })
    }

    stopUpdateXMLAsync(): void {
        if (this.getXml) {
            this.getXml.cancel(true)
            this.getXml = null
        }
    }

    /** ------------------- */

    onCancelInsertCard(event) {
        console.log('asdfasfd')
        this.DemoData.PIN = ''
        this.messageEnterPIN_CAN_PUK = false
        this.currentMessage = null
        this.workflowStop(null)
    }

    onCancelEnterNumber(event) {
        this.DemoData.PIN = ''
        this.messageEnterPIN_CAN_PUK = false
        this.workflowStop(null)
    }

    onDoneEnterNumber(event) {
        this.DemoData.PIN = event
        this.messageEnterPIN_CAN_PUK = false
    }
}

export class UpdateXMLAsync extends DataProviderTask {
    constructor(private afterPostExecute: (result: DataProviderTaskResult) => void) {
        super()
    }
    onPostExecute(result: DataProviderTaskResult) {
        super.onPostExecute(result)
        if (this.afterPostExecute)
            this.afterPostExecute(result)
    }
}