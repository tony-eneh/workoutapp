import React, {useEffect} from 'react';
import {StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import Header from '../components/Header';
import EmptyNotice from '../components/NoWorkoutYetNotice';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Text, Block, Button} from 'galio-framework';
import theme from '../constants/Theme';
import Avatar from '../assets/Avatar.png';
import Geolocation from 'react-native-geolocation-service';

// static app states
// TODO use redux to manage state
let workouts = true;
const profile = {
  avatar: Avatar,
  name: 'Tony Eneh',
  email: 'tony.eneh@kmail.com',
};

// function to calculate distance between two geolocation points
function getDistanceBetweenPoints(point1, point2) {
  const {latitude: lat1, longitude: lon1} = point1;
  const {latitude: lat2, longitude: lon2} = point2;
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in metres
}

export default function Dashboard({navigation, route}) {
  const [isJogging, setJogging] = React.useState(false);
  const [position, setPosition] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [hasLocationPermission, setLocationPermission] = React.useState(false);
  const [initialTime, setInitialTime] = React.useState(null);

  useEffect(() =>
    console.log('state', {
      isJogging,
      position,
      error,
      hasLocationPermission,
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
          ({timestamp, coords}) => {
            // success callback
            if (!initialTime) {
              setInitialTime(timestamp);
              setPosition(coords);
            }
          },
          // error callback
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
  }, [isJogging, hasLocationPermission, initialTime]);

  //  handle location change
  useEffect(() => {
    // Alert.alert('new position:' + position);
    // Alert.alert('error ' + error);
  }, [position, error]);

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
              rotation={0}
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
              rotation={0}
              children={(fill) => <Percent fill={fill} label={'TIME GOAL'} />}
            />
            <Text>TOTAL DISTANCE COVERED {'14km'}</Text>
          </Block>
          <Button
            size="large"
            color={theme.COLORS.BUTTON_COLOR}
            onPress={() => {
              setJogging(true);
              console.log('set jogging to true');
              // Alert.alert('just clicked set jogging button');
            }}>
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
