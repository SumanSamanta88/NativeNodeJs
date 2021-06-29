
import React, { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';
import Screen from '../components/Screen';
import Chat from './Chat';
import AuthContext from '../auth/AuthContext';
import socket from '../socketio/socket';
import messageApi from '../api/messageApi';
import chatStore from '../localStorage/chat';


function ChatWindow({ navigation, route }) {
    const [chats , setChats] = useState([]);
    const [message, setMessage] = useState();

    const authContext = useContext(AuthContext);
    const flatListReference = useRef(null);
    const ownNumber = authContext.user.phone;

    const toContactPhone = route.params.phone;
    const toContactName = route.params.name;
    const toContactImage = route.params.dp;
    const getChatHistory = async () => {
        const chatHistory = await chatStore.getData(toContactPhone);
        setChats(chatHistory);
    };
    useEffect(() => {
        getChatHistory();
    }, []);

    const sendMessage = async () => {
        if (message) {
            const chat = {
                id: (chats.length + 1).toString(),
                toPerson: toContactPhone,
                fromPerson: ownNumber,
                message: message,
                pushTokenId: '',
                status: ''  // awaiting, sent , delivered , read
            };
            let chatHistory = chats;
            chatHistory.push(chat);
            //console.log('new', chats);
            setMessage(null);
            const messageResponse = await messageApi.sendPrivateMessage(chat);
            // console.log(messageResponse);
            // socket.emit("private message", {
            //     message,
            //     to: toContactPhone,
            // });
            return await chatStore.storeData(toContactPhone, chatHistory);
        }
    }
    return (
        <Screen>
            <View style={styles.chatMessagesContainer}>
                <View style={styles.chatHeaderContainer}>
                    <View style={styles.chatHeaderHalf1}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color={colors.white} />
                        </TouchableOpacity>
                        { toContactImage ? <Image source={toContactImage} style={styles.image}/> : <Image source={require('../assets/NoPic.png')} style={styles.noImage}/>}
                        <View>
                            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{toContactName}</Text>
                            <Text style={styles.onlineStatus} numberOfLines={1} ellipsizeMode='tail'>This Number {ownNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.chatHeaderHalf2}>
                        <TouchableOpacity style={styles.headerIconContainer}>
                            <Ionicons name="ios-videocam" size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconContainer}>
                            <Feather name="phone-call" size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerIconContainer}>
                            <Entypo name="dots-three-vertical" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.flatListContainer}>

                    <FlatList
                        ref={flatListReference}
                        onContentSizeChange={() => flatListReference.current.scrollToEnd()}
                        data={chats}
                        keyExtractor={(chat) => chat.id}
                        renderItem={({ item }) =>
                            <Chat chat={item.message} meOrOther={item.fromPerson == ownNumber} />
                        }
                    >
                    </FlatList>
                </View>
            </View>
            <View style={styles.chatTextBox}>
                <TouchableOpacity style={styles.chatBoxIconsContainer}>
                    <Feather name="smile" size={24} color={colors.secondary} />
                </TouchableOpacity>
                <TextInput placeholder='Type Here' style={styles.chatTextInput}
                    disableFullscreenUI={true} multiline={true}
                    value={message}
                    onChangeText={(text) => setMessage(text)}>
                </TextInput>
                <TouchableOpacity style={styles.chatBoxIconsContainer} onPress={sendMessage}>
                    <AntDesign name="rightcircle" size={24} color={colors.secondary} />
                </TouchableOpacity>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    chatMessagesContainer: {
        flex: 1,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10
    },
    noImage: {
        height: 50,
        width: 50,
        marginRight: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.white
    },
    onlineStatus: {
        fontSize: 10,
        color: colors.white
    },
    chatHeaderContainer: {
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20,
        height: 60
    },
    headerIconContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatBoxIconsContainer: {

        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    chatHeaderHalf1: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    chatHeaderHalf2: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    flatListContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    chatTextBox: {
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
    },
    chatTextInput: {
        marginLeft: 15,
        fontSize: 18,
        width: '80%',
    },
});
export default ChatWindow;

