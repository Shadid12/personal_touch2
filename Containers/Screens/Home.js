import React, {Fragment} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
// store
import {withGlobalContext} from '../../Store/GlobalStore'
import hoistStatics from 'hoist-non-react-statics'


const styles = StyleSheet.create({
    btn: {
      alignItems: 'center',
      backgroundColor: '#ffa19b',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5
    },

    submitBtn: {
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: '#1DD28D',
        borderRadius: 5,
        height: 50,
        alignItems: 'center'
    },

    LogoutBtn: {
        alignItems: 'center',
        backgroundColor: '#FFFEEA',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    txt: {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1
    },
    txtContainer: {
        flex: 1,
        paddingHorizontal: 10
    }
});


class HomeScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        userName: '',
        isSubmit: false
      }
    }
    static navigationOptions = ({ navigation }) => {
      if(navigation.state.params) {
        return {
            title: navigation.state.params.title
        }
      }
      return {
        title: `Welcome to Personal Touch`
      }
    };
  
    render() {
      const {navigate} = this.props.navigation;
      if (!this.state.isSubmit || this.state.userName === '') {
        return (
          <Fragment>
          <View style={styles.txtContainer}>
            <Text>Enter Name: </Text>
            <TextInput
              style={styles.txt}
              onChangeText={(userName) => {this.setState({userName})}}
              value={this.state.userName}
            />
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                const {setParams} = this.props.navigation;
                setParams({ title: `Hello, ${this.state.userName}` })
                this.props.global.setUserName(this.state.userName)
                this.setState({isSubmit: true})
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          </Fragment>
        )
      }
      return (
        <Fragment>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigate('Profile', {name: 'Jane'})}
            >
              <Text>Go to My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigate('Camera', {name: 'cam'})}
            >
              <Text>Go to Camera Scaner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.LogoutBtn}
              onPress={() => {
                const {setParams} = this.props.navigation;
                setParams({ title: `Welcome to Personal Touch` })
                this.props.global.setUserName('')
                this.setState({isSubmit: false, userName: ''})
              }}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      );
    }
}

export default hoistStatics(withGlobalContext(HomeScreen), HomeScreen);