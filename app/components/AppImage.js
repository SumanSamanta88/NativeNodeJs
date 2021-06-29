import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from './Screen';

function AppImage({ imageUri, pickImage }) {
    return (

        <TouchableOpacity onPress={pickImage}>
            <View style={styles.container}>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.dp} /> : <MaterialCommunityIcons name="camera" size={50} color={colors.medium} />}
            </View>
        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: colors.light,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    dp: {
        height: '100%',
        width: '100%'
    }
});
export default AppImage;
