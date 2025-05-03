package com.apkinstaller

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import androidx.core.content.FileProvider
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class ApkInstallerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun installApk(filePath: String) {
    val context = reactApplicationContext
    val file = File(filePath)

    if (!file.exists()) {
      println("APK file not found at path: $filePath")
      return
    }

    val intent = Intent(Intent.ACTION_VIEW)
    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK

    val apkUri: Uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
      FileProvider.getUriForFile(context, "${context.packageName}.provider", file)
    } else {
      Uri.fromFile(file)
    }

    intent.setDataAndType(apkUri, "application/vnd.android.package-archive")
    context.startActivity(intent)
  }

  companion object {
    const val NAME = "ApkInstaller"
  }
}
