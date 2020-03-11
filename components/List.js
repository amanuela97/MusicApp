import React, {useContext, useEffect, useState} from 'react';
import {List as BaseList, Spinner, View} from "native-base";
import ListItem from "./ListItem";
import {MediaContext} from "../contexts/MediaContext";
import {getAllMedia, getUserMedia} from '../hooks/APIHooks.js';
import {AsyncStorage} from "react-native";
import PropTypes from 'prop-types';
import {fetchGET} from "../hooks/APIHooks";

const List = (props) => {
    const {media, setMedia, myMedia, setMyMedia, fav, setFav, searchMedia} = useContext(MediaContext);
    const [loading, setLoading] = useState(true);

    const getMedia = async (mode) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            let data = [];
            if (mode === 'all') {
                data = await getAllMedia();
                setMedia(data);
            } else if (mode === 'myFiles') {
                const data2 = await getUserMedia(token);
                data2.forEach(item => {
                    if(item.media_type === 'video' || item.media_type === 'audio'){
                        data.push(item);
                    }
                });
                setMyMedia(data);
            }else{
                const userFromStorage = await AsyncStorage.getItem('user');
                const uData = JSON.parse(userFromStorage);
                const favourites = await fetchGET('favourites', '', token);
                const data1 = await Promise.all(favourites.map(async (item) => {
                    if ( item.user_id === uData.user_id ){
                        const file = await fetchGET('media', item.file_id, token);
                        if (file.media_type === 'video'){
                            return file;
                        }else{
                          console.log('not vid');
                        }
                    }
                }));
                data1.forEach( f => {
                    if (f !== undefined){
                        data.push(f);
                    }
                });
                setFav(data);
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
            {loading === true &&
            <Spinner/>
            }
                <BaseList
                    dataArray={props.mode === 'all' ? media : (props.mode === 'fav' ? fav : (props.mode === 'myFiles' ? myMedia : searchMedia))}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        <ListItem
                        navigation={props.navigation}
                        singleMedia={item}
                        mode={props.mode}
                        getMedia={getMedia}
                    />}
                />
        </View>
        );
};

List.propTypes = {
    navigation: PropTypes.object,
    mode: PropTypes.string,
};
export default List;

