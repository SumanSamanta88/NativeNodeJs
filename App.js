import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import AppLoading from 'expo-app-loading';


import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/AuthContext';
import AppNavigator from './app/navigation/AppNavigator'
import AuthStore from './app/auth/AuthStore';
import socket from './app/socketio/socket';
import AppImage from './app/components/AppImage';

export default function App() {
  const [user, setUser] = useState();
  const [isAppReady,setIsAppReady] =useState(false);
  function socketSetOp(phone) {
    socket.auth = { username : phone };
    socket.connect();
    socket.on("private message", ({ content, from }) => {
      console.log('socket message',content,from)
    });
  }
  //useContacts();
  async function restoreToken() {
    const token = await AuthStore.getToken();
    if (token) {
      const decodedJwt = jwtDecode(token);
      setUser(decodedJwt);
      const phone = decodedJwt.phone;
      //socketSetOp(phone)
    }
  }
  if (!isAppReady) {
    return <AppLoading startAsync={restoreToken} onFinish={()=> setIsAppReady(true)} onError={()=> console.warn('Error occured')}/>
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer >
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>

  );
  // return (<AppImage></AppImage>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',

  },
});
