import React, {useEffect} from 'react';
import {
    Text,
    CardItem,
    Card,
    Container,
    Body,
    Icon,
    Left,
    Right,
    Button,
    Thumbnail,
    Accordion,
} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import { Video } from 'expo-av';
import {mediaURL} from "../constants/UrlConst";
import useLikesHooks from "../hooks/LikesHooks";
import useAudioPlayer from "../components/AudioPlayer";

const {height, width} = Dimensions.get('window');

const Single = (props) => {
    const {updateLikesCount,updateLikesColor,likes,color} = useLikesHooks();
    const {playing,startPausePlay} = useAudioPlayer();
    const { navigation } = props;
    let user = navigation.getParam('userData', 'default value');
    let file = navigation.getParam('file', 'default value');
    let Title = 'Show More';
    const description = [
        { title: Title, content: file.description },
    ];


    useEffect( () => {
        updateLikesCount(file.file_id, user.token);
    },[likes,color]);

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
                        <Body style={{flex:1, alignItems:'center', padding:'5%'}}>
                            <Text style={{paddingBottom: '5%'}}>{file.title}</Text>
                            <Button small  title='' onPress={async () =>{
                                await startPausePlay(file);
                            }}>
                                <Icon name={playing ? 'pause' : 'play'}/>
                            </Button>
                        </Body>
                        }
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
                            <Button transparent  title='' onPress={ async ()=>{
                                await updateLikesColor(file.file_id, user.token);
                            }}>
                                <Icon style={{fontSize: 25, color: color}}
                                      active name="heart" />
                                <Text>{likes} Likes</Text>
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

export default Single;