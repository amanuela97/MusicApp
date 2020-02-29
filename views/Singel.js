import React, {useState} from 'react';
import {Text, CardItem, Card, Content, Container, Body, Icon, Left, Right, Button, Thumbnail, Accordion} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import {AsyncImage} from '../components/AsynImage.js';
import { Video } from 'expo-av';
import {fetchPOST} from "../hooks/APIHooks";
import {mediaURL} from "../constants/UrlConst";

const {height, width} = Dimensions.get('window');

const Single = (props) => {
    const [color, setColor] = useState('gray');
    const { navigation } = props;
    let user = navigation.getParam('userData', 'default value');
    let file = navigation.getParam('file', 'default value');
    let Title = 'Show More';
    const description = [
        { title: Title, content: file.description },
    ];


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


    return (
        <Container>
                <Card>
                    <CardItem>
                        <Left>
                            <TouchableOpacity>
                                {user.userProfile !== 'noPic' &&
                                <Thumbnail source={{uri: mediaURL + user.userProfile}} />}
                                {user.userProfile === 'noPic' &&
                                <Thumbnail source={require('../assets/background.png')} />}
                            </TouchableOpacity>
                            <Body>
                                <Text style={{color: 'blue'}}>Artist: {user.userData.username}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <Card>
                    <Body>
                        <Text style={{color: 'blue'}}>{file.title}</Text>
                    </Body>
                    <CardItem>
                        { file.media_type === 'audio' &&
                        <AsyncImage
                            style={{height: 320, width: 320}}
                            source={{
                                uri: ''
                            }}
                            placeholderColor='white'
                        />}
                        {file.media_type === 'video' &&
                        <Video
                            source={{ uri: mediaURL + file.filename }}
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
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>4 Comments</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text>{user.timeAdded}</Text>
                            <Text>{user.dateAdded}</Text>
                        </Right>
                    </CardItem>
                    {file.descriptor !== '' &&
                    <Accordion dataArray={description} expanded={1}/>}
                </Card>
        </Container>
    );
};

/*<CardItem>
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
                    </CardItem>*/

export default Single;