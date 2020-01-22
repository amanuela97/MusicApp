import React, {useContext} from 'react';
import {FlatList} from "react-native";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia} from '../hooks/APIHooks.js';

const List = (props) => {
    const [media, setMedia] = useContext(MediaContext);
    const [data, loading] = getAllMedia();
    //console.log('List',  loading);
    setMedia(data);
    return(
        <FlatList
            data={media}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ListItem singleMedia={item} navigation={props.navigation} />}
        />
        );
};


export default List;
