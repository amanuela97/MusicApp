import React, {useEffect, useState} from 'react';
import {Text,CardItem, Card, Content, Container, Body, Icon, Left, Right, Button} from 'native-base';
import {AsyncStorage, Dimensions} from 'react-native';
import {AsyncImage} from '../components/AsynImage.js';
import { Video } from 'expo-av';
import {fetchGET, fetchPOST} from "../hooks/APIHooks";
import {mediaURL} from "../constants/UrlConst";

const {height, width} = Dimensions.get('window');

const Single = (props) => {
    const [user, setUser] = useState({
        userData: {},
        token: '',
    });
    const [color, setColor] = useState('gray');
    const { navigation } = props;
    let fileData = navigation.getParam('fileData', 'default value');
    const userInfo = async () => {
        try {
            let param = fileData.user_id;
            const userToken = await AsyncStorage.getItem('userToken');
            const user = await fetchGET('users', param, userToken);
            setUser(() => (
                {
                    userData: user,
                    token: userToken,
                }));

        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };

    const favourites = async () => {
        try {
            let param = navigation.getParam('fileId', 'default value');
            let data = {
                "file_id": param,
            };
            const favour = await fetchPOST('favourites',data, user.token);
            console.log(favour);
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };

    useEffect(() => {
        userInfo();
    }, []);

    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <Left>
                            <Icon name='person' />
                            <Body>
                                <Text style={{color: 'blue'}}>Username:  {user.userData.username}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        { fileData.media_type === 'image' &&
                        <AsyncImage
                            style={{height: 320, width: 320}}
                            source={{
                                uri: mediaURL + fileData.filename
                            }}
                            placeholderColor='white'
                        />}
                        {fileData.media_type === 'video' &&
                        <Video
                            source={{ uri: fileData.filename }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay={false}
                            isLooping={false}
                            useNativeControls={true}
                            style={{ width: width-35, height: height/3 }}
                        />}
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name= 'image' />
                            <Body>
                                <Text>{fileData.title}</Text>
                                <Text>
                                    {fileData.description}
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Button style={{backgroundColor: 'lightgray'}} title={''} onPress={()=>{
                                if (color === 'gray'){
                                    favourites();
                                    setColor('red');
                                }else{
                                    setColor('gray');
                                }
                            }}>
                                <Icon style={{color: color, fontSize: 30}} name='heart' />
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
};

export default Single;