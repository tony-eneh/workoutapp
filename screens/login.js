import React, {Component} from 'react';

import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import materialTheme from '../constants/Theme';
import {Button} from 'galio-framework';
import AuthContext from '../store/AuthContext';

const {width} = Dimensions.get('screen');

export default class Login extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Login</Text>
              <TextInput
                placeholder="Username"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.loginFormTextInput}
              />
              <TextInput
                placeholder="Password"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.loginFormTextInput}
                secureTextEntry={true}
              />
              <Button
                style={styles.loginButton}
                onPress={() => this.onLoginPress()}>
                LOGIN
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  onLoginPress() {
    // dispatch an action to update user's goals
    // set global loggedin content
    const {signIn} = this.context;
    console.log('signIn', signIn);
    signIn();
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    alignSelf: 'stretch',
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    width: width - 30,
  },
});
