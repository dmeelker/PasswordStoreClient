import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.scss';
import { render } from '@testing-library/react';
import { Login } from './Screens/Login/Login';
import { Overview } from './Screens/Overview/Overview';

enum Screen {
  Login,
  Overview
}

interface Props {

}

interface State {
  activeScreen: Screen;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeScreen: Screen.Overview
    };
  }

  loginSuccessful() {
    this.setState({
      activeScreen: Screen.Overview
    });
  }

  public render() {
    switch (this.state.activeScreen) {
      case Screen.Login:
        return (<
          Login loginSuccessful={() => this.loginSuccessful()} />
        );

      case Screen.Overview:
        return (<Overview></Overview>);
    }
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
