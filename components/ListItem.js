import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ListItem as ListContainer, Thumbnail, Text, Left, Body, Right, Button, Icon, CardItem, Card, Content} from "native-base";
import {AsyncStorage, Image, TouchableOpacity} from 'react-native';
import {mediaURL} from "../constants/UrlConst";
import {fetchGET, fetchDelete} from "../hooks/APIHooks";
import useLikesHooks from "../hooks/LikesHooks";


const ListItem = (props) => {
    const [user, setUser] = useState({
        userData: {},
        token: '',
        userProfile: '',
        dateAdded: '',
        timeAdded: '',
        cover: '',
    });
    const {updateLikesCount,updateLikesColor,likes,color} = useLikesHooks();

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

    const deleteFile = async ()=> {
        try {
            if (user.cover !== 'noCover') {
                const delete_file = await fetchDelete('media', props.singleMedia.file_id,user.token);
                const delete_cover = await fetchDelete('media', user.cover, user.token);
                console.log('delete_cover', delete_file);
                console.log('delete', delete_cover);
                if (delete_file.message && delete_cover.message) {
                    props.getMedia();
                }
            }else{
                const delete_file = await fetchDelete('media', props.singleMedia.file_id,user.token);
                console.log('delete_cover', delete_file);
                if (delete_file.message) {
                    props.getMedia();
                }
            }
        }catch (e) {
            console.log(e.message);
        }
    };


    useEffect( () => {
         userInfo();
         updateLikesCount(props.singleMedia.file_id, user.token);
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
                                       await deleteFile()
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
                            <Button transparent  title='' onPress={ async ()=>{
                                await updateLikesColor(props.singleMedia.file_id, user.token);
                            }}>
                                <Icon style={{fontSize: 25, color: color}}
                                      active name="heart" />
                                <Text>{likes} Likes</Text>
                            </Button>
                        </Left>
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