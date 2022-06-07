import { useLinkTo } from "@react-navigation/native";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Font } from "shared/Font";

interface Props {}

const QRCode: React.FC<React.PropsWithChildren<Props> & Props> = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [showQR, setShowQR] = useState<boolean>(false);
  const linkTo = useLinkTo();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowQR(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    linkTo(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {showQR ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View>
          <ActivityIndicator size={"large"} />
          <Text
            style={{
              top: 10,
              fontSize: 14,
            }}
          >
            Loading QR Code Scanner
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRCode;
