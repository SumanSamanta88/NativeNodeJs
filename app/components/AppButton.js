
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function AppButton({ title, color, textColor, onPress }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <Text style={[styles.text, { backgroundColor: color, color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10
    },
    text: {
        textTransform: 'capitalize',
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase'
    }
});
export default AppButton;

