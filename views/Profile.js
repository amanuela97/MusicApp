import React, {useEffect,useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Body, Card, CardItem, Container, Content, Icon, Left, Text, Button} from "native-base";
import {fetchGET} from '../hooks/APIHooks.js';
import {AsyncImage} from '../components/AsynImage.js';

const mediaURL= "http://media.mw.metropolia.fi/wbma/uploads/";

const Profile = (props) => {

    const [user, setUser] = useState({
        userData: {},
        avatar: '',
    });

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

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };

    return (
        <Container>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Icon name='person' />
                            <Body>
                                <Text style={{color: 'blue'}}>Username:  {user.userData.username}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Body>
                            <AsyncImage
                                   style={{height: 300, width: 320, flex: 1}}
                                   source={{uri: mediaURL + user.avatar }}
                                   placeholderColor='white'
                            />
                            <Text>FullName: {user.userData.full_name}</Text>
                            <Text>email: {user.userData.email}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={{flex: 0}}>
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


export default Profile;