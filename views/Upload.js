import React, {useState, useEffect, useContext} from 'react';
import {
    Content,
    Form,
    Button,
    Text,
    Item,
    Spinner,
} from 'native-base';

import {
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import useUploadForm from '../hooks/UploadHooks';
import {MediaContext} from '../contexts/MediaContext';
import validateField from '../Utils/Validation';
import {uploadConstraints} from '../constants/ValidationConst';
import {Video} from "expo-av";
import {AsyncImage} from '../components/AsynImage';

const deviceHeight = Dimensions.get('window').height;

const Upload = (props) => {
    const {media, setMedia} = useContext(MediaContext);
    const [send, setSend] = useState(false);
    const [cover, setCover] = useState(null);
    const [video, setVideo] = useState(null);

    const {
        handleTitleChange,
        handleDescriptionChange,
        handleUpload,
        inputs,
        errors,
        setErrors,
        setInputs,
        loading,
    } = useUploadForm();

    const validationProperties = {
        title: {title: inputs.title},
        description: {description: inputs.description},
    };

    const validate = (field, value) => {
        console.log('vp', validationProperties[field]);
        setErrors((errors) =>
            ({
                ...errors,
                [field]: validateField({[field]: value},
                    uploadConstraints),
                fetch: undefined,
            }));
    };

    const reset = () => {
        setErrors({});
        setInputs({});
        setCover(null);
        setVideo(null);
    };

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    useEffect(() => {
        getPermissionAsync();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
            exif: true,
        });

        console.log(result);

        if (!result.cancelled && result.type === 'image') {
            setCover(result);
        }else if(!result.cancelled && result.type === 'video'){
            setVideo(result);
        }
        validate('title', inputs.title);
        validate('description', inputs.description);
    };

    const handleTitle = (text) => {
        handleTitleChange(text);
        validate('title', text);
    };

    const handleDescription = (text) => {
        handleDescriptionChange(text);
        validate('description', text);
    };

    const upload = async () => {
        console.log('reg field errors', errors);
        await handleUpload(cover,video, props.navigation, setMedia);
        reset();
    };

    const checkErrors = () => {
        if (errors.title !== undefined ||
            errors.description !== undefined) {
            setSend(false);
        } else {
            setSend(true);
        }
    };

    useEffect(() => {
        checkErrors();
    }, [errors]);

    console.log('send', send);

    return (
        <Content>
            {loading ? (
                <Spinner/>
            ) : (
                <Form>
                    <Item>
                        <FormTextInput
                            placeholder='Title'
                            onChangeText={handleTitle}
                            value={inputs.title}
                            error={errors.title}
                        />
                    </Item>
                    <Item>
                        <FormTextInput
                            placeholder='Description'
                            onChangeText={handleDescription}
                            value={inputs.description}
                            error={errors.description}
                        />
                    </Item>
                    {video !== null &&
                    <Video
                        source={{ uri: video.uri }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={false}
                        isLooping={false}
                        useNativeControls={true}
                        style={{ width: '100%', height: deviceHeight/3 }}
                    />}
                    {cover !== null  &&
                    <AsyncImage source={{uri: cover.uri}}
                           style={{width: '100%', height: deviceHeight / 3}}/>}
                    <Button full onPress={pickImage} title=''>
                        <Text>Select file</Text>
                    </Button>
                    <Button info full onPress={pickImage} title=''>
                        <Text>Select cover</Text>
                    </Button>
                    {video !== null && send &&
                    <Button success full onPress={upload} title=''>
                        <Text>Upload</Text>
                    </Button>
                    }
                    <Button
                        dark
                        full
                        onPress={reset} title=''>
                        <Text>Reset form</Text>
                    </Button>

                </Form>
            )}
        </Content>
    );
};

// proptypes here
Upload.propTypes = {
    navigation: PropTypes.object,
};

export default Upload;