import React, {useContext} from 'react';
//import PropTypes from 'prop-types';
import {FlatList} from "react-native";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia} from '../hooks/APIHooks.js';

const List = () => {
    const [media, setMedia] = useContext(MediaContext);
    const [data, loading] = getAllMedia();
    console.log('List', data, loading);
    setMedia(data);
    return(
        <FlatList
            data={media}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ListItem singleMedia={item} />}
        />
        );
};

/*List.propTypes = {
    mediaArray: PropTypes.array,
};*/

export default List;
