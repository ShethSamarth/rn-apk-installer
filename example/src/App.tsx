import { useState } from 'react';
import RNFS from 'react-native-fs';
import { installApk } from 'rn-apk-installer';
import { Alert, Button, Text, View, StyleSheet, Platform } from 'react-native';

const App = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadAndInstall = async (url: string) => {
    if (Platform.OS !== 'android') {
      return Alert.alert(
        'Error',
        'APK installation is only supported on Android.'
      );
    }

    const downloadDestination = `${RNFS.ExternalDirectoryPath}/myApp.apk`;

    try {
      setIsDownloading(true);

      const downloadOptions: RNFS.DownloadFileOptions = {
        fromUrl: url,
        toFile: downloadDestination,
        background: true,
        discretionary: true,
        progress: (res) => {
          const { bytesWritten, contentLength } = res;
          const progressPercentage = (bytesWritten / contentLength) * 100;
          setProgress(progressPercentage);
          console.log(`Download Progress: ${progressPercentage.toFixed(2)}%`);
        },
        progressDivider: 1,
      };

      const downloadResult = await RNFS.downloadFile(downloadOptions).promise;
      console.log('APK Downloaded to:', downloadDestination);

      if (downloadResult.statusCode === 200) {
        installApk(downloadDestination);
      } else {
        Alert.alert(
          'Download Failed',
          'There was an error downloading the APK.'
        );
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Download Failed', 'There was an error downloading the APK.');
    } finally {
      setIsDownloading(false);
      setProgress(0);
    }
  };

  const apkUrl = '';

  return (
    <View style={styles.container}>
      <Button
        disabled={isDownloading}
        onPress={() => downloadAndInstall(apkUrl)}
        title={isDownloading ? 'Downloading...' : 'Download and Install APK'}
      />
      {isDownloading && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Downloading: {progress.toFixed(2)}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  progressText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
