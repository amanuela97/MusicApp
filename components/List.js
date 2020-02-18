import React, {useContext, useEffect, useState} from 'react';
import {List as BaseList, Spinner,View} from "native-base";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia, getUserMedia} from '../hooks/APIHooks.js';
import {AsyncStorage} from "react-native";
import PropTypes from 'prop-types';

const userData = [
    {
    "file_id": 64,
    "filename": "2c389bce3b68ffa2403df1aa9b6c9240.jpg",
    "filesize": 4264878,
    "title": "peep hole",
    "description": "illusion????",
    "user_id": 24,
    "media_type": "image",
    "mime_type": "image/jpeg",
    "time_added": "2020-02-04T19:57:24.000Z",
    "thumbnails": {
        "w640": "2c389bce3b68ffa2403df1aa9b6c9240-tn640.png",
        "w320": "2c389bce3b68ffa2403df1aa9b6c9240-tn320.png",
        "w160": "2c389bce3b68ffa2403df1aa9b6c9240-tn160.png"
    }
    },
];

const List = (props) => {
    const {media, setMedia, myMedia, setMyMedia} = useContext(MediaContext);
    const [loading, setLoading] = useState(true);

    const getMedia = async (mode) => {
        try {
            let data = [];
            if (mode === 'all') {
                data = await getAllMedia();
                setMedia(data);
            } else {
                const token = await AsyncStorage.getItem('userToken');
                data = await getUserMedia(token);
                //data = userData;
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

