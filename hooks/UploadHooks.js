import {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {fetchFormData, getAllMedia, fetchPOST} from './APIHooks';

const useUploadForm = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

    const handleUpload = async (cover,video, navigation, setMedia) => {
        setLoading(true);
        try {
            const cd = new FormData();
            const fd = new FormData();
            const token = await AsyncStorage.getItem('userToken');
            if(cover !== null && video !== null) {
                const filename = cover.uri.split('/').pop();
                const filename2 = video.uri.split('/').pop();
                let videoType = '';
                let extension = filename2.substr(filename2.length-3);
                if(extension.toString() === 'mp4'){
                    videoType = 'video/mp4';
                }else if (extension.toString() === 'mov'){
                    videoType = 'video/quicktime';
                }
                const match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                // fix jpg mimetype
                if (type === 'image/jpg') {
                    type = 'image/jpeg';
                }


                cd.append('title', inputs.title);
                cd.append('description', inputs.description);
                cd.append('file', {uri: cover.uri, name: filename, type: type});
                console.log('CD:', cd, filename);
                fd.append('title', inputs.title);
                fd.append('description', inputs.description);
                fd.append('file', {uri: video.uri, name: filename2, type: videoType});
                console.log('FD:', fd);

                const resp = await fetchFormData('media', fd, token);
                console.log('upl resp', resp);
                if (resp.message) {
                    const videoTag = {
                        file_id: resp.file_id,
                        tag: 'mussy'
                    };
                    const tag1 = await fetchPOST('tags', videoTag, token);
                    if(tag1.message) {
                        const resp2 = await fetchFormData('media', cd, token);
                        if (resp2.message) {
                            const coverTag = {
                                file_id: resp2.file_id,
                                tag: 'cover_' + resp.file_id,
                            };
                            const tag2 = await fetchPOST('tags', coverTag, token);
                            if (tag2.message) {
                                const data = getAllMedia();
                                setMedia(data);
                                setLoading(false);
                                navigation.push('Home');
                            }
                        }
                    }
                }
            }else if (video !== null && cover === null) {
                const filename2 = video.uri.split('/').pop();
                let videoType = '';
                let extension = filename2.substr(filename2.length-3);
                if(extension.toString() === 'mp4'){
                    videoType = 'video/mp4';
                }else if (extension.toString() === 'mov'){
                    videoType = 'video/quicktime';
                }
                fd.append('title', inputs.title);
                fd.append('description', inputs.description);
                fd.append('file', {uri: video.uri, name: filename2, type: videoType});
                console.log('FD:', fd);
                const resp = await fetchFormData('media', fd, token);
                console.log('upl resp', resp);
                if (resp.message) {
                    const videoTag = {
                        file_id: resp.file_id,
                        tag: 'mussy'
                    };
                    const tag1 = await fetchPOST('tags', videoTag, token);
                    if (tag1.message){
                        const data = getAllMedia();
                        setMedia(data);
                        setLoading(false);
                        navigation.push('Home');
                    }
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return {
        handleTitleChange,
        handleDescriptionChange,
        handleUpload,
        inputs,
        errors,
        loading,
        setErrors,
        setInputs,
    };
};

export default useUploadForm;