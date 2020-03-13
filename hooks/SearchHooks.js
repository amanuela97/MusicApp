import React, {useState,useContext} from 'react';
import {AsyncStorage} from "react-native";
import {fetchPOST, fetchGET} from "./APIHooks";
import {MediaContext} from "../contexts/MediaContext";


const useSearchHooks = () => {
    const [input,setInput] = useState('');
    const {searchMedia, setSearchMedia} = useContext(MediaContext);

    const handleSearchChange  = (text)=>{
        console.log('handle search change', text);
        setInput(text);
    };

    const handleSearch = async () =>{
        if (input !== '') {
            const token = await AsyncStorage.getItem('userToken');
            let data = {
                'title': input.toString()
            };
            const search = await fetchPOST('media/search', data, token);
            const searchData = [];
            for (const file of search) {
                if (file.media_type === 'video') {
                    const tags = await fetchGET('tags/file', file.file_id, token);
                    for (const tag of tags) {
                        if (tag.tag === 'mussy') {
                            const file = await fetchGET('media', tag.file_id);
                            searchData.push(file);
                        }
                    }
                }
            }
            setSearchMedia(searchData);
        }else{
            setSearchMedia([]);
        }
    };



    return{
        input,
        handleSearchChange,
        handleSearch,
    }

};

export default useSearchHooks;