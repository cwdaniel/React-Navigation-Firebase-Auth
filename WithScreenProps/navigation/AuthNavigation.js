import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './../screens/auth/LoginScreen';
import RegisterScreen from './../screens/auth/RegisterScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';

export default createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  ForgotPassword: ForgotPasswordScreen,
},{
  initialRouteName:'Register'
});
