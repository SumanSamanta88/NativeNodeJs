import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import ChatContactsScreen from '../screens/ChatContactsScreen';
import ChatWindow from '../screens/ChatWindow';
import useNotificatios from '../hooks/useNotificatios';
import ProfileNavigator from'../navigation/ProfileNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
    useNotificatios();
    return (<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
        <Stack.Screen name="ChatList" component={ProfileNavigator} ></Stack.Screen>
        <Stack.Screen name="ChatWindow" component={ChatWindow}></Stack.Screen>
    </Stack.Navigator>);
}
export default AppNavigator;