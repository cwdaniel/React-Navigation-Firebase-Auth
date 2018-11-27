import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Text>This is an authenticated screen, whoa!</Text>
        </View>
        <View>
          <Text onPress={() => firebase.auth().signOut()}>SignOut</Text>
        </View>
      </View>
    );
  }
}
