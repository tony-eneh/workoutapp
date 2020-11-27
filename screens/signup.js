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
  Image,
} from 'react-native';
import materialTheme from '../constants/Theme';
import {Button} from 'galio-framework';
import ImagePicker from 'react-native-image-picker';
import {Avatar} from '../constants/Images';

const {width} = Dimensions.get('screen');

export default class Signup extends Component {
  imageSource = {uri: Avatar};
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.SignupScreenContainer}>
            <View style={styles.SignupFormView}>
              <Text style={styles.logoText}>Signup</Text>
              <Image source={this.imageSource} />
              <TextInput
                placeholder="Name"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.SignupFormTextInput}
              />
              <TextInput
                placeholder="Email"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.SignupFormTextInput}
              />
              <TextInput
                placeholder="Password"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.SignupFormTextInput}
                secureTextEntry={true}
              />
              <Button
                style={styles.SignupButton}
                onPress={() => this.onSignupPress()}>
                SIGN UP
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  onSignupPress() {
    // perform some Signup task
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  SignupScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  SignupFormView: {
    flex: 1,
  },
  SignupFormTextInput: {
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
  SignupButton: {
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
