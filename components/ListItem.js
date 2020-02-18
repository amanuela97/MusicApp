import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as ListContainer, Thumbnail, Text, Left, Body, Right, Button, Icon} from "native-base";
import {AsyncStorage} from 'react-native';
import {fetchDelete} from '../hooks/APIHooks.js';
import {mediaURL} from "../constants/UrlConst";


const ListItem = (props) => {
    return (
        <ListContainer thumbnail>
            <Left>
                <Thumbnail square source={{ uri: mediaURL + props.singleMedia.thumbnails.w160 }} />
            </Left>
            <Body>
                <Text>{props.singleMedia.title}</Text>
                <Text note numberOfLines={1}>{props.singleMedia.description}</Text>
            </Body>
            <Right>
                <Button info onPress={()=>{props.navigation.push('Single', {fileData: props.singleMedia})}} title='VIEW'>
                    <Icon name='eye' />
                </Button>
                {props.mode === 'myFiles' &&
                <>
                    <Button full warning onPress={()=> props.navigation.push('Modify', {fileData: props.singleMedia})} title=''>
                        <Icon name='create'/>
                    </Button>
                    <Button
                        full
                        danger
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
                        <Icon name='trash'/>
                    </Button>
                </>
                }
            </Right>
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