# How to integrate

## 1. Install plugin

```
    $ tns add nativescript-ausweisapp-sdk-wrapper
```

## 2. Set SDK version

Set the right SDK version in the file `<your-tns-app-project>/App_Resources/Android/app.gradle`  
to `minSdkVersion 21`


## 3. Create an activity

In order to beeing able to connect to the Ausweisapp SDK it is required to bypass the `NativescriptActivity` and   
provide an activity including the Ausweisapp SDK.  

Create `AusweisappSDKWrapperActivity` in path `<your-tns-app-project>/src/app/app.ausweisapp-activity.android.ts` as show below:  

```ts
import {setActivityCallbacks, AndroidActivityCallbacks} from "tns-core-modules/ui/frame";

@JavaProxy("de.superfusion.android.AusweisappSDKWrapperActivity")
class AusweisappSDKWrapperActivity extends de.superfusion.android.ausweisapp_sdk_wrapper.activities.AusweisappSDKWrapperActivity 
{
    public isNativeScriptActivity;

    private _callbacks: AndroidActivityCallbacks;

    public onCreate(savedInstanceState: android.os.Bundle): void {
        this.isNativeScriptActivity = true;
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), super.onCreate);
    }

    public onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    public onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    public onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    public onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }
}
```


## 4. Configure webpack

In file `<your-tns-app-project>/webpack.config.js` add `resolve(__dirname, "src/app/app.ausweisapp-activity.android.ts")`  
to `const appComponents` so it makes into `vendor.js`.

```js
    // Add your custom Activities, Services and other Android app components here.
    const appComponents = [
        "tns-core-modules/ui/frame",
        "tns-core-modules/ui/frame/activity",
        resolve(__dirname, "src/app/app.ausweisapp-activity.android.ts")
    ];

```

## 5. AndroidManifest.xml
In file `<your-tns-app-project>/App_Resources/Android/src/main/AndroidManifest.xml` add Activity

```xml
    <activity
        android:name="de.superfusion.android.AusweisappSDKWrapperActivity"
        android:label="ExampleActivity"
        android:configChanges="keyboardHidden|orientation|screenSize"
		android:theme="@style/LaunchScreenTheme"
		>
			<meta-data android:name="SET_THEME_ON_LAUNCH" android:resource="@style/AppTheme" />

			<intent-filter>
				<action android:name="android.intent.action.MAIN" />
				<category android:name="android.intent.category.LAUNCHER" />
			</intent-filter>
			<intent-filter>
				<action android:name="android.nfc.action.TECH_DISCOVERED" />
			</intent-filter>
			<meta-data android:name="android.nfc.action.TECH_DISCOVERED" android:resource="@xml/nfc_tech_filter" />
	</activity>
```

Since the Ausweisapp2 SDK dependency defines the activity name of the `application` 
prevent override by using Android tools.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    ...
>
    	<application
            android:name="com.tns.NativeScriptApplication"
            tools:replace="android:name"
            ...
		>
        ...
        </application>
</manifest>
```

## 6. Dependencies

The plugin will contain all the dependencies from the android aar project.  
Just if you want to know which they are:

```java
dependencies {
    // ...

    // Ausweisapp SDK
    implementation 'com.governikus:ausweisapp:1.16.+'
    // HTTP Client
    implementation 'com.squareup.okhttp:okhttp:2.+'
}
```
