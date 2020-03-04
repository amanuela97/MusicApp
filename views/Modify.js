import React, {useState, useEffect} from 'react';
import {
    Content,
    Form,
    Button,
    Text,
    Item,
    Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import useModifyForm from "../hooks/ModifyHooks";
import {validateField} from "../Utils/Validation";
import {modifyConstraints} from "../constants/ValidationConst";

const Modify = (props) => {
    const [send, setSend] = useState(false);
    const { navigation } = props;
    let fileData = navigation.getParam('fileData', 'default value');

    const {handleModifyTitleChange,
        handleModifyDescriptionChange,
        handleModify,
        inputs,
        setInputs,
        errors,
        setErrors,
        loading} = useModifyForm();

    const reset = () => {
        setErrors({});
        setInputs({});
    };

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
                    modifyConstraints),
                fetch: undefined,
            }));
    };

    const handleTitle = (text) => {
        handleModifyTitleChange(text);
        validate('title', text);
    };

    const handleDescription = (text) => {
        handleModifyDescriptionChange(text);
        validate('description', text);
    };

    const modify = async () => {
        console.log('reg field errors', errors);
        await handleModify(props.navigation, fileData.file_id);
        reset();
    };

    const checkErrors = () => {
        console.log('error', errors);
        if (errors.title !== undefined ||
            errors.description !== undefined) {
            setSend(false);
        } else {
            setSend(true);
        }
    };

    useEffect(() => {
        checkErrors();
        setInputs((inputs) => ({
            ...inputs,
            title: fileData.title,
            description: fileData.description,
        }));
    }, []);

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
                    {send &&
                    <Button full onPress={modify} title=''>
                        <Text>Modify</Text>
                    </Button>}
                    <Button
                        dark
                        full
                        onPress={reset} title=''>
                        <Text>Reset</Text>
                    </Button>
                </Form>
            )}
        </Content>
    );
};

Modify.propTypes = {
    navigation: PropTypes.object,
};

export default Modify;