import React, {useEffect}  from 'react';
import {Image} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Form, Item, Text,} from "native-base";
import FormTextInput from "../components/FormTextInput";
import {useUploadForm} from '../hooks/UploadHooks.js';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export const Upload = (props)=> {

    const {image, setImage, inputs, setInputs, errors, setErrors,
        handleTitleChange,
        handleDescriptionChange,
        handleUpload,
        validateField,
        validateOnSend} = useUploadForm();

    const validationProperties = {
        title: {title: inputs.title},
        description: {description: inputs.description},
    };

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const _pickImage = async () => {

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            console.log(result);

            if (!result.cancelled) {
                setImage(()=> ({
                    image: result.uri,
                }));
            }


        }catch (e) {
            console.log('_pickImage error ', e.message);
        }
    };

    const uploadFile = async () => {
        const uploadValid = validateOnSend(validationProperties);
        console.log('reg field errors', errors);
        if (!uploadValid) {
            console.log('worked');
            return;
        }

        try {
            handleUpload(image.image, props.navigation);
        } catch (e) {
            console.log('registerAsync error: ', e.message);
            setErrors((errors) =>
                ({
                    ...errors,
                    fetch: e.message,
                }));
        }
    };


    useEffect(() => {
        getPermissionAsync();
        console.log('hello from upload');
    }, []);

  return(
      <Container>
          <Content>
              <Form>
                  <CardItem>
                      <Body>
                          {!image &&
                          <Image
                              style={{height: 300, width: 320, flex: 1, backgroundColor: 'gray'}}
                          />}
                          {image &&
                          <Image
                              style={{height: 300, width: 320, flex: 1, backgroundColor: 'gray'}}
                              source={{uri: image.image}}
                          />}
                      </Body>
                  </CardItem>
                  <Item underline>
                    <FormTextInput
                        autoCapitalize='none'
                        value={inputs.title}
                        placeholder='title'
                        onChangeText={handleTitleChange}
                        onEndEditing={() => {
                            validateField(validationProperties.title);
                        }}
                        error={errors.title}
                    >
                    </FormTextInput>
                  </Item>
                  <Item underline>
                      <FormTextInput
                          autoCapitalize='none'
                          value={inputs.description}
                          placeholder='description'
                          onChangeText={handleDescriptionChange}
                          onEndEditing={() => {
                              validateField(validationProperties.description);
                          }}
                          error={errors.description}
                      >
                      </FormTextInput>
                  </Item>
                  <CardItem>
                      <Button info title='' onPress={
                          () => {
                            _pickImage();
                          }
                      } >
                          <Text>Select File</Text>
                      </Button>
                      <Button Success title='' onPress={
                          ()=>{
                              uploadFile();
                          }
                      }>
                          <Text>Upload</Text>
                      </Button>
                      <Button dark title='' onPress={
                          ()=>{
                                setImage(()=> ({
                                    image: null,
                                }));
                                setInputs(()=>({
                                    title: '',
                                    description: '',
                                }));
                          }
                      }>
                          <Text>Reset</Text>
                      </Button>
                  </CardItem>
                  {errors.fetch &&
                  <Card>
                      <CardItem>
                          <Body>
                              <Text>{errors.fetch}</Text>
                          </Body>
                      </CardItem>
                  </Card>
                  }
              </Form>
          </Content>
      </Container>
  );
};