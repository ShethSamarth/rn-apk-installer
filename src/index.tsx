import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'rn-apk-installer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RnApkInstaller = NativeModules.RnApkInstaller
  ? NativeModules.RnApkInstaller
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const installApk = (filePath: string): void => {
  if (Platform.OS !== 'android') {
    throw new Error('ApkInstaller is only available on Android');
  }

  if (!filePath || typeof filePath !== 'string') {
    throw new Error('A valid APK file path must be provided');
  }

  try {
    RnApkInstaller.installApk(filePath);
  } catch (error) {
    console.error('Failed to install APK:', error);
    throw error;
  }
};
