import React,{useState, useEffect} from 'react';
import {
    List as BaseList, ListItem as ListContainer,
    Spinner,
    View,
    Left, Thumbnail, Body, Text, Card, CardItem, Item, Input, Right, Button
} from "native-base";
import {TouchableOpacity} from "react-native";
import {mediaURL} from "../constants/UrlConst";
import {fetchGET,fetchPOST} from "../hooks/APIHooks";


const Comment = (props) => {
    const [loading, setLoading] = useState(true);
    const [comments,setComments] = useState([]);
    const [inputs, setInputs] = useState({});


    const getComments = async () =>{
        try {
            let avatar = '';
            let allComments = [];
            const request = await fetchGET('comments/file', props.file.file_id);
            request.reverse();
            if (request[0] !== undefined) {
                for (const comment of request) {
                    const user = await fetchGET('users', comment.user_id, props.user.token);
                    const avatarPic = await fetchGET('tags', 'avatar_' + comment.user_id);
                    if (avatarPic[0] !== undefined) {
                        avatar = avatarPic[0].filename;
                    } else {
                        avatar = 'noPic';
                    }
                    let singleComment = {
                        comment: comment.comment,
                        user: user.username,
                        avatar: avatar,
                    };
                    allComments.push(singleComment);
                }
            }
            setComments(allComments);
            setLoading(false);
        }catch (e) {
            console.log('getComments', e);
        }
    };

    const postComment = async ()=>{
        try {
            let data = {
                file_id: props.file.file_id,
                comment: inputs.comment,
            };
            const request = fetchPOST('comments', data, props.user.token);
            if (request.message){
               await getComments();
            }
        }catch (e) {
            console.log('postComment', e);
        }
    };

    const handleCommentChange = (text) => {
        console.log('commentChangeDetected', text);
        setInputs((inputs) =>
            ({
                ...inputs,
                comment: text,
            }));
    };

    useEffect(()=>{
        getComments();
    },[comments]);

    return(
      <View>
          <Card style={{width: '100%'}}>
              <CardItem>
                  <Item rounded >
                      <Left>

                          <Input
                              autoCapitalize='none'
                              value={inputs.comment}
                              placeholder='comment'
                              onChangeText={handleCommentChange}
                          />
                      </Left>
                  </Item>
                  <Item>
                      <Right>
                          <Button
                              transparent
                              title=''
                              onPress={async ()=>{
                                  await postComment();
                              }}>
                              <Text>Post</Text>
                          </Button>
                      </Right>
                  </Item>
              </CardItem>
          </Card>
          {loading ? (
              <Spinner/>
          ) : (
              <BaseList
                  dataArray={comments}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) =>
                      <ListContainer>
                          <Left>
                              <TouchableOpacity>
                              {item.avatar !== 'noPic' &&
                              <Thumbnail source={{uri: mediaURL + item.avatar}} />}
                              {item.avatar === 'noPic' &&
                              <Thumbnail source={require('../assets/background.png')} />}
                              </TouchableOpacity>
                              <Body>
                                  <Text style={{color: 'blue'}}>{item.user}: {item.comment}</Text>
                              </Body>
                          </Left>
                      </ListContainer>}
              />
          )}
      </View>
  );
};

export default Comment;