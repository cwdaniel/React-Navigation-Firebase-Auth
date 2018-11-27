import React from 'react';
import { Font } from 'expo';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './navigation/AuthNavigation';
import AppNavigation from './navigation/AppNavigation';
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticated: !!user });
    if (user && user.uid != null) {
      this.setState({ uid: user.uid });
    }
  };

  render() {
    const Navigator = createAppContainer(
      createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppNavigation,
          Auth: AuthNavigation,
        },
        {
          initialRouteName: 'AuthLoading',
        }
      )
    );
    return (
      <Navigator
        screenProps={{
          isAuthenticated: this.state.isAuthenticated,
          uid: this.state.uid,
        }}
      />
    );
  }
}
