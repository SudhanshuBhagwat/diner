// import { BarCodeReadEvent, GoogleVisionBarcodeType } from "react-native-camera";
// import QRCodeScanner from "react-native-qrcode-scanner";
import { Font } from '@diner/shared/Font';
import { useLinkTo } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../components/Screen';

interface Props {}

const QRCode: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const linkTo = useLinkTo();

  // function onSuccess(event: BarCodeReadEvent) {
  //   const type = event.type;
  //   if (String(type) === "QR_CODE") {
  //     linkTo(event.data);
  //   }
  // }

  return (
    <Screen>
      {/* <QRCodeScanner
        onRead={onSuccess}
        reactivate
        topContent={
          <Text style={styles.centerText}>
            Scan the QR code present at the table you're seated on to start
            eating
          </Text>
        }
      /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    textAlign: 'center',
    fontFamily: Font[600],
  },
});

export default QRCode;
