import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, ScrollView } from 'react-native';
import colors from '../config/colors';

function Chats() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.chatRightSide}>
                    <Text>Hi</Text>
                </View>
                <View style={styles.chat}>
                <Image style={styles.image} source={require('../assets/DCIM/screenshot.jpg')}></Image>
                <View style={styles.chatLeftSide}>
                    <Text>My chat My chat My chat My chat My chat My chat My chat </Text>
                </View>
                </View>
            </ScrollView>
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
        marginLeft: 5,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    chat : {
        flexDirection : 'row',
        alignItems : 'center',
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
        marginRight: 20,
        alignSelf: 'flex-end',
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        marginBottom: 10,
    },
    image: {
        height: 26,
        width: 26,
        borderRadius: 13,
        marginLeft : 10
    }
});
export default Chats;
