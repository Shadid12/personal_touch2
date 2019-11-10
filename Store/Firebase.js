import React from 'react';
import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJnfn3nFpQvl7gt8yRlZ5J49EKWOGMTkI",
    authDomain: "shadid-13de0.firebaseapp.com",
    databaseURL: "https://shadid-13de0.firebaseio.com",
    projectId: "shadid-13de0",
    storageBucket: "shadid-13de0.appspot.com",
    messagingSenderId: "271658865323",
    appId: "1:271658865323:web:b005af9ed72a536b889dee"
};


const FirebaseContext = React.createContext({});

export const FirebaseContextProvider = (props) => {
    const [state, setState] = React.useState({
        app: null
    });

    React.useEffect(() => {
        let app = firebase.initializeApp(firebaseConfig);
        setState({app})
    }, []);

    const doSaveData = (data) => {
        const {app} = state;
        let payload = data.data
        app.database().ref('data/' + data.userName).push({
            payload
        });
    }

    const getDataByUser = (username) => {
      return new Promise((resolve, reject) => {
        const {app} = state;
        app.database().ref('data/' + username).once('value', (snap) => {
          console.log('Snap Val', snap.val());
          if(snap.val()) {
            resolve(Object.keys(snap.val()).length);
          } else {
            resolve(0)
          }
        })
      })
    }

    return (
        <FirebaseContext.Provider
          value={{
            ...state,
            doSaveData: doSaveData,
            getDataByUser: getDataByUser
          }}
        >
          {props.children}
        </FirebaseContext.Provider>
    )
}

// create the consumer as higher order component
export const withFirebaseContext = ChildComponent => props => (
    <FirebaseContext.Consumer>
      {
        context => <ChildComponent {...props} firebase={context}  />
      }
    </FirebaseContext.Consumer>
  );
