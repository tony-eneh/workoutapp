import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import {Block, Text, Input, Button} from 'galio-framework';
import {ScrollView} from 'react-native-gesture-handler';
import theme from '../constants/Theme';

export default function Settings({navigation, route}) {
  return (
    <>
      <Header title="Settings" navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Block style={{padding: 10}}>
              <Block>
                <Text h4>Goals</Text>
                <Text p>Distance:</Text>
                <Text>In kilometers</Text>
                <Input />
                <Text p>Duration:</Text>
                <Text>How long should each workout last?</Text>
                <Input />
              </Block>
              <Block>
                <Text h4>Notification</Text>
                <Text>
                  At what time should I remind you to go do your workout?
                </Text>
                <Input />
              </Block>
              <Button
                size="large"
                color={theme.COLORS.PRIMARY}
                onPress={() => {
                  Alert.alert(
                    'Supposedly Saved',
                    'Your settings are supposed to be saved. Unfortunately, datastore not yet implemented',
                  );
                }}>
                SAVE SETTINGS
              </Button>
            </Block>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
