import React, {useState,useContext} from 'react';
import {fetchDelete, fetchFormData, fetchPOST, fetchPut, getUserMedia} from "./APIHooks";
import {AsyncStorage} from "react-native";
import {MediaContext} from "../contexts/MediaContext";


const useUpdateHooks = () => {
    const [loading, setLoading] = useState(false);
    const [avatar,setAvatar] = useState(null);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const {setMyMedia} = useContext(MediaContext);

    const handleUpdateUsername = (text) => {
        console.log('updateUsername', text);
        setInputs((inputs) => ({
                ...inputs,
                username: text,
            }
        ));
    };


    const handleUpdateEmail = (text) => {
        console.log('updateE', text);
        setInputs((inputs) => ({
            ...inputs,
            email: text,
        }));
    };

    const handleUpdate = async (navigation,fileData) =>{
        setLoading(true);
        const userToken = await AsyncStorage.getItem('userToken');
        const userFromStorage = await AsyncStorage.getItem('user');
        // eslint-disable-next-line max-len
        const uData = JSON.parse(userFromStorage);
        try{
            if (fileData.avatar !== 'noPic') {
                const deleteOldAvatar = await fetchDelete('media', fileData.avatar_id, userToken);
                console.log(deleteOldAvatar);
            }

            const fd = new FormData();
            const filename = avatar.uri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            // fix jpg mimetype
            if (type === 'image/jpg') {
                type = 'image/jpeg';
            }
            fd.append('title', 'avatar');
            fd.append('file', {uri: avatar.uri, name: filename, type: type});
            const resp = await fetchFormData('media', fd, userToken);
            if (resp.message){
                const avatarTag = {
                    file_id: resp.file_id,
                    tag: 'avatar_' + fileData.userData.user_id,
                };
                const addTag = await fetchPOST('tags',avatarTag, userToken);
                if (addTag.message){
                    let username =  inputs.username  !== undefined ? inputs.username : uData.username;
                    let email = inputs.email !== undefined  ? inputs.email: uData.email;
                    console.log(username,email, 'fromHandleUpdate');
                    let userData = {
                        username: username.toString(),
                        email: email.toString(),
                    };
                    const response = await fetchPut('users',userToken,userData);
                    console.log(response);
                    if (response.message){
                        let data2 = [];
                        const data = await getUserMedia(userToken);
                        data.forEach(item => {
                            if(item.media_type === 'video'){
                                data2.push(item);
                            }
                        });
                        setMyMedia(data2);
                        setLoading(false);
                        navigation.push('Home');
                    }
                }
            }

        }catch (e) {
            console.log(e.message);
        }
    };

    return{
        errors,
        inputs,
        avatar,
        loading,
        setAvatar,
        setInputs,
        setErrors,
        handleUpdate,
        handleUpdateEmail,
        handleUpdateUsername,
    }

};

export default useUpdateHooks;