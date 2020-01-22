import React, {useEffect,useState} from 'react';
import {StyleSheet, View, Text,AsyncStorage,Button} from 'react-native';

const Profile = (props) => {

    const [user, setUser] = useState({});

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };

    const getInfo = async () => {
        const user = await AsyncStorage.getItem('user');
        setUser(JSON.parse(user));
    };

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>FullName: {user.full_name}</Text>
            <Text>User: {user.username} </Text>
            <Text>email: {user.email}</Text>
            <Button title="Logout!" onPress={signOutAsync} />
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

export default Profile;