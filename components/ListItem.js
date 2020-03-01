import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ListItem as ListContainer, Thumbnail, Text, Left, Body, Right, Button, Icon, CardItem, Card, Content} from "native-base";
import {AsyncStorage, Image, TouchableOpacity} from 'react-native';
import {mediaURL} from "../constants/UrlConst";
import {fetchGET, fetchPOST, fetchDelete} from "../hooks/APIHooks";


const ListItem = (props) => {
    const [color, setColor] = useState('gray');
    const [likes, setLikes] = useState(0);
    const [user, setUser] = useState({
        userData: {},
        token: '',
        userProfile: '',
        dateAdded: '',
        timeAdded: '',
        cover: '',
    });

    const userInfo = async () => {
        try {
            let avatar = '';
            let date = '';
            let time = '';
            let cover = '';

            //fetching user info. Also fetching profile picture and file cover if it has been set
            let param = props.singleMedia.user_id;
            const logged = await AsyncStorage.getItem('user');
            const loggedUser = JSON.parse(logged);
            const userToken = await AsyncStorage.getItem('userToken');
            const user = await fetchGET('users', param, userToken);
            const avatarPic = await fetchGET('tags', 'avatar_' + param);
            const fileCover = await fetchGET('tags', 'cover_' + props.singleMedia.file_id);

            //set the number of favourites or likes
            const numOfLikes = await fetchGET('favourites/file', props.singleMedia.file_id, userToken);
            let num = 0;
            if(numOfLikes.length > 0){
                numOfLikes.forEach((like)=>{
                    num++;
                    if(like.user_id === loggedUser.user_id){
                        setColor('red');
                    }
                });
            }
            setLikes(num);

            //setting up the date and time file was added
            date = props.singleMedia.time_added.slice(0,10);
            time = props.singleMedia.time_added.slice(11,19);

            //checking if user has an existing profile picture. if not add a placeholder image
            if(avatarPic[0] !== undefined){
                avatar = avatarPic[0].filename;
            }else{
                avatar = 'noPic';
            }

            //checking if user has an existing cover/thumbnail. if not add a placeholder image
            if(fileCover[0] !== undefined){
                cover = fileCover[0].filename;
            }else {
                cover = 'noCover';
            }

            setUser(() => (
                {
                    userData: user,
                    token: userToken,
                    userProfile: avatar,
                    dateAdded: date,
                    timeAdded: time,
                    cover: cover,
                }));
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };

    const updateLikesColor = async () => {
        try {
            let id = props.singleMedia.file_id;
            let data = {
                "file_id": props.singleMedia.file_id,
            };
            if(color === 'gray') {
                const like = await fetchPOST('favourites',data, user.token);
                console.log(like);
            }else{
                const dislike = await fetchDelete('favourites/file',id, user.token);
                console.log(dislike);
            }
            let result = color === 'gray' ? 'red' : 'gray';
            setColor(result);
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };


    useEffect(() => {
        userInfo();
    },[likes,color]);

    return (
        <ListContainer>
            <Content>
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
                                <Text>{props.singleMedia.title}</Text>
                                <Text note>{user.userData.username}</Text>
                            </Body>
                        </Left>
                        {props.mode === 'myFiles' &&
                        <Right>
                            <TouchableOpacity>
                                <Button warning transparent  onPress={()=> props.navigation.push('Modify', {fileData: props.singleMedia})} title=''>
                                    <Icon
                                        style={{fontSize: 25}}
                                        active
                                        name='create'/>
                                </Button>
                                <Button
                                    danger
                                    transparent
                                    onPress={async () => {
                                        const token = await AsyncStorage.getItem('userToken');
                                        const del = await fetchDelete('media', props.singleMedia.file_id,
                                            token);
                                        console.log('delete', del);
                                        if(del.message){
                                            props.getMedia();
                                        }
                                    }}
                                    title=''>
                                    <Icon
                                        style={{fontSize: 25}}
                                        active
                                        name='trash'/>
                                </Button>
                            </TouchableOpacity>
                        </Right>
                            }
                    </CardItem>
                    <TouchableOpacity onPress={()=>{props.navigation.push('Single', {
                        file: props.singleMedia,
                        userData: user,
                        heartColor: color,
                        likes: likes,
                    });
                    }}>
                        <CardItem cardBody>
                                {props.singleMedia.media_type === 'video' && user.cover === 'noCover' &&
                                <Image source={{uri: mediaURL + props.singleMedia.screenshot}} style={{height: 200, width: null, flex: 1}}/>}
                                { props.singleMedia.media_type === 'video' && user.cover !== 'noCover' &&
                                <Image source={{uri: mediaURL + user.cover}} style={{height: 200, width: null, flex: 1}}/>}
                                {props.singleMedia.media_type === 'audio' && user.cover === 'noCover' &&
                                <Image source={require('../assets/background.png')} style={{height: 200, width: null, flex: 1}}/>}
                                {props.singleMedia.media_type === 'audio' && user.cover !== 'noCover' &&
                                <Image source={{uri: mediaURL + user.cover}} style={{height: 200, width: null, flex: 1}}/>}
                        </CardItem>
                     </TouchableOpacity>
                    <CardItem>
                        <Left>
                            <Button transparent  title='' onPress={updateLikesColor}>
                                <Icon style={{fontSize: 25, color: color}}
                                      active name="heart" />
                                <Text>{likes} Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                                <Icon
                                    style={{fontSize: 25}}
                                    active name="chatbubbles" />
                                    <Text>4 Comments</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text>{user.timeAdded}</Text>
                            <Text>{user.dateAdded}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        </ListContainer>
    );
};

ListItem.propTypes = {
    singleMedia: PropTypes.object,
    navigation: PropTypes.object,
    mode: PropTypes.string,
    getMedia: PropTypes.func,
};

export default ListItem;