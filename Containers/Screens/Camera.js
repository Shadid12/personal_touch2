import React, {Fragment} from 'react';
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

    btnContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    }
});

class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        data: ''
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
        this.setState({ scanned: true, data })
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
            {
                scanned ? (
                    <View style={styles.btnContainer}>
                        <Button
                            title={'Store'}
                            onPress={() => this.setState({ scanned: false })}
                        />
                    </View>
                ) : (
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                )
            }
        </View>
      );
    }
}

export default CameraScreen;