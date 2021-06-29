import React from 'react';
import { StyleSheet, View} from 'react-native';

function ChatMessagesScreen() {


    return (
        <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
            <View>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
export default ChatMessagesScreen;
