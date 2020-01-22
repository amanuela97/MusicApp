import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    AsyncStorage,
} from 'react-native';
import PropTypes from "prop-types";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";
import {login,register} from '../hooks/APIHooks.js';

const Login = (props) => { // props is needed for navigation
    const [error, setError] = useState('');
    const {inputs,
        handleUsernameChange,
        handlePasswordChange,
        handleEmailChange,
        handleFullNameChange} = useSignUpForm();

    const signInAsync = async () => {
        try {
            const user = await login(inputs);
            console.log('login', user);
            await AsyncStorage.setItem('userToken', user.token);
            await AsyncStorage.setItem('user', JSON.stringify(user.user));
            props.navigation.navigate('App');
        }catch (e) {
            console.log(e.message);
        }
    };

    const registerAsync = async () => {
        try {
            const result = await register(inputs);
            console.log('Register', result);
            if(!result.error ){
                signInAsync();
            }else{
                setError('Account not created!')
            }
        }catch (e) {
            console.log(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text>Login</Text>
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='username'
                    onChangeText={handleUsernameChange}
                    value={inputs.username}
                />
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={handlePasswordChange}
                    value={inputs.password}
                />
                <Button title="Sign in!" onPress={
                    () => {
                        signInAsync();
                    }
                } />
            </View>

            <View style={styles.form}>
            <Text style={{marginTop: 20}}>Register</Text>
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='username'
                    onChangeText={handleUsernameChange}
                    value={inputs.username}
                />
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='email'
                    onChangeText={handleEmailChange}
                    value={inputs.email}

                />
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='fullname'
                    onChangeText={handleFullNameChange}
                    value={inputs.full_name}

                />
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={handlePasswordChange}
                    value={inputs.password}

                />
                <Button title="Register!" onPress={
                    () => {
                        registerAsync();
                    }
                } />
                <Text>{error}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    form:{
        width: '60%',
        marginBottom: 20,
        marginTop: 10,
    },

});

// proptypes here
Login.protTypes = {
    navigation: PropTypes.object,
};

export default Login;


