import React , {useContext, useState}from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import * as Yup from 'yup';
import { Formik as Form } from 'formik';
import jwtDecode from 'jwt-decode';

import colors from '../config/colors';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import userApi from '../api/userApi';
import AuthContext from '../auth/AuthContext';
import AuthStore from '../auth/AuthStore';

function LoginScreen({ navigation }) {
    let formInitValue = { 'phone': '', 'password': '' }
    const authContext = useContext(AuthContext);
    const [loginError, setLoginError] = useState();
    const validationSchema = Yup.object().shape({
        phone: Yup.string().required().length(10),
        password: Yup.string().required().min(5)
    });
    async function submitForm(formValue) {
        let requestData = { 'phone': formValue.phone, 'password': formValue.password };
        let response = await userApi.authUser(requestData);
        if (response.ok ) {
            if (response.data.statusCode === 200) {
                const decodedJwt = jwtDecode(response.data.content);
                authContext.setUser(decodedJwt);
                AuthStore.storeToken(response.data.content);
                const phone = decodedJwt.phone;
            }  else {
                setLoginError(response.data.errorText);
            }
        } else {
            console.log('Problem',response.problem);
        }
    };
    return (
        <Screen>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo-red.png')} style={styles.logo}  />
            </View>
            <View style={styles.welcomeBtnsContainer}>
                <Form initialValues={formInitValue} validationSchema={validationSchema} onSubmit={(formValue)=> submitForm(formValue)}>
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <React.Fragment>
                            <AppTextInput placeholder="Phone number" icon="phone-iphone" keyboardType="numeric" onChangeText={handleChange('phone')} onBlur={()=>setFieldTouched('phone')}/>
                            {touched.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                            <AppTextInput placeholder="Password" icon="lock" keyboardType="default" secureTextEntry onChangeText={handleChange('password')} onBlur={()=>setFieldTouched('password')}/>
                            {touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

                            {loginError && <Text style={{ color: 'red' }}>*{loginError}</Text>}
                            <AppButton title='Login' color={colors.primary} textColor={colors.white} onPress={handleSubmit} />
                        </React.Fragment>
                    )}
                </Form>

            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    logo: {
        height: 70,
        width: 70,

    },
    welcomeBtnsContainer: {
        flex: 2,
        backgroundColor: colors.light,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },

});
export default LoginScreen;
