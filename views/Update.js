import React , {useEffect,useState} from 'react';
import {Button, Content, Spinner, Text, CardItem, Form, Item} from "native-base";
import {AsyncImage} from "../components/AsynImage";
import {Dimensions} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import useUpdateHooks from "../hooks/UpdateHooks";
import FormTextInput from "../components/FormTextInput";
import validateField from "../Utils/Validation";
import {updateConstraints} from "../constants/ValidationConst";


const deviceHeight = Dimensions.get('window').height;
const Update = (props)=>{
    const [send, setSend] = useState(false);
    let fileData = props.navigation.getParam('User', 'default value');
    const {errors,inputs,avatar,loading,setAvatar, setInputs,setErrors, handleUpdate,
    handleUpdateUsername,
    handleUpdateEmail} = useUpdateHooks();

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
            exif: true,
        });


        if (!result.cancelled && result.type === 'image') {
            setAvatar(result);
        }
       // validate('username', inputs.username);
        //validate('email', inputs.email);
    };

    const validationProperties = {
        username: {username: inputs.username},
        email: {email: inputs.email},
    };

    const validate = (field, value) => {
        console.log('vp', validationProperties[field]);
        setErrors((errors) =>
            ({
                ...errors,
                [field]: validateField({[field]: value},
                    updateConstraints),
                fetch: undefined,
            }));
    };

    const handleUsername = (text) => {
        handleUpdateUsername(text);
        validate('username', text);
    };

    const handleEmail = (text) => {
        handleUpdateEmail(text);
        validate('email', text);
    };

    const update = async ()=>{
        console.log('reg field errors in update', errors);
        await handleUpdate(props.navigation, fileData);
        reset();
    };

    const reset = () => {
       setAvatar(null);
       setInputs({});
       setErrors({});
    };

    const checkErrors = () => {
        console.log('error', errors);
        if (errors.username !== undefined ||
            errors.password !== undefined ||
            errors.email !== undefined) {
            setSend(false);
        } else {
            setSend(true);
        }
    };

    useEffect(() => {
        getPermissionAsync();
    }, []);

    useEffect(() => {
        checkErrors();
    }, [errors]);

    return (
        <Content>
            {loading ? (
                <Spinner/>
            ) : (
                <Content>
                    <Form>
                        <Item>
                            <FormTextInput
                                placeholder='username'
                                onChangeText={handleUsername}
                                value={inputs.username}
                                error={errors.username}
                            />
                        </Item>
                        <Item>
                            <FormTextInput
                                placeholder='email'
                                onChangeText={handleEmail}
                                value={inputs.email}
                                error={errors.email}
                            />
                        </Item>
                    </Form>
                    {avatar === null  &&
                    <CardItem style={{width: '100%', height: deviceHeight / 3, backgroundColor: 'gray'}}/>}
                    {avatar !== null  &&
                    <AsyncImage source={{uri: avatar.uri}}
                                style={{width: '100%', height: deviceHeight / 3}}/>}
                    <Button full onPress={pickImage} title=''>
                        <Text>Select Avatar</Text>
                    </Button>
                    {avatar !== null && send &&
                    <Button success full onPress={update} title=''>
                        <Text>Update Avatar</Text>
                    </Button>
                    }
                    <Button
                        dark
                        full
                        onPress={reset} title=''>
                        <Text>Reset Avatar</Text>
                    </Button>
                </Content>
            )}
        </Content>
    );
};

// proptypes here
Update.propTypes = {
    navigation: PropTypes.object,
};

export default Update;