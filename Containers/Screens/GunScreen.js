import React, {Fragment} from 'react';
import * as Permissions from 'expo-permissions';

import {
    Button,
    TextInput,
    View,
    StyleSheet,
    Alert
} from 'react-native';

// store
import {withFirebaseContext} from '../../Store/Firebase'
import {withGlobalContext} from '../../Store/GlobalStore'
import hoistStatics from 'hoist-non-react-statics'


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        flex: 1,
        paddingHorizontal: 10
    },

    input: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    },

    btnContainer: {
        flex: 1,
        justifyContent: "flex-start",
        // padding: 10
    },
    
});


class GunScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: '',
            scanned: false
        };
    }

    store = () => {
        let payload = {
            data: this.state.data,
            userName: this.props.global.userName
        }
        this.props.firebase.doSaveData(payload)
        this.setState({ scanned: false, data: '' })
        this._showAlert();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({data: text})}
                    value={this.state.data}
                />
                <View style={styles.btnContainer}>
                    <Button
                        title={'Store'}
                        onPress={this.store}
                    />
                </View>
            </View>
        )
    }

    _showAlert = () => {
        Alert.alert(
          'Data Stored',
          'Your Data has been stored',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
    }
}

export default hoistStatics(
    withFirebaseContext(
    withGlobalContext(GunScreen)), 
    GunScreen
);