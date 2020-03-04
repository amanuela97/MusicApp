import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ListItem as ListContainer, Thumbnail, Text, Left, Body, Right, Button, Icon, CardItem, Card, Content} from "native-base";
import {AsyncStorage, Image, TouchableOpacity} from 'react-native';
import {fetchDelete} from '../hooks/APIHooks.js';
import {mediaURL} from "../constants/UrlConst";
import {AsyncImage} from "./AsynImage";
import {fetchGET} from "../hooks/APIHooks";


const ListItem = (props) => {

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
            const userToken = await AsyncStorage.getItem('userToken');
            const user = await fetchGET('users', param, userToken);
            const avatarPic = await fetchGET('tags', 'avatar_' + param);
            const fileCover = await fetchGET('tags', 'cover_' + props.singleMedia.file_id);

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

    useEffect(() => {
        userInfo();
    }, []);

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
                    </CardItem>
                    <TouchableOpacity onPress={()=>{props.navigation.push('Single', {
                        file: props.singleMedia,
                        userData: user,
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