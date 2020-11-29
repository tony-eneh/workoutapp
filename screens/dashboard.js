import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import EmptyNotice from '../components/NoWorkoutYetNotice';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text, Block, Button} from 'galio-framework';
import theme from '../constants/Theme';
import Avatar from '../assets/Avatar.png';

// static app states
// TODO use redux to manage state
let workouts = true;
const profile = {
  avatar: Avatar,
  name: 'Tony Eneh',
  email: 'tony.eneh@kmail.com',
};

export default function Dashboard({navigation, route}) {
  return (
    <>
      <Header title="Dashboard" navigation={navigation} />
      {!workouts ? (
        <EmptyNotice navigation={navigation} />
      ) : (
        <Block style={[styles.container, styles.center]}>
          <Text>
            Welcome{' '}
            <Text p color={theme.COLORS.ACTIVE}>
              {profile.name}
            </Text>
          </Text>
          <Text h4>Last Workout Stats</Text>
          <Block style={[styles.timeBlock, styles.center]}>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={90}
              tintColor={theme.COLORS.ACTIVE}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={theme.COLORS.MUTED}
              rotation={'360'}
              children={(fill) => <Percent fill={fill} label={'TIME GOAL'} />}
            />
            <Text>TOTAL JOGGING TIME {'2hrs 5mins'}</Text>
          </Block>
          <Block style={[styles.distanceBlock, styles.center]}>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={55}
              tintColor={theme.COLORS.ACTIVE}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={theme.COLORS.MUTED}
              rotation={'360'}
              children={(fill) => <Percent fill={fill} label={'TIME GOAL'} />}
            />
            <Text>TOTAL DISTANCE COVERED {'14km'}</Text>
          </Block>
          <Button
            size="large"
            color={theme.COLORS.BUTTON_COLOR}
            onPress={() => navigation.navigate('WorkoutSession')}>
            START JOGGING
          </Button>
        </Block>
      )}
    </>
  );
}

function Percent({fill, label}) {
  return (
    <Block center>
      <Text h5>{fill}%</Text>
      <Text>{label}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeBlock: {marginTop: 20},
  distanceBlock: {marginVertical: 20},
});
