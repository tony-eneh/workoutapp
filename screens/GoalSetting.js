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
import AuthContext from '../store/AuthContext';

const {width} = Dimensions.get('screen');

export default class GoalSetting extends Component {
  static contextType = AuthContext;
  imageSource = {uri: Avatar};
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.GoalSettingScreenContainer}>
            <View style={styles.GoalSettingFormView}>
              <Text style={styles.logoText}>OK let's set some goals</Text>
              <Image source={this.imageSource} />
              <TextInput
                placeholder="How many days per week will you be jogging?"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.GoalSettingFormTextInput}
              />
              <TextInput
                placeholder="How many minutes each time?"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.GoalSettingFormTextInput}
              />
              <TextInput
                placeholder="Distance to cover per week (in KM)"
                placeholderColor={materialTheme.COLORS.MUTED}
                style={styles.GoalSettingFormTextInput}
                secureTextEntry={true}
              />
              <Button
                style={styles.GoalSettingButton}
                onPress={() => this.onGoalSettingPress()}>
                FINISH
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  onGoalSettingPress() {
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
  GoalSettingScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  GoalSettingFormView: {
    flex: 1,
  },
  GoalSettingFormTextInput: {
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
  GoalSettingButton: {
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
