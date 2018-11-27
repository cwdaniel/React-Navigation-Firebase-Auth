import React from 'react';
import { View, Text, TextInput } from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {
  state = {
    email: '',
  };
  render() {
    return (
      <View>
        <Text>Chage your password.</Text>
        <TextInput
          value={this.state.email}
          placeholder="Enter Email"
          onChangeText={value => this.setState({ email: value })}
        />
      </View>
    );
  }
}
