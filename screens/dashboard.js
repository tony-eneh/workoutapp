import React, {useEffect} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Alert,
  DrawerLayoutAndroidComponent,
} from 'react-native';
import Header from '../components/Header';
import EmptyNotice from '../components/NoWorkoutYetNotice';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text, Block, Button} from 'galio-framework';
import theme from '../constants/Theme';
import Avatar from '../assets/Avatar.png';
import Geolocation from 'react-native-geolocation-service';
import {getDistanceBetweenPoints, getTimeFromTimestamp} from '../utils';

// static app states
// TODO use redux to manage state
let workouts = true;
const profile = {
  avatar: Avatar,
  name: 'Tony Eneh',
  email: 'tony.eneh@kmail.com',
};

function getTimeFill(location, initialLocation, timeGoal) {
  if (!location || !initialLocation) {
    return 0;
  }
  const {timestamp: ts} = location;
  const {timestamp: its} = initialLocation;
  return (100 * (ts - its)) / timeGoal;
}

export default function Dashboard({navigation, route}) {
  const [isJogging, setJogging] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [hasLocationPermission, setLocationPermission] = React.useState(false);
  const [initialTime, setInitialTime] = React.useState(0);
  const [initialPoint, setInitialPoint] = React.useState(null);
  const [lastPoint, setLastPoint] = React.useState(null);
  const [distance, setDistance] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [distanceGoal, setDistanceGoal] = React.useState(10000); // in meters = 10km
  const [durationGoal, setDurationGoal] = React.useState(60 * 60); // one hour
  const [initialLocation, setInitialLocation] = React.useState(null);

  const _setValues = ({timestamp, coords}) => {
    if (!(timestamp || coords)) {
      return;
    }
    if (initialPoint && lastPoint) {
      setDistance(distance + getDistanceBetweenPoints(lastPoint, coords));
    }
    if (initialTime) {
      setDuration(timestamp - initialTime);
    }
    // set initial values if not set
    if (!initialTime) {
      setInitialTime(timestamp);
    }
    if (!initialPoint) {
      setInitialPoint(coords);
    }
    if (!lastPoint) {
      setLastPoint(coords);
    }
  };

  useEffect(() =>
    console.log('state', {
      isJogging,
      location,
      error,
      hasLocationPermission,
      initialTime,
      initialPoint,
      lastPoint,
      distance,
      duration,
      distanceGoal,
      durationGoal,
    }),
  );

  // run once at mounting to get location permission
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Jogger App Geolocation Permission',
        message:
          'Jogger App needs to use your Geolocation Sensor' +
          'so you can take see distances as you jog.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
      .then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the geolocation');
          setLocationPermission(true);
        } else {
          console.log('geolocation permission denied');
          setLocationPermission(false);
        }
      })
      .catch((e) => {
        console.log('Geolocation permission request failed with an error:', e);
      });
  }, []);

  // get initial location and timestamp
  React.useEffect(() => {
    Geolocation.getCurrentPosition(setInitialLocation);
  }, []);

  // start/stop geolocation position watching
  React.useEffect(() => {
    // check if geolocation permission has been granted
    // Alert.alert(
    //   'useCallback called',
    //   'hasLocation' + hasLocationPermission + 'isJogging' + isJogging,
    // );
    if (hasLocationPermission) {
      let watchId = null;
      if (isJogging) {
        watchId = Geolocation.watchPosition(
          // success
          setLocation,
          // error
          setError,
          {
            // options
            enableHighAccuracy: true,
            distanceFilter: 5,
            interval: 4000,
            fastestInterval: 1000,
            showLocationDialog: true,
          },
        );
      } else {
        if (watchId) {
          Geolocation.clearWatch(watchId);
        }
      }
    }
  }, [isJogging, hasLocationPermission]);

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
              fill={getTimeFill(location, initialLocation, durationGoal)}
              tintColor={theme.COLORS.ACTIVE}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={theme.COLORS.MUTED}
              rotation={0}
              children={(fill) => <Percent fill={fill} label={'TIME GOAL'} />}
            />
            <Text>
              TOTAL JOGGING TIME <FormattedTime duration={duration} />
            </Text>
          </Block>
          <Block style={[styles.distanceBlock, styles.center]}>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={0}
              tintColor={theme.COLORS.ACTIVE}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor={theme.COLORS.MUTED}
              rotation={0}
              children={(fill) => <Percent fill={fill} label={'TIME GOAL'} />}
            />
            <Text>
              TOTAL DISTANCE COVERED <FormattedDistance distance={distance} />
            </Text>
          </Block>
          <Button
            size="large"
            color={theme.COLORS.BUTTON_COLOR}
            onPress={() => {
              setJogging(!isJogging);
              console.log('set jogging');
              // Alert.alert('just clicked set jogging button');
            }}>
            {!isJogging ? 'START JOGGING' : 'STOP JOGGING'}
          </Button>
        </Block>
      )}
    </>
  );
}

function Percent({fill, label}) {
  return (
    <Block center>
      <Text h5>{Math.floor(fill)}%</Text>
      <Text>{label}</Text>
    </Block>
  );
}

function FormattedTime({duration}) {
  const {hours, minutes, seconds} = getTimeFromTimestamp(duration);

  // if there's hours return only hours and minutes. If not return minutes and seconds
  if (hours) {
    return (
      <Text>
        {hours} hrs, {minutes} mins
      </Text>
    );
  } else {
    return (
      <Text>
        {minutes} mins, {seconds} secs
      </Text>
    );
  }
}

function FormattedDistance({distance}) {
  const m = distance % 1000;
  const km = (distance - m) / 1000;
  return (
    <Text>
      {km} km, {Math.floor(m)} meters
    </Text>
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
