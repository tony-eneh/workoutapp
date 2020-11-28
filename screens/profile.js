/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {Block, Text, Input, Button} from 'galio-framework';
import {ScrollView} from 'react-native-gesture-handler';
import theme from '../constants/Theme';
import Avatar from '../assets/Avatar.png';
import CameraIcon from '../assets/Camera.png';

export default function Profile({navigation, route}) {
  return (
    <>
      <Header title="Profile" navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Block style={{padding: 10}}>
              <Block>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Hold thy peace',
                      'sorry you cant change your image for now',
                    )
                  }>
                  <ImageBackground
                    source={Avatar}
                    style={{
                      height: 100,
                      width: 100,
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Image
                      source={CameraIcon}
                      style={{
                        height: 70,
                        width: 70,
                        opacity: 0.7,
                      }}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <Text p>Name:</Text>
                <Input />
                <Text p>Email:</Text>
                <Input />
                <Text p>Password:</Text>
                <Input />
              </Block>
              <Button
                size="large"
                color={theme.COLORS.PRIMARY}
                onPress={() => {
                  Alert.alert(
                    'Supposedly Saved',
                    'Your Profile are supposed to be saved. Unfortunately, datastore not yet implemented',
                  );
                }}>
                SAVE PROFILE
              </Button>
            </Block>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
