import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Button } from 'react-native';

import ChatContactsScreen from '../screens/ChatContactsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Drawer = createDrawerNavigator();
function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}
const ProfileNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="ChatContactsScreen" drawerContent={props => <UserProfileScreen {...props}></UserProfileScreen>}>
            <Drawer.Screen name="ChatContactsScreen" component={ChatContactsScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
    );
}
export default ProfileNavigator;