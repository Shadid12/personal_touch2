import React from 'react';

const FirebaseContext = React.createContext({});

export const FirebaseContextProvider = (props) => {
    const [state, setState] = React.useState({

    });

    const doSaveData = (data) => {
        console.log('Hello worlds', data)
    }

    return (
        <FirebaseContext.Provider
          value={{
            ...state,
            doSaveData: doSaveData
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
