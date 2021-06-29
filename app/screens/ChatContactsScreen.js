
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

import ChatListItem from '../components/ChatListItem';
import colors from '../config/colors';
import { StatusBar } from 'expo-status-bar';
import Screen from '../components/Screen';
import useContacts from '../hooks/useContacts';

function ChatContactsScreen({ navigation }) {
    let { contacts } = useContacts();
    return (
        <Screen>
            <View style={styles.chatMessagesContainer}>
                <StatusBar backgroundColor='#4ecdc4' />
                <View style={styles.chatHeaderContainer}>
                    <View style={styles.chatHeaderHalf1}>
                        {/* <TouchableOpacity style={styles.headerIconContainer} onPress={()=> navigation.goBack()}>
                            <AntDesign name="back" size={28} color={colors.white} />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.openDrawer()}>
                            <Ionicons name="reorder-three-outline" size={24} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chatHeaderHalf2}>
                        <TouchableOpacity style={styles.headerIconContainer}>
                            <Entypo name="location" size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconContainer}>
                            <MaterialCommunityIcons name="delete-outline" size={24} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconContainer}>
                            <AntDesign name="search1" size={20} color={colors.white} />
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={contacts}
                        keyExtractor={contact => contact._id}
                        renderItem={({ item }) =>
                            <ChatListItem
                                image={item.dp}
                                title={item.name}
                                subTitle={item.name}
                                onPress={() => navigation.navigate('ChatWindow', item)}>
                            </ChatListItem>
                        }
                    >
                    </FlatList>
                </View>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    chatMessagesContainer: {
        flex: 1,
    },
    chatHeaderContainer: {
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 1,
        paddingRight: 20,
        height: 60
    },
    flatListContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    headerIconContainer: {
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatHeaderHalf1: {
        flexDirection: 'row',
        flex: 1,
    },
    chatHeaderHalf2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    }
});
export default ChatContactsScreen;

