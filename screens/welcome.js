import React from 'react';
import {ImageBackground, StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Block, Button, Text, theme, Link} from 'galio-framework';

const {height, width} = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Welcome extends React.Component {
  render() {
    const {navigation} = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{uri: Images.Welcome}}
            style={{
              height: height,
              width: width,
              marginTop: '-55%',
              zIndex: 1,
            }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{zIndex: 2}}>
            <Block>
              <Block>
                <Text color="white" size={60}>
                  Jogging
                </Text>
              </Block>
              <Block row>
                <Text color="white" size={60}>
                  Tracker
                </Text>
              </Block>
              <Text size={16} color="rgba(255,255,255,0.6)">
                Achieve the body of your dreams.
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('Signup')}>
                GET STARTED
              </Button>
              <Block>
                <Text size={16} color="rgba(255,255,255,0.6)">
                  Already signed up?
                </Text>
                <Link
                  center
                  onPress={() => navigation.navigate('Login')}
                  color={materialTheme.COLORS.BUTTON_COLOR}>
                  Log in.
                </Link>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
