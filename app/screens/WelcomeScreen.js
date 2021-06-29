
import React from 'react';
import {

  Image,
  ImageBackground,
  SafeAreaView, StyleSheet, View, Text
} from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

function WelcomeScreen({navigation}) {
  return (
    <Screen>
      <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
        <View style={styles.logoContainer}>
          <Image style={styles.image} source={require('../assets/logo-red.png')}></Image>
          <Text>Chat and Track your family and friends</Text>

        </View>
        <View style={styles.buttonContainer}>
          <AppButton title='Login' color={colors.primary} textColor={colors.white} onPress={()=> navigation.navigate('Login')}></AppButton>
          <AppButton title='Signup' color={colors.secondary} textColor={colors.white} onPress={()=> navigation.navigate('Signup')}></AppButton>
        </View>
      </ImageBackground>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    padding: 20,
    width: '100%'
  },
  image: {
    height: 50,
    width: 50,

  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    alignItems: 'center'
  }
});
export default WelcomeScreen;

