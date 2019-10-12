import React from 'react';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  state = {
    userName: ''
  }

  setUserName = (userName) => {
    console.log('Setting USER NAME', userName)
    this.setState({ userName });
  }

  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setUserName: this.setUserName
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