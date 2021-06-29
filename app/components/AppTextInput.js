import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';


import Screen from './Screen';

function AppTextInput({ icon, ...otherProperties }) {
    return (

        <View style={styles.textContainer}>
            {icon && <MaterialIcons name={icon} size={24} color={colors.medium} />}
            <TextInput style={styles.textInput} {...otherProperties}
            />
        </View>

    );
} 
const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 10,
        width: '100%',
        padding: 10,
        marginVertical: 20
    },
    textInput: {
        fontSize: 18,
        width : '90%',
        marginHorizontal : 10
    }
});
export default AppTextInput;
