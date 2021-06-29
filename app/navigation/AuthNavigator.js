import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
        <Stack.Screen name="Welcome" component={WelcomeScreen} ></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen}></Stack.Screen>
    </Stack.Navigator>);
}
export default AuthNavigator;