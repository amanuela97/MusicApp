import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {Text, CardItem, Card, Content, Container, Body, Icon, Left, Right, Button} from 'native-base';
import {fetchGET} from "../hooks/APIHooks";



const Info = (props) => {

    const [user, setUser] = useState({
        userData: {},
        avatar: '',
    });

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };

    const userToState = async () => {
        try {
            const userFromStorage = await AsyncStorage.getItem('user');
            // eslint-disable-next-line max-len
            const uData = JSON.parse(userFromStorage);
            const avatarPic = await fetchGET('tags', 'avatar_' + uData.user_id);
            console.log('aPic', avatarPic[0].filename);
            setUser(() => (
                {
                    userData: uData,
                    avatar: avatarPic[0].filename,
                }));
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };


    useEffect(() => {
        userToState();
    }, []);

    return (
        <Container>
          <Content>
            <Card>
                <CardItem>
                    <Body>
                        <Text>FullName: {user.userData.full_name}</Text>
                        <Text>email: {user.userData.email}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Button
                        style={{width: '100%'}}
                        title="Logout!"
                        onPress={signOutAsync}>
                        <Body>
                            <Text style={{color: 'white'}}>Logout</Text>
                        </Body>
                    </Button>
                </CardItem>
            </Card>
          </Content>
        </Container>
    );
};


export default Info;