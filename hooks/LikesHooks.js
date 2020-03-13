import React, {useState} from 'react';
import {fetchDelete, fetchGET, fetchPOST} from "./APIHooks";
import {AsyncStorage} from "react-native";


const useLikesHooks = () => {

    const [color, setColor] = useState('gray');
    const [likes, setLikes] = useState(0);

    const updateLikesCount = async (fileId, token) => {
        console.log('updateLikes');
        const logged = await AsyncStorage.getItem('user');
        const loggedUser = JSON.parse(logged);

        //set the number of favourites or likes
        const numOfLikes = await fetchGET('favourites/file', fileId, token);
        let num = 0;
        if(numOfLikes.length > 0){
            numOfLikes.forEach((like)=>{
                num++;
                if(like.user_id === loggedUser.user_id){
                    setColor('red');
                    console.log('in');
                }
            });
        }
        setLikes(num);
    };



    const updateLikesColor = async (fileId, token) => {
        console.log('updateColor');
        try {
            let data = {
                "file_id": fileId,
            };
            if(color === 'gray') {
                const like = await fetchPOST('favourites',data, token);
                console.log(like);
            }else{
                const dislike = await fetchDelete('favourites/file',fileId, token);
                console.log(dislike);
            }
            let result = color === 'gray' ? 'red' : 'gray';
            setColor(result);
        } catch (e) {
            console.log('Profile error: ', e.message);
        }
    };


    return{
        updateLikesColor,
        updateLikesCount,
        color,
        likes,
    }

};

export default useLikesHooks;