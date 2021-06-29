import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, ScrollView } from 'react-native';
import colors from '../config/colors';

function Chat({chat,meOrOther}) {
    return (
        <View style={meOrOther ? styles.chatRightSide : styles.chatLeftSide}>
            <Text>{chat}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    chatLeftSide: {
        marginTop: 10,
        flexDirection: 'row',
        maxWidth: "75%",
        backgroundColor: colors.light,
        borderRadius: 5,
        padding: 10,
        paddingRight: 20,
        marginLeft: 10,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    chatRightSide: {
        marginTop: 10,
        flexDirection: 'row',
        maxWidth: "75%",
        backgroundColor: colors.light,
        borderRadius: 5,
        padding: 10,
        paddingRight: 20,
        marginRight: 10,
        alignSelf: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    image: {
        height: 26,
        width: 26,
        borderRadius: 13,
        marginLeft: 10
    }
});
export default Chat
