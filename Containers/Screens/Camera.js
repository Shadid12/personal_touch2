import React, {Fragment} from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
    Button,
    Text,
    View,
    StyleSheet
} from 'react-native';

// store
import {withFirebaseContext} from '../../Store/Firebase'
import {withGlobalContext} from '../../Store/GlobalStore'
import hoistStatics from 'hoist-non-react-statics'


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
    },
    barContainer: {
        flex: 1
    },
    scanner: {
        height: '80%'
    }
});

class CameraScreen extends React.Component {

    state = {
        hasCameraPermission: null,
        scanned: false,
        data: '',
        count: 0
    };

    static navigationOptions = {
        title: 'Camera',
    };

    async componentDidMount() {
        this.getPermissionsAsync();
        const userName = this.props.global.userName;
        const count = await this.props.firebase.getDataByUser(userName);
        this.setState({
            count
        })
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true, data })
    };

    store = () => {
        let payload = {
            data: this.state.data,
            userName: this.props.global.userName
        }
        this.props.firebase.doSaveData(payload)
        this.setState({ scanned: false, data: '', count: this.state.count + 1 })
    }


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
                        <View style={styles.scanner}>
                            <Text>Address: { this.state.data.split('|R04~')[1] ? 
                                this.state.data.split('|R04~')[1].split('|')[0] + '  ' : 'NaN ' }
                                { this.state.data.split('|R06~')[1] ? 
                                    this.state.data.split('|R06~')[1].split('|')[0] + '  ': 'NaN ' }
                                { this.state.data.split('|R07~')[1] ? 
                                    this.state.data.split('|R07~')[1].split('|')[0] + '  ': 'NaN ' }
                            </Text>
                        </View>
                        <Button
                            title={'Store'}
                            onPress={this.store}
                        />
                    </View>
                ) : (
                    <View  style={styles.barContainer}>
                        <Text>Item Scaned: {this.state.count}</Text>
                        <View style={styles.scanner}>
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        </View>
                    </View>
                )
            }
        </View>
      );
    }
}

export default hoistStatics(withFirebaseContext( withGlobalContext(CameraScreen) ), CameraScreen);