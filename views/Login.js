import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Item,Button, Text, Title,Container, Content, Form, Header} from 'native-base';
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
        <Container>
            <Content style={{marginTop: '6%'}}>
                <Form>
                    <Title>
                        <Text style={{textAlign: 'center', fontWeight: 'bold' , fontSize: 24}}>Login</Text>
                    </Title>
                    <Item underline>
                        <FormTextInput
                            autoCapitalize='none'
                            placeholder='username'
                            onChangeText={handleUsernameChange}
                            value={inputs.username}
                        />
                    </Item>
                    <Item underline>
                        <FormTextInput
                            autoCapitalize='none'
                            placeholder='password'
                            secureTextEntry={true}
                            onChangeText={handlePasswordChange}
                            value={inputs.password}
                        />
                    </Item>
                    <Button info onPress={
                        () => {
                            signInAsync();
                        }
                    }  title='Sign in!'><Text>Sign in!</Text>
                    </Button>
                </Form>
                <Form>
                    <Title>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>Register</Text>
                    </Title>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='username'
                                onChangeText={handleUsernameChange}
                                value={inputs.username}
                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='email'
                                onChangeText={handleEmailChange}
                                value={inputs.email}

                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='fullname'
                                onChangeText={handleFullNameChange}
                                value={inputs.full_name}

                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='password'
                                secureTextEntry={true}
                                onChangeText={handlePasswordChange}
                                value={inputs.password}

                            />
                        </Item>
                        <Button info onPress={
                            () => {
                                registerAsync();
                            }
                        }  title='Register!'><Text>Register!</Text>
                        </Button>
                        <Text>{error}</Text>
                </Form>
            </Content>
        </Container>
    );
};


// proptypes here
Login.protTypes = {
    navigation: PropTypes.object,
};

export default Login;


