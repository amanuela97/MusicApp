import React from 'react';
import {Input} from 'native-base';
import PropTypes from 'prop-types';


const FormTextInput = (props) => {
    const {style, ...otherProps} = props;
    return (
        <Input
            {...otherProps}
        />
    );
};



FormTextInput.propTypes = {
    style: PropTypes.object,
};

export default FormTextInput;