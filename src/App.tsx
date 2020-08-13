import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './styles.css';
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
  }
}

export default App;
