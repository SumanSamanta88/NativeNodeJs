
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function ChatListItem({ title, subTitle, image, onPress,renderRightActions }) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
                <View style={styles.container}>
                    {image ? <Image source={image} style={styles.image} /> : <Image source={require('../assets/NoPic.png')} style={styles.noImage}/>}
                    <View style={styles.chatDetailsContainer}>
                        <View>
                            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
                            <View style={styles.iconContainer}>
                                <Feather name="user-check" size={18} color={colors.secondary} style={{ marginRight: 4 }} />
                                <Text style={styles.subTitle} numberOfLines={1} ellipsizeMode='tail'>{subTitle}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.chatConfigDispContainer}>
                        <Text>10.00 am</Text>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="volume-mute" size={20} color={colors.secondary} />
                            <MaterialIcons name="attach-file" size={20} color={colors.secondary} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>

    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginRight: 10
    },
    noImage : {
        height: 50,
        width: 50,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#011'
    },
    subTitle: {
        fontSize: 14,
        color: '#a9a9a9'
    },
    chatDetailsContainer: {
        justifyContent: 'center',
        flex: 2,
    },
    chatConfigDispContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    iconContainer: {
        flexDirection: 'row',
    }
});
export default ChatListItem;

