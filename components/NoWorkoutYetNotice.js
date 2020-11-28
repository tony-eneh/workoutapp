import React from 'react';
import {Block, Text, Button} from 'galio-framework';
import theme from '../constants/Theme';

// view to display if there's no workout data yet
export default function EmptyNotice({navigation}) {
  return (
    <Block center style={{flex: 1, justifyContent: 'center'}}>
      <Text p>Oops!! You don't have any workouts yet.</Text>
      <Text p>Click the button below to start a workout now.</Text>
      <Button
        round
        size="large"
        color={theme.COLORS.BUTTON_COLOR}
        onPress={() => navigation.navigate('WorkoutSession', {start: true})}>
        START WORKOUT
      </Button>
    </Block>
  );
}
