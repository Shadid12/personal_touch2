import React, {Fragment} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Button, 
  StyleSheet, 
} from 'react-native';

//components
import CameraScreen from './Containers/Screens/Camera';
import HomeScreen from './Containers/Screens/Home';
//context
import {GlobalContextProvider} from './Store/GlobalStore';
import {FirebaseContextProvider} from './Store/Firebase';

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
  txt: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});


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



const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  Camera: {screen: CameraScreen}
});

const App = createAppContainer(MainNavigator);

const index = (props) => (
  (
    <GlobalContextProvider>
      <FirebaseContextProvider>
        <App />
      </FirebaseContextProvider>
    </GlobalContextProvider>
  )
)

export default index;
