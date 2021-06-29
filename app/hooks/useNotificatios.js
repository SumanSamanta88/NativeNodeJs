import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

import userApi from '../api/userApi';


export default useNotifications = () => {
    useEffect(() => {
        registerForNotification();
        setNotificationAlertParams();
        Notifications.addNotificationReceivedListener(notification => console.log('Received ', notification));

    }, [])

    const setNotificationAlertParams = () => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true
            }),
        });
    };
    const setNotificationTokenToUser = async () => {
        const pushNotificationToken = await Notifications.getExpoPushTokenAsync();
        const reqBody = { pushToken: pushNotificationToken };
        const response = await userApi.pushToken(reqBody);
    }
    const registerForNotification = async () => {

        try {
            const permission = await Notifications.getPermissionsAsync();
            if (permission.status !== 'granted') {
                permission = await Notifications.requestPermissionsAsync();
            }
            if (permission.status != 'granted') return;
            setNotificationTokenToUser();
        } catch (ex) {
            console.log('Error Occured while resgistering for notification', ex);
        }
    };
}
