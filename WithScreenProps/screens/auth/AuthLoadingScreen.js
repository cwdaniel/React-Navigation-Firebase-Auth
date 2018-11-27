import React from "react";
import { ActivityIndicator, View } from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    const {isAuthenticated} = this.props.screenProps;
    if (isAuthenticated != null) {
      this.props.navigation.navigate(isAuthenticated ? 'App' : 'Auth')
    }
  }
  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" animating={true} />
      </View>
    );
  }
}
