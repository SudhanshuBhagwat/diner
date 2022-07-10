import { useLinkTo } from '@react-navigation/native';
import React, { useRef } from 'react';
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { StyleSheet } from 'react-native';
import Screen from '../components/Screen';

interface Props {}

const APP_URL = 'https://diner-omega.vercel.app';

const QRCode: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const linkTo = useLinkTo();
  const [hasPermission, setHasPermission] = React.useState(false);
  const cameraRef = useRef<Camera>();
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (barcodes) {
    barcodes.map(barcode => {
      if (barcode.displayValue.startsWith(APP_URL)) {
        return linkTo(barcode.displayValue.replace(APP_URL, ''));
      }
    });
  }

  return (
    <Screen>
      {device != null && hasPermission && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={cameraRef}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default QRCode;
