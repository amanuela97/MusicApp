import React, {useState,useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {fetchModify} from "./APIHooks";
import {getUserMedia} from "./APIHooks";
import {MediaContext} from "../contexts/MediaContext";

const useModifyForm = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const {myMedia, setMyMedia} = useContext(MediaContext);


    const handleModifyTitleChange = (text) => {
        console.log('modifyTitleChangeDetected', text);
        setInputs((inputs) => ({
                ...inputs,
                title: text,
            }
        ));
    };

    const handleModifyDescriptionChange = (text) => {
        console.log('modifyDesCh', text);
        setInputs((inputs) => ({
            ...inputs,
            description: text,
        }));
    };

    const handleModify = async (navigation, file_id) => {
        try {
            let data = {};
            const token = await AsyncStorage.getItem('userToken');
            if (token !== null) {
                data = {
                    title: inputs.title,
                    description: inputs.description,
                };
            }
            const resp = await fetchModify('media', file_id, token, data);
            console.log('modify resp', resp);
            if (resp.message) {
                const result = await getUserMedia(token);
                setMyMedia(result);
                setLoading(false);
                navigation.goBack(null);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return {
        handleModifyTitleChange,
        handleModifyDescriptionChange,
        handleModify,
        inputs,
        errors,
        loading,
        setErrors,
        setInputs,
    };
};

export default useModifyForm;