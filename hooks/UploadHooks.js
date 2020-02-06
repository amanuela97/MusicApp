import React, {useState, useContext} from 'react';
import {MediaContext} from "../contexts/MediaContext";
import {fetchGET} from "./APIHooks";
import {AsyncStorage} from "react-native";
import validate from "validate.js";

const constraints = {
    title: {
        presence: {
            message: 'cannot be blank.',
        },
        length: {
            minimum: 5,
            message: 'must be at least 5 characters',
        },
    },
    description: {
        length: {
            minimum: 10,
            message: 'must be at least 10 characters',
        },
    },

};

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';



const useUploadForm = () => {

    const [image, setImage] = useState(null);
    const [media,setMedia] = useContext(MediaContext);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleTitleChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                title: text,
            }));
    };
    const handleDescriptionChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                description: text,
            }));
    };

    const handleUpload = async (localUri, navigation)=> {
        try{
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            if (type === 'image/jpg') type = 'image/jpeg';

            // Upload the image using the fetch and FormData APIs
            const formData = new FormData();
            formData.append('file', {uri: localUri, name: filename, type});
            formData.append('title', inputs.title);
            formData.append('description', inputs.description);

            const userToken = await AsyncStorage.getItem('userToken');

            //post data to api
            const fetchOptions = {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                    'x-access-token': userToken,
                },
            };

            const response = await fetch(apiUrl + 'media', fetchOptions);
            const json = await response.json();

            if (json.file_id){
                //upload successful
                const json = await fetchGET('media/all');
                const result = await Promise.all(json.files.map(async (item) => {
                    const tnResponse = await fetch(apiUrl + 'media/' + item.file_id);
                    return await tnResponse.json();
                }));

                setMedia(result);
                navigation.push('Home');
            }

        }catch (e) {
            console.log(e.message);
        }
    };

    const validateField = (attr) => {
        const attrName = Object.keys(attr).pop(); // get the only or last item from array
        const valResult = validate(attr, constraints);
        console.log(attr);
        console.log('valresultt', valResult);
        let valid = undefined;
        if (valResult !== undefined && valResult[attrName]) {
            valid = valResult[attrName][0]; // get just the first message
        }
        setErrors((errors) =>
            ({
                ...errors,
                [attrName]: valid,
                fetch: undefined,
            }));
    };

    const validateOnSend = (fields) => {
        for (const [key, value] of Object.entries(fields)) {
            console.log(key, value, 'uploadValidation');
            validateField(value);
        }

        return !(errors.title !== undefined ||
            errors.description !== undefined);
    };



    return {
        handleUpload,
        handleTitleChange,
        handleDescriptionChange,
        validateField,
        validateOnSend,
        inputs,
        errors,
        setErrors,
        setInputs,
        image,
        setImage
    };
};

export {useUploadForm};