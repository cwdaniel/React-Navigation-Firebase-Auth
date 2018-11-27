import React from 'react';
import { Alert, Button, View, StyleSheet, Text, TextInput } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmedPassword: '',
    };
  }
  onSignupPress = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmedPassword,
    } = this.state;
    if (firstName == null) {
      Alert.alert('First name is required.');
      return;
    }
    if (lastName == null) {
      Alert.alert('Last name is required.');
      return;
    }
    if (email == null) {
      Alert.alert('Email is required');
      return;
    }
    if (this.state.password !== this.state.confirmedPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        auth => {
          const ref = firebase.firestore();
          ref.settings({
            timestampsInSnapshots: true,
          });
          var usersRef = ref.collection('users');
          usersRef.doc(`${auth.user.uid}`).set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            yomiName: `${this.state.firstName} ${this.state.lastName}`,
            email: this.state.email,
          });
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };
  render() {
    return (
      <View>
        <View>
          <TextInput
            style={styles.input}
            value={this.state.firstName}
            onChangeText={value => this.setState({ firstName: value })}
            placeholder="First Name"
            keyboardType="default"
            autoCapitalize="words"
            onSubmitEditing={() => {
              this._lastName && this._lastName.focus();
            }}
            returnKeyType="next"
            autoCorrect={false}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={this.state.lastName}
            ref={ref => {
              this._lastName = ref;
            }}
            onChangeText={value => this.setState({ lastName: value })}
            placeholder="Last Name"
            keyboardType="default"
            autoCapitalize="words"
            onSubmitEditing={() => {
              this._email && this._email.focus();
            }}
            returnKeyType="next"
            autoCorrect={false}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={this.state.email}
            ref={ref => {
              this._email = ref;
            }}
            onChangeText={value => this.setState({ email: value })}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => {
              this._password && this._password.focus();
            }}
            returnKeyType="next"
            autoCorrect={false}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            value={this.state.password}
            ref={ref => {
              this._password = ref;
            }}
            onChangeText={value => this.setState({ password: value })}
            placeholder="Password"
            secureTextEntry={true}
            onSubmitEditing={() => {
              this._confirmedPassword && this._confirmedPassword.focus();
            }}
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            ref={ref => {
              this._confirmedPassword = ref;
            }}
            value={this.state.confirmedPassword}
            onChangeText={value => this.setState({ confirmedPassword: value })}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onSubmitEditing={() => {
              this.onSignupPress();
            }}
            returnKeyType="Enter"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View>
          <Button title="Register" onPress={this.onSignupPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});
