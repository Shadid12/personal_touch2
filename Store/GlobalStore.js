import React from 'react';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  state = {
    isOnline: true
  }

  switchToOnline = () => {
    this.setState({ isOnline: true });
  }

  switchToOffline = () => {
    this.setState({ isOnline: false });
  }

  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          switchToOnline: this.switchToOnline,
          switchToOffline: this.switchToOffline
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
  <GlobalContext.Consumer>
    {
      context => <ChildComponent {...props} global={context}  />
    }
  </GlobalContext.Consumer>
);