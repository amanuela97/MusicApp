import React, {useContext, useEffect, useState} from 'react';
import {List as BaseList, Spinner,View} from "native-base";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia, getUserMedia, getUserFavourites} from '../hooks/APIHooks.js';
import {AsyncStorage} from "react-native";
import PropTypes from 'prop-types';

const List = (props) => {
    const {media, setMedia, myMedia, setMyMedia, favourites, setfavourites} = useContext(MediaContext);
    const [loading, setLoading] = useState(true);

    const getMedia = async (mode) => {
        try {
            let data = [];
            if (mode === 'all') {
                data = await getAllMedia();
                setMedia(data);
            } else if (mode === 'myfavourites') {
                const token = await AsyncStorage.getItem('userToken');
                const data3 = await getUserFavourites(token);
                data3.forEach(item => {
                    //if(item.media_type === 'video' || item.media_type === 'audio'){
                        data.push(item);
                    //}
                });
                setfavourites(data);
            }  else {
                const token = await AsyncStorage.getItem('userToken');
                const data2 = await getUserMedia(token);
                data2.forEach(item => {
                    if(item.media_type === 'video' || item.media_type === 'audio'){
                        data.push(item);
                    }
                });
                setMyMedia(data);
            }
            setLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    };


    useEffect(() => {
        getMedia(props.mode);
    }, []);


    return(
        <View>
            {loading ? (
                <Spinner/>
            ) : (
                <BaseList
                    dataArray={props.mode === 'all' ? media : myMedia}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        <ListItem
                        navigation={props.navigation}
                        singleMedia={item}
                        mode={props.mode}
                        getMedia={getMedia}
                    />}
                />
            )}
        </View>
        );
};

List.propTypes = {
    navigation: PropTypes.object,
    mode: PropTypes.string,
};
export default List;

