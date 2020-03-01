import React , {useEffect, useState} from 'react';
import {Container,Tabs,Tab,Text, Thumbnail, Fab, Icon, Title} from "native-base";
import MyFiles from '../views/MyFiles.js';
import Info from '../views/Info.js';
import {mediaURL} from "../constants/UrlConst";
import {fetchGET} from "../hooks/APIHooks";
import {AsyncStorage, ImageBackground} from 'react-native';


const Profile = (props) => {

    const [user, setUser] = useState({
        userData: {},
        avatar: '',
    });
    const [active, setActive] = useState(false);

    const userToState = async () => {
        try {
            let avatar = '';
            const userFromStorage = await AsyncStorage.getItem('user');
            // eslint-disable-next-line max-len
            const uData = JSON.parse(userFromStorage);
            const avatarPic = await fetchGET('tags', 'avatar_' + uData.user_id);
            //checking if user has an existing profile picture. if not add a placeholder image
            if(avatarPic[0] !== undefined){
                avatar = avatarPic[0].filename;
            }else{
                avatar = 'noPic';
            }
            setUser(() => (
                {
                    userData: uData,
                    avatar: avatar,
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
            <ImageBackground source={require('../assets/instruments.webp')} style={{alignItems: 'center', flex: 0, paddingTop: '9%'}}>
                <Title style={{color: 'white', marginBottom: '3%'}}>Profile</Title>
                {user.avatar !== 'noPic' &&
                <Thumbnail style={{width: 100, height: 100}} circle source={{uri: mediaURL + user.avatar}} />}
                {user.avatar === 'noPic' &&
                <Thumbnail circle source={require('../assets/background.png')} />}
                <Text style={{color: 'white', padding: 10}}>{user.userData.username}</Text>
            </ImageBackground>
            <Tabs>
                <Tab heading='Sounds' tabStyle={{backgroundColor: 'black'}}  activeTabStyle={{backgroundColor: 'black'}}>
                    <MyFiles navigation={props.navigation}/>
                </Tab>
                <Tab heading='Info' tabStyle={{backgroundColor: 'black'}}  activeTabStyle={{backgroundColor: 'black'}}>
                    <Info navigation={props.navigation} userInfo = {user}/>
                </Tab>
            </Tabs>
            <Fab
                active={active}
                direction="up"
                style={{ backgroundColor: 'gray' }}
                position="bottomRight"
                onPress={() => {
                    setActive(true);
                    props.navigation.navigate('Upload');
                }}>
                <Icon name="cloud-upload" />
            </Fab>
        </Container>
    );
};


export default Profile;