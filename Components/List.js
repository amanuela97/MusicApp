import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from "react-native";
import ListItem from "./ListItem";


const List = (props) => {
    console.log(props);
    return(
        <FlatList
            data={props.mediaArray}
            renderItem={({item}) => <ListItem singleMedia={item} />}
        />
        );
};

List.propTypes = {
    mediaArray: PropTypes.array,
};

export default List;
