# rn-apk-installer

A lightweight React Native package that allows Android apps to programmatically install APK files from a specified file path.

## 🚀 Features

- 📱 Installs APKs directly from local storage

- 🔐 Handles necessary permissions for Android 8.0+

- ⚡ Easy to use and integrate with your existing project

> ⚠️ **Note:** This package only supports **Android**. iOS does not allow dynamic installation of apps.

## 📲 Installation

```bash
npm install react-native-apk-installer
# or
yarn add react-native-apk-installer
```

## Android Configuration

1. Add permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

2. FileProvider setup (for Android 7.0+):

Add this inside `<application>` in your `AndroidManifest.xml`:

```xml
<provider
  android:name="androidx.core.content.FileProvider"
  android:authorities="${applicationId}.provider"
  android:exported="false"
  android:grantUriPermissions="true">
  <meta-data
    android:name="android.support.FILE_PROVIDER_PATHS"
    android:resource="@xml/file_paths" />
</provider>
```

Then create a file at `android/app/src/main/res/xml/file_paths.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="apk" path="." />
</paths>
```

## 🛠 Usage

```tsx
import { installApk } from 'rn-apk-installer';

const apkPath = '/storage/emulated/0/Download/my-app.apk';

installApk(apkPath);
```

## ✅ Requirements

- React Native 0.60+
- Android 5.0 (API 21) or higher

## 📋 API

`installApk(path: string): Promise<void>`

- `path`: The absolute path to the APK file on the device.

Returns a promise that resolves when the installation intent is launched.

## ⚠️ Permissions & Security

To install APKs outside the Play Store, users must enable "Install from Unknown Sources" for your app. For Android 8.0 (API 26) and above, a permission dialog will be shown automatically.

## 🧪 Example

You can find a working example in the [example](https://github.com/ShethSamarth/rn-apk-installer/tree/main/example) folder.
