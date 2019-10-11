import React, {Fragment} from 'react';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
    Button,
    Text,
    View,
    StyleSheet
} from 'react-native';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
});

class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    static navigationOptions = {
        title: 'Camera',
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };


    render() {
      const {navigate} = this.props.navigation;
      const { hasCameraPermission, scanned } = this.state;

      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }

      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }


      return (
        <View
            style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && (
                <Button
                    title={'Tap to Scan Again'}
                    onPress={() => this.setState({ scanned: false })}
                />
            )}
        </View>
      );
    }
}

export default CameraScreen;