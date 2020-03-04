import React, {useState} from 'react';
import {Text, CardItem, Card, Content, Container, Body, Icon, Left, Right, Button, Thumbnail, Accordion, Item, View, ListItem as ListContainer} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import {AsyncImage} from '../components/AsynImage.js';
import { Video } from 'expo-av';
import {fetchPOST, fetchGET} from "../hooks/APIHooks";
import {mediaURL} from "../constants/UrlConst";
import PropTypes from 'prop-types';
import {AsyncStorage} from 'react-native';
import useCommentForm from '../hooks/CommentHooks';
import FormTextInput from '../components/FormTextInput';



const {height, width} = Dimensions.get('window');

const Single = (props) => {
    const token = AsyncStorage.getItem('userToken');
    
    const {Comment, setComment} = useContext(MediaContext);
    
    const [color, setColor] = useState('gray');
    
    const { navigation } = props;
    

    let user = navigation.getParam('userData', 'default value');
   //console.log(user.token);
    let file = navigation.getParam('file', 'default value');
    //console.log(file.file_id);
    let Title = 'Show More';
    const description = [
        { title: Title, content: file.description },
    ];



    const {
        handleComment,
        inputs,
        errors,
        setErrors,
        validateField,
      } = useCommentForm();


      const validationProperties = {
        comment: {comment: inputs.comment},
        };
      
    


    const favourites = async () => {
        try {
            
            let param = navigation.getParam('file', 'default value');

            let data = {
                "file_id": param.file_id,
            };
            const favour = await fetchPOST('favourites', data, user.token);
            console.log(favour);
            
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };


    const commenting = async () => {
        try {
            
            let param = navigation.getParam('file', 'default value');

            let data = {
                "file_id": param.file_id,
                "comment": inputs.comment
            };
            const comment = await fetchPOST('comments', data, user.token);
            console.log(comment);
            
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };


    const getcomments = async () => {
        try {
            
            let param = navigation.getParam('file', 'default value');

            let data = {
                "file_id": param.file_id,
               
            };
            const commentor = await fetchGET('comments/file/:id', data, user.token);
            const coms = commentor.comment;
            
            return coms;
            

            
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
                        <Button
                        transparent
                        onPress={favourites}>
                                <Icon active name="thumbs-up" />
                                <Text>Like</Text>
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
                
                <View>
            {loading ? (
                <Spinner/>
            ) : (
                <BaseList
                    dataArray={props.mode === 'all' ? media : Comment}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        
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
                    
                   
                
                </Card>
            </Content>
        </ListContainer>
                
                }
                />
            )}
        </View>


                <Card>
                        <CardItem>
                            <Right>
                            <Item>
                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.comment}
                            placeholder='Comment'
                            onChangeText={handleComment}
                            onEndEditing={() => {
                                
                                validateField(validationProperties.comment);
                              }}
                        />

                    </Item>
                    <Button block success onPress={()=>{
                        commenting();
                    }} title=''>
                        <Text>Comment</Text>
                    </Button>

                            </Right>
                        </CardItem>

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