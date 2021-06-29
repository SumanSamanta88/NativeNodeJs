import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import AuthContext from '../auth/AuthContext';
import AuthStore from '../auth/AuthStore';
import AppImage from '../components/AppImage';


function UserProfileScreen(props) {
    const authContext = useContext(AuthContext);
    const signOut = async () => {
        authContext.setUser(null);
        AuthStore.removeToken();
    }
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to upload your profile image');
                }
            } catch (ex) {
                console.log(ex);
            }
        })();
    }, []);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 2],
            quality: .5,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <View style={styles.profilePicContainer} >
                            <AppImage imageUri={image} pickImage={pickImage} />
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <Title style={styles.title}>Suman Samanta</Title>
                                <Caption style={styles.caption}>+91-8885322731</Caption>
                            </View>
                        </View>
                    </Drawer.Section>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="home-outline" size={size} color={colors.secondary} />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="account-outline" size={size} color={colors.secondary} />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons name="settings-outline" size={size} color={colors.secondary} />
                            )}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('SettingsScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="support-agent" size={size} color={colors.secondary} />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem onPress={() => signOut()} label='Sign Out' icon={({ color, size }) => (<MaterialIcons name="exit-to-app" size={size} color={colors.secondary} />)}></DrawerItem>
            </Drawer.Section>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.white,
    },
    bottomDrawerSection: {

        borderTopColor: colors.light,
        borderTopWidth: 1,
    },
    drawerContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    profilePicContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        paddingLeft: 18
    }
});
export default UserProfileScreen;
