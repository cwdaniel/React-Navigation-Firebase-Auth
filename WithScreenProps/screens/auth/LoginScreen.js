import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login in',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    if (this.props.screenProps.isAuthenticated) {
      this.props.navigation.navigate('App');
    }
  }
  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          //We do nothing here, as soon as the app.js file sees the authChange we will be redirected back to AuthLoading which will correctly sending us to the main app page HomeScreen.js.
        },
        error => {
          Alert.alert(`There was an error: ${error.message}`);
        }
      );
  };
  render() {
    return (
      <View>
        <View>
          <Text>Email</Text>
          <TextInput
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            value={this.state.password}
            onChangeText={value => this.setState({ password: value })}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Button title="Sign In" onPress={() => this.onLoginPress()} />
        </View>
        <Text onPress={() => this.props.navigation.navigate('Register')}>
          Register
        </Text>
        <Text onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          Forgot password?
        </Text>
      </View>
    );
  }
}
