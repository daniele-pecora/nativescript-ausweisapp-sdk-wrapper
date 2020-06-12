/// <reference path="ausweisapp-sdk-wrapper-declarations.d.ts"/>

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export class BuildConfig {
					public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.BuildConfig>;
					public static DEBUG: boolean;
					public static LIBRARY_PACKAGE_NAME: string;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module activities {
					export class AusweisappSDKConnectorActivity {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.activities.AusweisappSDKConnectorActivity>;
						public ausweisappSDKConnector: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector;
						public constructor();
						public onResume(): void;
						public onRequestPermissionsResult(param0: number, param1: native.Array<string>, param2: native.Array<number>): void;
						public onNewIntent(param0: globalAndroid.content.Intent): void;
						public onStop(): void;
						public onBackPressed(): void;
						public onPause(): void;
						public onDestroy(): void;
						public getIntent(): globalAndroid.content.Intent;
						public onCreate(param0: globalAndroid.os.Bundle): void;
						public onActivityResult(param0: number, param1: number, param2: globalAndroid.content.Intent): void;
						public onSaveInstanceState(param0: globalAndroid.os.Bundle): void;
						public onStart(): void;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module activities {
					export class AusweisappSDKWrapperActivity {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.activities.AusweisappSDKWrapperActivity>;
						public ausweisappSDKWrapper: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public constructor();
						public onResume(): void;
						public onRequestPermissionsResult(param0: number, param1: native.Array<string>, param2: native.Array<number>): void;
						public onNewIntent(param0: globalAndroid.content.Intent): void;
						public onStop(): void;
						public onBackPressed(): void;
						public onPause(): void;
						public onDestroy(): void;
						public getIntent(): globalAndroid.content.Intent;
						public onCreate(param0: globalAndroid.os.Bundle): void;
						public onActivityResult(param0: number, param1: number, param2: globalAndroid.content.Intent): void;
						public onSaveInstanceState(param0: globalAndroid.os.Bundle): void;
						public onStart(): void;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class AusweisappSDKConnector {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector>;
						public activity: globalAndroid.app.Activity;
						public startAfterServiceIsConnected: boolean;
						public mSdk: com.governikus.ausweisapp2.IAusweisApp2Sdk;
						public static CALLBACK_DEFAULT: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback;
						public mConnection: globalAndroid.content.ServiceConnection;
						public enableForegroundDispatcher(): void;
						public constructor(param0: globalAndroid.app.Activity, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback);
						public disableForegroundDispatcher(): void;
						public start(): boolean;
						public send(param0: string, param1: string): void;
						public setCallback(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector;
						public onNewIntent(param0: globalAndroid.content.Intent): void;
						public static getInstance(param0: globalAndroid.app.Activity): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector;
						public isReady(): boolean;
						public stop(): void;
						public onReady(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.IAusweisappSDKConnectorListener): void;
					}
					export module AusweisappSDKConnector {
						export abstract class AusweisappSDKCallback {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback>;
							public constructor();
							public isDisconnected(): boolean;
							public onReceive(param0: string): void;
							public onSessionIdGenerated(param0: string, param1: boolean): void;
							public getSessionID(): string;
							public onDisconnected(): void;
						}
						export class AusweisappSDKCallbackWrapper extends de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallbackWrapper>;
							public constructor();
							public onReceive(param0: string): void;
						}
						export class AusweisappSDKConnectorException {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKConnectorException>;
							public constructor();
							public constructor(param0: string);
							public constructor(param0: string, param1: java.lang.Throwable);
						}
						export abstract class AusweisappSDKListener extends de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.IAusweisappSDKConnectorListener {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKListener>;
							public constructor();
							public onError(param0: java.lang.Throwable): void;
							public onReady(): void;
							public onDisconnect(): void;
						}
						export class ForegroundDispatcher {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.ForegroundDispatcher>;
						}
						export class IAusweisappSDKConnectorListener {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.IAusweisappSDKConnectorListener>;
							/**
							 * Constructs a new instance of the de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector$IAusweisappSDKConnectorListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onReady(): void;
								onDisconnect(): void;
								onError(param0: java.lang.Throwable): void;
							});
							public constructor();
							public onError(param0: java.lang.Throwable): void;
							public onReady(): void;
							public onDisconnect(): void;
						}
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class AusweisappSDKWrapper extends de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper>;
						public constructor(param0: globalAndroid.app.Activity, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback);
						public send(param0: string, param1: string): void;
						public send(param0: org.json.JSONObject, param1: native.Array<de.superfusion.android.ausweisapp_sdk_wrapper.api.MessageCallbackPair>): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public send(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: org.json.JSONObject, param2: java.util.Map<de.superfusion.android.ausweisapp_sdk_wrapper.api.Message,de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback>): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public send(param0: org.json.JSONObject, param1: java.util.Map<de.superfusion.android.ausweisapp_sdk_wrapper.api.Message,de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback>): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public setCommanderInterceptor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.CommanderInterceptor): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public setCallback(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector;
						public static getInstance(param0: globalAndroid.app.Activity): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector;
						public static getInstance(param0: globalAndroid.app.Activity): de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public getCommander(): de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander;
					}
					export module AusweisappSDKWrapper {
						export class AusweisappSDKWrapperCallback extends de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKCallback {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper.AusweisappSDKWrapperCallback>;
							public onReceive(param0: string): void;
							public onSessionIdGenerated(param0: string, param1: boolean): void;
							public onDisconnected(): void;
						}
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class Command {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Command>;
						public static GET_INFO: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static GET_API_LEVEL: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static SET_API_LEVEL: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static GET_READER: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static GET_READER_LIST: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static RUN_AUTH: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static GET_ACCESS_RIGHTS: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static SET_ACCESS_RIGHTS: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static GET_CERTIFICATE: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static CANCEL: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static ACCEPT: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static SET_PIN: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static SET_CAN: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public static SET_PUK: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public defaultMessage: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public supportsMessages: java.util.List<de.superfusion.android.ausweisapp_sdk_wrapper.api.Message>;
						public static values(): native.Array<de.superfusion.android.ausweisapp_sdk_wrapper.api.Command>;
						public supportsMessage(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message): boolean;
						public static fromString(param0: string): de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public toJSON(): org.json.JSONObject;
						public static fromJson(param0: org.json.JSONObject): de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
						public toJSON(param0: org.json.JSONObject): org.json.JSONObject;
						public static valueOf(param0: string): de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class CommandServiceException {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.CommandServiceException>;
						public constructor();
						public constructor(param0: java.lang.Throwable);
						public constructor(param0: string, param1: java.lang.Throwable);
						public constructor(param0: string);
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class Commander {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander>;
						public exec(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: org.json.JSONObject): void;
						public setCommanderInterceptor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.CommanderInterceptor): void;
						public prepare(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command): de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.Builder;
						public exec(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: org.json.JSONObject, param2: native.Array<de.superfusion.android.ausweisapp_sdk_wrapper.api.MessageCallbackPair>): void;
					}
					export module Commander {
						export class Builder {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.Builder>;
							public command: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command;
							public exec(param0: org.json.JSONObject): void;
							public hasCallback(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message): boolean;
							public exec(): void;
							public on(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback): de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.Builder;
							public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command);
						}
						export class CommanderInterceptor {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.CommanderInterceptor>;
							/**
							 * Constructs a new instance of the de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander$CommanderInterceptor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								interceptRequest(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: org.json.JSONObject): void;
							});
							public constructor();
							public interceptRequest(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: org.json.JSONObject): void;
						}
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class IAusweisappSDKConnector {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.IAusweisappSDKConnector>;
						/**
						 * Constructs a new instance of the de.superfusion.android.ausweisapp_sdk_wrapper.api.IAusweisappSDKConnector interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
						});
						public constructor();
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class IMessageCallback {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback>;
						/**
						 * Constructs a new instance of the de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onMessage(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param1: org.json.JSONObject): void;
						});
						public constructor();
						public onMessage(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param1: org.json.JSONObject): void;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class Message {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Message>;
						public static INFO: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static API_LEVEL: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static READER: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static READER_LIST: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static AUTH: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static ACCESS_RIGHTS: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static CERTIFICATE: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static ENTER_PIN: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static ENTER_CAN: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static ENTER_PUK: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static INSERT_CARD: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static INTERNAL_ERROR: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static UNKNOWN_COMMAND: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static INVALID: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static BAD_STATE: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static __ANY_MESSAGE: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static fromJson(param0: org.json.JSONObject): de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static values(): native.Array<de.superfusion.android.ausweisapp_sdk_wrapper.api.Message>;
						public static fromString(param0: string): de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public static valueOf(param0: string): de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public toJSON(): org.json.JSONObject;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class MessageCallbackPair {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.MessageCallbackPair>;
						public message: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message;
						public callback: de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback;
						public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.IMessageCallback);
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export abstract class Workflow {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow>;
						public ausweisappSDKWrapper: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper;
						public workflowListener: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.IWorkflowListener;
						public cancelled: boolean;
						public running: boolean;
						public listening: boolean;
						public setWorkflowListener(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.IWorkflowListener): de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow;
						public exec(): void;
						public cancel(): void;
						public requestPayload(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command): org.json.JSONObject;
						public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.IWorkflowListener);
						public isRunning(): boolean;
						public _start(): void;
						public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper);
						public start(): void;
						public notifyListener(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject, param3: string): void;
						public executeIfNotCancelled(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.Builder): void;
						public executeIfNotCancelled(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Commander.Builder, param1: org.json.JSONObject): void;
						public isFinishState(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject): boolean;
						public listen(): void;
					}
					export module Workflow {
						export class AusweisappSDKListenerStartable extends de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.AusweisappSDKListenerWorkflowListen {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.AusweisappSDKListenerStartable>;
							public constructor();
							public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow, param2: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.Starter);
							public onError(param0: java.lang.Throwable): void;
							public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow);
							public onReady(): void;
							public onDisconnect(): void;
						}
						export class AusweisappSDKListenerWorkflowListen extends de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKListener {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.AusweisappSDKListenerWorkflowListen>;
							public constructor();
							public onError(param0: java.lang.Throwable): void;
							public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow);
							public onReady(): void;
							public onDisconnect(): void;
						}
						export class IWorkflowListener {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.IWorkflowListener>;
							/**
							 * Constructs a new instance of the de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow$IWorkflowListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onPayloadForCommand(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command): org.json.JSONObject;
								onMessageState(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject, param3: string): void;
								onListen(): void;
								onStart(): void;
								onCancel(): void;
								onFinish(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject): void;
								onError(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.CommandServiceException): void;
							});
							public constructor();
							public onFinish(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject): void;
							public onPayloadForCommand(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command): org.json.JSONObject;
							public onMessageState(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject, param3: string): void;
							public onListen(): void;
							public onStart(): void;
							public onError(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.CommandServiceException): void;
							public onCancel(): void;
						}
						export class ListeningStarter {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.ListeningStarter>;
							public exec(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKListener): void;
						}
						export class Starter {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.Starter>;
							public exec(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKConnector.AusweisappSDKListener): void;
						}
						export class WorkflowCanOnlyRunOnceException {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.WorkflowCanOnlyRunOnceException>;
							public constructor();
						}
						export class WorkflowCancelException {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.WorkflowCancelException>;
							public reason: string;
							public constructor();
							public constructor(param0: string);
						}
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export class WorkflowMinimalAuth extends de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.WorkflowMinimalAuth>;
						public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper);
						public notifyListener(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject, param3: string): void;
						public exec(): void;
						public constructor(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.AusweisappSDKWrapper, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Workflow.IWorkflowListener);
						public isFinishState(param0: de.superfusion.android.ausweisapp_sdk_wrapper.api.Command, param1: de.superfusion.android.ausweisapp_sdk_wrapper.api.Message, param2: org.json.JSONObject): boolean;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module api {
					export module attributes {
						export class DataAttributeParser {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser>;
							public constructor();
							public parse(param0: java.io.InputStream): java.util.Map<string,string>;
						}
						export module DataAttributeParser {
							export class Attribute {
								public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute>;
								public static RestrictedID: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static RestrictedID2: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static DateOfBirth: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static ResidencePermitI: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static ArtisticName: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static IssuingState: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static DocumentType: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static FamilyNames: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static AgeVerification_RequestAge: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static AgeVerification_ResultFulfilsRequest: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static Nationality: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static AcademicTitle: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceOfBirth: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static GivenNames: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static DocumentValidity_ReferenceDate: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static DocumentValidity_Status: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceOfResidence_Country: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceOfResidence_City: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceOfResidence_ZipCode: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceOfResidence_Street: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static DateOfExpiry: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static BirthName: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceVerification_RequestCommunityID: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static PlaceVerification_ResultFulfilsRequest: de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static valueOf(param0: string): de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute;
								public static values(): native.Array<de.superfusion.android.ausweisapp_sdk_wrapper.api.attributes.DataAttributeParser.Attribute>;
							}
						}
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module demo {
					export class DataClient {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataClient>;
						public constructor();
						public getContent(param0: string): string;
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module demo {
					export class DataParser {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataParser>;
						public parseContent(param0: string): string;
						public constructor();
						public parseAttributesFromSAMLDecrypted(param0: string): java.util.Map<string,string>;
						public parseSAMLResponseURLRefID(param0: string): string;
					}
					export module DataParser {
						export class Helper {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataParser.Helper>;
							public static escapeXMLChars(param0: string): string;
							public static cleanLineBreaks(param0: string): string;
							public static unescapeXMLChars(param0: string): string;
						}
					}
				}
			}
		}
	}
}

declare module de {
	export module superfusion {
		export module android {
			export module ausweisapp_sdk_wrapper {
				export module demo {
					export class DataProvider {
						public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider>;
						public parseAttributesData(param0: string): java.util.Map<string,string>;
						public loadXMLContent(): string;
						public static getInstance(param0: string): de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider;
					}
					export module DataProvider {
						export class DataProviderTask extends globalAndroid.os.AsyncTask<any,java.lang.Void,de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider.DataProviderTaskResult> {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider.DataProviderTask>;
							public constructor();
							public onPreExecute(): void;
							public onCancelled(): void;
							public onProgressUpdate(param0: native.Array<java.lang.Void>): void;
							public onCancelled(param0: de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider.DataProviderTaskResult): void;
							public doInBackground(param0: native.Array<any>): de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider.DataProviderTaskResult;
							public onPostExecute(param0: de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider.DataProviderTaskResult): void;
						}
						export class DataProviderTaskResult {
							public static class: java.lang.Class<de.superfusion.android.ausweisapp_sdk_wrapper.demo.DataProvider.DataProviderTaskResult>;
							public url: string;
							public xmlContentSAML: string;
							public attributes: java.util.Map<string,string>;
							public constructor();
						}
					}
				}
			}
		}
	}
}

//Generics information:

