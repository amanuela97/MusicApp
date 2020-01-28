import React from 'react';
import PropTypes from 'prop-types';
import {ListItem as ListContainer, Thumbnail, Text, Left, Body, Right, Button} from "native-base";

const mediaURL= "http://media.mw.metropolia.fi/wbma/uploads/";

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
                <Button info onPress={()=>{props.navigation.push('Single', {
                    file: props.singleMedia.filename,
                    title: props.singleMedia.title,
                    description: props.singleMedia.description,
                });
                }} title='VIEW'>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListContainer>
    );
};

ListItem.propTypes = {
    singleMedia: PropTypes.object,
};

export default ListItem;