import React, {Fragment} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Button, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  View
} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: '#ffa19b',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to Personal Touch',
  };
  render() {
    const {navigate} = this.props.navigation;
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
            style={styles.btn}
            onPress={() => navigate('Camera', {name: 'cam'})}
          >
            <Text>Go to Scanner Mode</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Home"
        onPress={() => navigate('Home')}
      />
    );
  }
}

class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Home"
        onPress={() => navigate('Home')}
      />
    );
  }
}



const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Camera: {screen: CameraScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
