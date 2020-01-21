import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    AsyncStorage,
} from 'react-native';

const Login = (props) => { // props is needed for navigation
    const signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        props.navigation.navigate('App');
    };
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button title="Sign in!" onPress={
                () => {
                    signInAsync();
                }
            } />
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
});

// proptypes here

export default Login;