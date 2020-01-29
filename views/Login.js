import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Item,Button, Text, Title,Container, Content, Form} from 'native-base';
import PropTypes from "prop-types";
import FormTextInput from "../components/FormTextInput";
import {useSignUpForm, validation} from "../hooks/LoginHooks";
import {fetchPOST, fetchGET} from '../hooks/APIHooks.js';
import validate from "validate.js";

const Login = (props) => { // props is needed for navigation
    const [loginPage, setLoginPage] = useState(true);
    const {setError,errors,inputs,
        handleUsernameChange,
        handlePasswordChange,
        handleEmailChange,
        handleFullNameChange} = useSignUpForm();


    const signInAsync = async () => {
        try {
            const user = await fetchPOST('login', inputs);
            //console.log('user'+ user);
            await AsyncStorage.setItem('userToken', user.token);
            await AsyncStorage.setItem('user', JSON.stringify(user.user));
            //
            props.navigation.navigate('App');
        }catch (e) {
            console.log('signInAsync error: ' + e.message);
            setError(e.message);
        }
    };

    const registerAsync = async () => {
        try {
            const result = await fetchPOST('users', inputs);
            console.log('register', result);
            signInAsync();
        }catch (e) {
            console.log('registerAsync error: ', e.message);
            setError(e.message);
        }
    };

    const checkIfUserExists = async (username) => {
        try {
            let message ="Username " + username.toString() + " " + "is already in use.";
            const result = await fetchGET('users/username', username);
            if (result.available === false){
                setError((errors) =>
                    ({
                        ...errors,
                        username: message,
                    }))
            }
        }catch (e) {
            console.log('registerAsync error: ', e.message);
        }
    };

    const validateField= (attr, value)=> {
        try {
            let result = validate({[attr]: value}, validation);
            if ([attr][0] === 'confirmPassword'){
                console.log(inputs.password + ' ' + value);
                result = validate({'password': inputs.password ,[attr]: value}, validation);
            }
            console.log(result[attr] + "kk");
            let valid = undefined;
            if (result[attr]) {
                valid = result[attr][0];
                console.log('changed');
            }
            setError((errors) =>
                ({
                    ...errors,
                    [attr]: valid,
                }));
            console.log(errors[attr]);
        }catch (e) {
            console.log(e.message);
        }
    };


    return (
        <Container>
            <Content style={{marginTop: '6%'}}>
                { loginPage === true &&
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
                    }  title=''><Text>Sign in!</Text>
                    </Button>
                    <Button Success title='' onPress={()=>{
                        setLoginPage(false);
                    }}>
                        <Text>No account yet?</Text>
                    </Button>
                </Form>}

                { loginPage === false &&
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
                                onEndEditing={(evt) =>
                                    {
                                        const text = evt.nativeEvent.text;
                                        checkIfUserExists(text);
                                        validateField('username', inputs.username);
                                    }
                                }
                                error={errors.username}

                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='email'
                                onChangeText={handleEmailChange}
                                value={inputs.email}
                                onEndEditing={() =>
                                    {
                                        validateField('email', inputs.email);
                                    }
                                }
                                error={errors.email}
                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='fullName'
                                onChangeText={handleFullNameChange}
                                value={inputs.full_name}
                                onEndEditing={() =>
                                    {
                                        validateField('full_name', inputs.full_name);
                                    }
                                }
                                error={errors.full_name}

                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='password'
                                secureTextEntry={true}
                                onChangeText={handlePasswordChange}
                                value={inputs.password}
                                onEndEditing={() =>
                                    {
                                        validateField('password', inputs.password);
                                    }
                                }
                                error={errors.password}
                            />
                        </Item>
                        <Item underline>
                            <FormTextInput
                                autoCapitalize='none'
                                placeholder='confirm password'
                                secureTextEntry={true}
                                //onChangeText={handlePasswordChange}
                                //value={inputs.password}
                                onEndEditing={(evt) =>
                                    {
                                        const text = evt.nativeEvent.text;
                                        validateField('confirmPassword', text);
                                    }
                                }
                                error={errors.confirmPassword}


                            />
                        </Item>
                        <Button info onPress={
                            () => {
                              registerAsync();
                            }
                        }  title='Register!'><Text>Register!</Text>
                        </Button>
                        <Button Success title='' onPress={()=>{
                            setLoginPage(true);
                        }}>
                            <Text>Already have an account?</Text>
                        </Button>
                </Form>}
            </Content>
        </Container>
    );
};


// proptypes here
Login.protTypes = {
    navigation: PropTypes.object,
};

export default Login;


