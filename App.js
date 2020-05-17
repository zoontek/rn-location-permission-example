import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

Geolocation.setRNConfiguration({skipPermissionRequests: true});

const App = () => {
  const getCurrentPosition = title => {
    Geolocation.getCurrentPosition(position => {
      Alert.alert(title, JSON.stringify(position, null, 2));
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <TouchableOpacity
            onPress={async () => {
              const alwaysStatus = await request(
                PERMISSIONS.IOS.LOCATION_ALWAYS,
              );

              if (alwaysStatus === RESULTS.GRANTED) {
                return getCurrentPosition('LOCATION_ALWAYS granted');
              }

              // always not granted, check for whenInUse
              const whenInUseStatus = await check(
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              );

              if (whenInUseStatus === RESULTS.GRANTED) {
                return getCurrentPosition('LOCATION_WHEN_IN_USE granted');
              }

              Alert.alert("Couldn't get location!", 'Permission not granted');
            }}>
            <Text>Ask permission, then get location</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
