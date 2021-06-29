
import React from 'react';
import {ImageBackground,SafeAreaView, StyleSheet, View, Platform, StatusBar
} from 'react-native';
import Constants from 'expo-constants';

function Screen(props) {
    return (
        
        <SafeAreaView style={styles.screen}>{props.children}</SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        paddingTop : Constants.statusBarHeight,
        height : '100%'
    },
});
export default Screen;

