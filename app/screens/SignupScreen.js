import React, { useState, useContext } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Formik as Form } from 'formik';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';


import colors from '../config/colors';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen';
import userApi from '../api/userApi';
import AuthContext from '../auth/AuthContext';

function SignupScreen({ navigation }) {
    const [signUpError, setSignupError] = useState();
    const authContext = useContext(AuthContext)
    let formInitValue = { 'phone': '', 'password': '', 'repeatPassword': '' };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    var schema = Yup.object().shape({
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        password: Yup.string().required().min(5),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    async function submitForm(formValue) {
        let requestData = { 'phone': formValue.phone, 'password': formValue.password };
        let response = await userApi.registerUser(requestData)

        if (response.ok) {
            if (response.data.statusCode === 200) {
                const decodedJwt = jwtDecode(response.data.content);
                authContext.setUser(decodedJwt);
            } else {
                setSignupError(response.data.errorText);
            }
        } else {
            console.log('Problem', response.problem);
        }
    };

    return (
        <Screen>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo-red.png')} style={styles.logo} />
            </View>
            <View style={styles.welcomeBtnsContainer}>
                <Form validationSchema={schema} initialValues={formInitValue} onSubmit={(formValue) => { submitForm(formValue); }} >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <React.Fragment>
                            <AppTextInput placeholder="Phone number" icon="phone-iphone" onBlur={() => {
                                setFieldTouched('phone');
                                setSignupError(null);
                            }}
                                keyboardType="numeric" onChangeText={handleChange('phone')} />
                            {touched.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
                            <AppTextInput placeholder="Password" icon="lock" onBlur={() => { setFieldTouched('password'); setSignupError(null); }}
                                keyboardType="default" secureTextEntry onChangeText={handleChange('password')} />
                            {touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                            <AppTextInput placeholder="Re-enter Password" icon="lock" onBlur={() => setFieldTouched('repeatPassword')}
                                keyboardType="default" secureTextEntry onChangeText={handleChange('repeatPassword')} />
                            {touched.password && <Text style={{ color: 'red' }}>{errors.repeatPassword}</Text>}
                            {signUpError && <Text style={{ color: 'red' }}>*{signUpError}</Text>}
                            <AppButton title='Signup' color={colors.primary}
                                textColor={colors.white} onPress={handleSubmit} />
                        </React.Fragment>
                    )}
                </Form>
            </View>
        </Screen >
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
export default SignupScreen;
